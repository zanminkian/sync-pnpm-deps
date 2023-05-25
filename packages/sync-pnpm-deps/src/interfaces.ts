export interface ImporterNodeV5_4 {
  specifiers?: Record<string, string>
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

export interface LockFileV5_4 {
  importers?: Record<string, ImporterNodeV5_4>
}
