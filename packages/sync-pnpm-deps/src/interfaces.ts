export interface ImporterNodeV54 {
  specifiers?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface LockFileV54 {
  importers?: Record<string, ImporterNodeV54>;
}
