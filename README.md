# sync-pnpm-deps
Sync pnpm deps according to monorepo graph. Never run app when deps are different.

## Usage

Run the command below in the root of your project. It will analyze your project's dependencies, and throw an error if the same dependency is saved into different versions or saved into duplicate copies.

```
npx sync-pnpm-deps check
```

## Example

We know that, `webpack` use `webpack-cli` as its `peerDependencies`. Let's say we have an `app` and a `lib` in a monorepo. And the `app` has installed the `lib` as its dependencies.
- The `app` has installed `webpack@5.0.0`. And the `lib` has installed `webpack@4.0.0`. Runing `npx sync-pnpm-deps check` in  will throw an error, because the versions of `webpack` in the same application are different.
- The `app` has installed `webpack@5.0.0`. And the `lib` has installed `webpack@5.0.0` and `webpack-cli@4.0.0`. Runing `npx sync-pnpm-deps check` in  will throw an error, because `webpack` has been saved into 2 copies. That means, there 2 `webpack` instances in the same application.
