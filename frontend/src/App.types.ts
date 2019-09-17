import {
  INavLink,
  INavLinkGroup,
  INavStyleProps
} from "office-ui-fabric-react/lib/Nav";
import { IPanelStyleProps } from "office-ui-fabric-react/lib/Panel";
import { IStyle, ITheme } from "office-ui-fabric-react/lib/Styling";
import { IStyleFunctionOrObject } from "office-ui-fabric-react/lib/Utilities";
import { IWithResponsiveModeState } from "office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode";

import { IHeaderStyleProps } from "./components/Header/Header.types";
import { IAppMessageBarProps } from "./components/MessageBar/MessageBar.types";
import { IRouteProps } from "./utilities/router/Route";

/**
 * Props for the side nav
 */
export interface INavProps {
  /** Pages we can navigate to from the Nav */
  pages: INavPage[];
  /** Event callback when a nav link is clicked */
  onLinkClick?: (ev?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
  /** Event callback for when the nav's search box is clicked */
  onSearchBoxClick?: (ev?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
  /** For extra search help */
  seachablePageTitle?: string;
}

/**
 * Page represented within the side nav
 */
export interface INavPage extends Pick<IRouteProps, "component" | "getComponent"> {
  /** Page title, which is displayed in the Nav as the link to click */
  title: string;
  /** URL for the page, relative to root */
  url: string;
  /** Unique CSS class for the page */
  className?: string;
  /** Subpages, if needed */
  pages?: INavPage[];
  /** We can hide this from the side nav, if desired */
  isHiddenFromMainNav?: boolean;
  /** This page is the main page? */
  isHomePage?: boolean;
  /** Show the external link icon */
  isExternal?: boolean;
  /** If this is a category, then clicking on it opens a collapsible rather than a link */
  isCategory?: boolean;
  /** Render the search bar vice a link */
  isSearchable?: boolean;
  /** Does the content need the full width? */
  isContentFullBleed?: boolean;
}

export interface IAppLink extends INavLink {
  // tslint:disable-next-line:no-any
  getComponent?: (cb: (obj: any) => void) => any;
  component?: React.ComponentClass | (() => React.ReactNode);
}

export interface IAppLinkGroup extends INavLinkGroup {
  links: IAppLink[];
}

export interface IAppDefinition {
  /** The title of the app */
  appTitle: string;
  /** Text to display in a badge in the header */
  badgeText?: string;
  /** Pages of the app */
  pages: INavPage[];
  /** Location of the app's logo */
  appLogoSource?: string;
  /** Setup and display any message bars below the header */
  messageBars?: IAppMessageBarConfig[];
  /** If the URL hash has one of these search terms, redirect to the associated URL */
  redirects?: IRedirect[];
}

export interface IRedirect {
  /** If the URL contains this string or regex match... */
  from: string | RegExp;
  /** ...replace it with this string! */
  to: string;
}

export interface IAppMessageBarConfig extends IAppMessageBarProps {
  /** Find these URLs */
  path: string | RegExp;
  /** Ignore these URLs */
  exclude?: string | RegExp;
}

export interface IAppProps extends IWithResponsiveModeState {
  appDefinition: IAppDefinition;

  /** Theme provided by higher-order component. */
  theme?: ITheme;

  /** Optional override styles */
  styles?: IStyleFunctionOrObject<IAppStyleProps, IAppStyles>;
}

export type IAppStyleProps = Required<Pick<IAppProps, "responsiveMode">> &
  Pick<IAppProps, "theme">;

export interface IAppStyles {
  root: IStyle;
  /** Styles for the container of the actual Header */
  headerContainer: IStyle;
  /** Styles for the container when the nav is displayed on the left */
  leftNavContainer: IStyle;
  content: IStyle;
  subComponentStyles: IAppSubComponentStyles;
}

export interface IAppSubComponentStyles {
  // tslint:disable:no-any
  /** Styles for the Header itself. To style the container, use `styles.headerContainer`. */
  header: IStyleFunctionOrObject<IHeaderStyleProps, any>;
  /** Styles for the Nav itself, applied regardless of screen size */
  nav: IStyleFunctionOrObject<INavStyleProps, any>;
  /** Styles for the Panel used to display the nav on small screens */
  navPanel: IStyleFunctionOrObject<IPanelStyleProps, any>;
}
