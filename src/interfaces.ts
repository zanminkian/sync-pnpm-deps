export interface ImporterNode {
  specifiers?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export interface PackageNode {
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  peerDependenciesMeta?: Record<string, { optional?: boolean }>
}

export interface LockFile {
  importers?: Record<string, ImporterNode>
  packages?: Record<string, PackageNode>
}
