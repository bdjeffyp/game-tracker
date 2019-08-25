# TypeScript/React Template (v1.1) - bdjeffyp

__Changelog__
* v1.1 - Added koji-tools and @types/koji-tools. Added very light backend server code to be extended.
* v1.0 - Initial release.

----------
This template consists of a bare bones project that is ready for TypeScript coding right out of the box. The entry point, `index.tsx`, consists of a ReactDOM `render` method that will start your app in the `App` component. Simply open `App.tsx` and start coding from there! Note that this only contains frontend code. There is a very light backend that is ready for expanding with your favorite code as desired.

## What is React?
React is a library was created by Facebook to enable efficient rendering of webpages. It "reacts" when there is a change to a component's state, causing that component alone to re-render. This is accomplished quickly through the use of a virtual DOM. Check out the [React](https://reactjs.org/) page to learn more!

## Why TypeScript?
TypeScript is a "superset" of JavaScript, by using strong typing of variables. When you save your code changes, Webpack starts the TypeScript compiler, which converts the code into JavaScript for the browser to use. If you have an error, such as trying to assign a number into a string variable, the compiler will halt and tell you where the error occurred. This gives you an advantage of avoiding type mismatch issues that JavaScript would ignore!

## Learning TypeScript
Since TypeScript is just an evolved form of JavaScript, there isn't too much more to learn! I do encourage you to gloss over the [TypeScript documentation](https://www.typescriptlang.org/docs/home.html) to learn about the various data types, type conversions, and other TS advantages.

## Linting
This project includes the TSLint module to check code styling. While TSLint is expected to be merged with ESLint sometime this year, I have included it for now. I plan on updating this template once that change occurs. You can check your code in the Terminal window with the command `npm run check:tslint`.

Includes the `cross-env` package for local development no matter which operating system you use.