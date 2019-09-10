import Koji from "@withkoji/vcc";
import * as React from "react";
import * as ReactDom from "react-dom";

import { App } from "./src/App";
import { IAppDefinition } from "./src/App.types";

// Get handle for Koji VCC files
const config = Koji.config;
console.log(config);

// Prep the app definition
const definition: IAppDefinition = {
  appTitle: "Game Tracker"
}

ReactDom.render(
  <App appDefinition={definition}/>,
  document.getElementById("app")
);
