# FX-Calc
Author: Philip Hoosen<br/>
http://fx-calc.s3-website-ap-southeast-2.amazonaws.com/

Simple web app exercise that converts an amount between currencies.<br/>
Just type in the amount and change the currency dropdown to see the converted amount.

## Tech 
This is a web app built using:
- React and Redux using `Create React App`
- Ducks pattern for less file jumping
- CSS-in-JS using `styled-components` to keep css close to code for maintainability
- TypeScript for static typing

Exercise specific design:
- Cross-via Matrix is simplified to only store exceptions (ie non USD cross)

## CI / CD
- set up using CircleCi 
- publishes to AWS S3 bucket (exposed to http://fx-calc.s3-website-ap-southeast-2.amazonaws.com/)

## Limitations
  - Currency rates are currently fixed. Currently out of scope to move the rates to an exteranal, more easily updatable source
  - Cross-via matrix will need to be updated if currencies change. Matrix can be derived from given rate pairs rather than stored.

## To Run
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn coverage`

Displays test coverage

### `yarn build`

Builds the app for production to the `build` folder.<br />

