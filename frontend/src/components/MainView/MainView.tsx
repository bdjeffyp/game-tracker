import { Async } from "office-ui-fabric-react";
import * as React from "react";

import { IAppDefinition, INavPage } from "../../App.types";
import { hasActiveChild } from "../../utilities/activePage";
import { extractAnchorLink, jumpToAnchor, removeAnchorLink } from "../../utilities/anchorLink";

export interface IMainViewProps {
  children?: React.ReactNode;
  appDefinition: IAppDefinition;
}

export interface IMainViewState {
  /** For extra search help */
  searchablePageTitle?: string;
  /** Does the content need the full width? */
  isContentFullBleed?: boolean;
  /** Shown pages in the nav */
  activePages?: INavPage[];
  /** Current route */
  pagePath?: string;
}

export class MainView extends React.Component<IMainViewProps, IMainViewState> {
  private _async: Async;
  private _jumpInterval: number | undefined;

  constructor(props: IMainViewProps) {
    super(props);

    // Set up local async for handling disposal
    this._async = new Async();

    // Set the state
    this.state = this._getNavData();
  }

  public componentDidMount(): void {
    this.setState({...this._getNavData()});
    window.addEventListener("hashchange", this._handleRouteChange);
    this._handleRouteChange();
  }

  public componentWillUnmount(): void {
    this._async.dispose();
    window.removeEventListener("hashchange", this._handleRouteChange);
  }

  // public U

  private _getNavData = (): Partial<IMainViewState> => {
    const pages = this.props.appDefinition.pages;
    if (!pages) {
      return {};
    }

    let searchablePageTitle: string | undefined;
    let isContentFullBleed = false;
    const activePages: INavPage[] = [];

    pages
      .filter((page: INavPage) => !page.isHiddenFromMainNav && hasActiveChild(page))
      .forEach((page: INavPage) => {
        isContentFullBleed = !!page.isContentFullBleed;
        if (page.isSearchable) {
          searchablePageTitle = page.title;
        }
        if (page.pages) {
          activePages.push(...page.pages);
        }
      });

    return {
      searchablePageTitle,
      isContentFullBleed,
      activePages
    };
  }

  private _handleRouteChange = (): void => {
    const prevPagePath = this.state.pagePath;
    const newPagePath = removeAnchorLink(location.hash);
    if (prevPagePath === newPagePath) {
      // Only anchor change
      this._jumpToAnchor(extractAnchorLink(location.hash));
    }
    this.setState({pagePath: newPagePath});
  }

  private _jumpToAnchor = (anchor: string): void => {
    if (this._jumpInterval) {
      this._async.clearInterval(this._jumpInterval);
      this._jumpInterval = undefined;
    }
    if (anchor) {
      // Check that an element has rendered during re-rendering (similar to a throttling call)
      const start = Date.now();
      this._jumpInterval = this._async.setInterval(() => {
        const element = document.getElementById(anchor);
        if (element || Date.now() - start > 1000) {
          // Only 10 tries within 1 second
          this._async.clearInterval(this._jumpInterval);
          this._jumpInterval = undefined;
          if (element) {
            jumpToAnchor(anchor);
          }
        }
      }, 100);
    }
  }
}
