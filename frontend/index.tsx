import * as Koji from "koji-tools";
import * as React from "react";
import * as ReactDom from "react-dom";

import App from "./src/App";

// Used for Koji integration. Do not remove unless you don't want to use with Koji.
Koji.pageLoad();

ReactDom.render(
  <App />,
  document.getElementById("app")
);
