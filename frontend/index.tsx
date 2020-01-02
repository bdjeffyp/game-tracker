import { initializeIcons } from "@uifabric/icons";
import Koji from "@withkoji/vcc";
import { Fabric } from "office-ui-fabric-react";
import * as React from "react";
import * as ReactDom from "react-dom";

import { App } from "./src/App";
import { IAppDefinition, INavPage, IRedirect } from "./src/App.types";
import { currentFabricBreakpoint } from "./src/utilities";
import { Route, Router } from "./src/utilities/router";

initializeIcons();

// Get handle for Koji VCC files
const config = Koji.config;
console.log(config);

// Prep the app definition
const definition: IAppDefinition = {
  appTitle: "Game Tracker",
  pages: [{
    title: "Main",
    url: "/home"
  }]
};
let rootElement: HTMLElement;

// Entry point
if (document.readyState === "interactive" || document.readyState === "complete") {
  _onLoad();
} else {
  window.onload = _onLoad;
}
window.onunload = _onUnload;

// Route preps
// function _createRoutes(_pages: INavPage[]): React.ReactNode[] {
//   let routes: React.ReactNode[] = [];

//   _pages.forEach((page: INavPage) => {
//     routes.push(<Route key={page.url} path={page.url} component={page.component} getComponent={page.getComponent} />);
//     if (page.pages) {
//       // Layers of pages!
//       routes = routes.concat(_createRoutes(page.pages));
//     }
//   });

//   return routes;
// }
// function _getAppRoutes(): React.ReactNode[] {
//   const routes: React.ReactNode[] = _createRoutes(definition.pages);

//   return routes;
// }

function _onLoad(): void {
  if (!window.location.hash) {
    // Set the home hash
    window.location.hash = "#/";
  }

  _handleRedirects(definition.redirects);

  // Render the app!
  rootElement = rootElement || document.getElementById("app");
  currentFabricBreakpoint();

  const app = (props: {}) => <App appDefinition={definition} {...props} />;
  const fabric = (
    <Fabric>
      <Router>
        <Route component={app}>{/* _getAppRoutes() */}</Route>
      </Router>
    </Fabric>
  );
  ReactDom.render(fabric, rootElement);
}

function _onUnload(): void {
  if (rootElement) {
    ReactDom.unmountComponentAtNode(rootElement);
  }
}

function _handleRedirects(redirects?: IRedirect[]): void {
  if (redirects) {
    const hash = window.location.hash;
    _redirectUrls(redirects, hash);
    window.addEventListener("hashchange", () => {
      _redirectUrls(redirects, hash);
    });
  }
}

function _redirectUrls(redirects: IRedirect[], hash: string): void {
  for (const { from, to } of redirects) {
    const isMatch = typeof from === "string" ? hash.indexOf(from) !== -1 : from.test(hash);
    if (isMatch) {
      window.location.hash = hash.replace(from, to);
      break;
    }
  }
}
