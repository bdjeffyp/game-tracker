import { getDocument } from "office-ui-fabric-react/lib/Utilities";

import { INavPage } from "../App.types";

import { removeAnchorLink } from "./removeAnchorLink";

const doc = getDocument();
const _urlResolver = doc && doc.createElement("a");

export function isPageActive(componentUrl: string): boolean {
  if (!componentUrl || !_urlResolver) {
    return false;
  }

  _urlResolver.href = componentUrl || "";
  const target: string = _urlResolver.href;

  const exact = location.protocol + "//" + location.host + location.pathname;
  if (exact === target) {
    return true;
  }

  return removeAnchorLink(location.href) === target;
}

export function hasActiveChild(page: INavPage): boolean {
  if (!page) {
    return false;
  }

  if (page.url && isPageActive(page.url)) {
    return true;
  }

  let _hasActiveChild = false;
  let pages: INavPage[] = [];

  if (page.pages) {
    pages = pages.concat(page.pages);
  }

  if (pages.length > 0) {
    for (const childPage of pages) {
      if (isPageActive(childPage.url)) {
        _hasActiveChild = true;
        break;
      }

      if (childPage.pages) {
        _hasActiveChild = hasActiveChild(childPage);
        if (_hasActiveChild) {
          break;
        }
      }
    }
  }

  return _hasActiveChild;
}
