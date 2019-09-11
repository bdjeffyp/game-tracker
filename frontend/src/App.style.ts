import { getTheme } from "office-ui-fabric-react/lib/Styling";
import { classNamesFunction, IStyleFunction } from "office-ui-fabric-react/lib/Utilities";
import { ResponsiveMode } from "office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode";

import { IAppStyleProps, IAppStyles } from "./App.types";

const globalClassNames = {
  root: "ms-App",
  header: "ms-App-header",
  leftNav: "ms-App-nav",
  content: "ms-App-content",
};

const headerHeight = 50;
const navWidth = 300;

export const getAppStyles: IStyleFunction<IAppStyleProps, IAppStyles> = (props: IAppStyleProps) => {
  const { responsiveMode, theme = getTheme() } = props;
  const isLargeDown = responsiveMode <= ResponsiveMode.large;

  return {
    root: [
      {
        selectors: {
          ":global(body)": {
            padding: 0,
            margin: 0,
            position: "absolute",
            left: 0,
            top: 0,
            minWidth: "100%",
            minHeight: "100%",
            "-webkit-tap-highlight-color": "transparent"
          }
        }
      },
      globalClassNames.root
    ],
    headerContainer: [
      {
        position: "absolute",
        top: 0,
        height: headerHeight,
        left: 0,
        right: 0
      },
      globalClassNames.header
    ],
    leftNavContainer: [
      {
        position: "absolute",
        left: 0,
        width: navWidth,
        top: headerHeight,
        bottom: 0,
        borderRight: `1px solid ${theme.palette.neutralLight}`,
        background: theme.palette.white,
        boxSizing: "border-box",
        overflowX: "hidden",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch"
      },
      globalClassNames.leftNav
    ],
    content: [
      {
        position: "absolute",
        left: isLargeDown ? 0 : navWidth,
        right: 0,
        top: headerHeight,
        bottom: 0,
        padding: isLargeDown ? 5 : undefined,
        overflowX: "auto",
        overflowY: "auto",
        // Helps to enable hardware acceleration and improve painting performance.
        transform: "translateZ(0)",
        // Helps to enable smooth scrolling on ios devices.
        WebkitOverflowScrolling: "touch"
      },
      globalClassNames.content
    ],
    subComponentStyles: {
      header: {},
      nav: {
        root: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        },
        groupContent: {
          marginBottom: 20
        }
      },
      navPanel: { root: { top: headerHeight } }
    }
  };
};

export const getAppClassNames = classNamesFunction<IAppStyleProps, IAppStyles>();
