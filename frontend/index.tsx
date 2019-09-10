import Koji from "@withkoji/vcc";
import * as React from "react";
import * as ReactDom from "react-dom";

import { App } from "./src/App";

// Get handle for Koji VCC files
const config = Koji.config;
console.log(config);

ReactDom.render(
  <App />,
  document.getElementById("app")
);
