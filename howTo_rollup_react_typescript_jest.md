# Steps to do Rollup / React / Typescript / Jest package

## npm, git, prettier

```sh
mkdir newproj && cd newproj
npm init
# they may want you to answer a few questions...

npm install --save-dev prettier

# add git, and commit at your leisure
git init
git add .
git commit -m "Initial commit"
```
```js
// make yourself a prettier.config.js
module.exports = {
  parser: "typescript",
};
```

## .gitignore 

Varies on your setup a little, for sure node_modules and dist

```sh
touch .gitignore
cat > .gitignore # enters prompt:

/node_modules
/dist
/.history
/.vscode

# to exit cat prompt press CTRL + D
```

## add typescript

```sh
npm install --save-dev typescript
npx tsc --init # generates a default tsconfig.json
```
do note that the `libs` field may likely change depending on your source code's needs (if it uses a lot of new JS features)
```json
// in tsconfig.json
{
  "compilerOptions": {
    // leave other options without changes
    "module": "es2015", // "es2015" makes Typescript compiler output compatible with Rollup
    "lib": ["es2015", "dom"], // needed DOM for console.log, and
    // needed es2015 to access array types, error encountered was:
    // Element implicitly has an 'any' type because expression of type
    // '0' can't be used to index type '{}'.
    // Property '0' does not exist on type '{}'.ts(7053)
    
    "declararion": true, // generates .d.ts files inside the output directory
    // remaining options
  },
  "include":["src/**/*"] // Only files from ./src/ directory will be processed and generated folder structure will be relative to ./src/
}
```

## add rollup

```sh
npm install --save-dev rollup rollup-plugin-typescript2
```
```js
// make a rollup.config.js
import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];
const input = "src/index.ts";

const plugins = [
  typescript({
    typescript: require("typescript"),
  }),
];

export default [
  {
    input,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    plugins,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins,
  },
];
```

```js
// update package.json -- for rollup output & build script

// replace old line
"main": "index.js"
// with 2 new lines:
"main": "dist/index.js",
"module": "dist/index.esm.js",

// and add build script:
// scripts:{...
"build": "npx rollup -c",
// ...}
```

## add /src and your code

This is a fine example file:

```ts
// src/index.ts
const enum EnumTest {
  VALUE1 = 1,
  VALUE2 = 2,
}

const test = (): string => {
  const abc = [EnumTest.VALUE1, EnumTest.VALUE2];
  if (abc[0] === EnumTest.VALUE1) {
    return "test1";
  }
  return "test2";
};

console.log(test());
```

## run build -- checkpoint

```sh
npm run build 
# Upon success, output should resemble:
# 
# src/index.ts → dist/index.esm.js...
# created dist/index.esm.js in 608ms
# src/index.ts → dist/index.js...
# created dist/index.js in 303ms
```

## add react

You may want a different version of React and their associates.

```sh
npm install --save-dev react @types/react
```

### update tsconfig

```js
// in tsconfig.json
// add following key to the "compilerOptions"
  "jsx": "react",
```

### update rollup.config.js

```js
// update rollup.config.js
// just above plugins declaration add
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];
// then for each output declaration add external key and value
export default [
  {
    input,
    output: {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input,
    output: {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    plugins,
    external,
  },
];
```