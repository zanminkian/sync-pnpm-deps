import path from 'path'
import type { ImporterNode } from './interfaces'

/**
 * Check importer according to graph.
 *
 * Example: App A require lib B, and lib B require lib C.
 * These three's dependencies' versions and dependencies' peers should be the same.
 */
export function checkImporter(importers: Record<string, ImporterNode>, store: Map<string, string>, chain: string[], options?: { prod?: boolean }) {
  const currentPackage = chain.at(chain.length - 1)
  if (!currentPackage)
    throw new Error('Current package name should not be falsy! It\'s a bug. Please submit your issue.')
  const importerNode = importers[currentPackage]
  if (!importerNode)
    throw new Error(`Content of ${currentPackage} should not be falsy! Please check your lock file.`)

  const deps = sortImporter({
    ...(options?.prod ? undefined : importerNode.devDependencies),
    ...importerNode.dependencies,
  })
  for (const [depName, depValue] of Object.entries(deps)) {
    if (depValue.startsWith('link:')) {
      const subPath = depValue.slice('link:'.length)
      const finalSubPath = path.join(currentPackage, subPath)
      checkImporter(importers, store, [...chain, finalSubPath], options)
    }
    else {
      if (store.has(depName) && store.get(depName) !== depValue)
        throw new Error(`Check ${chain.join(' -> ')} fail! ${currentPackage}'s ${depName} should be ${store.get(depName)} but got ${depValue}`)

      store.set(depName, depValue)
    }
  }
}

export function sortImporter(deps: Record<string, string>) {
  const linkedDeps: Record<string, string> = {}
  const normalDeps: Record<string, string> = {}
  for (const [depName, depValue] of Object.entries(deps)) {
    if (depValue.startsWith('link:'))
      linkedDeps[depName] = depValue
    else
      normalDeps[depName] = depValue
  }
  return {
    ...normalDeps,
    ...linkedDeps,
  }
}
