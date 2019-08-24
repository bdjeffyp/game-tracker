import * as Koji from "koji-tools";
import Greeter from "./src/Greeter";

const greeter: Greeter = new Greeter("world!");

// Used for Koji integration. Do not remove unless you don't want to use with Koji.
Koji.pageLoad();

// Entry point. Adds the root component to the template.
document.getElementById("app").appendChild(greeter.button());
