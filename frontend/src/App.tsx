import { INavLink, Nav } from "office-ui-fabric-react/lib/Nav";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import { styled } from "office-ui-fabric-react/lib/Utilities";
import { ResponsiveMode, withResponsiveMode } from "office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode";
import * as React from "react";

import { getAppClassNames, getAppStyles } from "./App.style";
import { IAppProps, IAppStyleProps, IAppStyles } from "./App.types";
import { Header } from "./components/Header/Header";

export interface IAppState {
  isMenuVisible: boolean;
}

@withResponsiveMode
export class AppBase extends React.Component<IAppProps, IAppState> {
  public state: IAppState = { isMenuVisible: false };

  constructor(props: IAppProps) {
    super(props);
  }

  public componentDidMount(): void {
    document.title = this.props.appDefinition.appTitle.replace(" - ", " ");
  }

  public render(): React.ReactNode {
    const appDefinition = this.props.appDefinition;
    const styles = this.props.styles;
    const responsiveMode = this.props.responsiveMode ? this.props.responsiveMode : ResponsiveMode.xLarge;
    const theme = this.props.theme;
    const isMenuVisible = this.state.isMenuVisible;

    const classNames = getAppClassNames(styles, {
      responsiveMode,
      theme
    });

    const isLargeDown = responsiveMode <= ResponsiveMode.large;

    const nav: React.ReactNode = (
      <Nav
        pages={appDefinition.pages}
        onLinkClick={this._onLinkClick}
        onRenderLink={this._onRenderLink}
        styles={classNames.subComponentStyles.nav}
      />
    );

    return (
      <>
        <div className={classNames.headerContainer}>
          <Header
            isLargeDown={isLargeDown}
            title={appDefinition.appTitle}
            isMenuVisible={isMenuVisible}
            onIsMenuVisibleChanged={this._onIsMenuVisibleChanged}
            styles={classNames.subComponentStyles.header}
          />
        </div>

        {/* {!isLargeDown && (
          <div className={classNames.leftNavContainer}>{nav}</div>
        )} */}

        <div className={classNames.content} data-is-scrollable="true">
          derp
          {this.props.children}
        </div>

        {isLargeDown && (
          <Panel
            isOpen={isMenuVisible}
            isLightDismiss={true}
            type={PanelType.smallFixedNear}
            // Close by tapping outside the panel
            hasCloseButton={false}
            // Use onDismissed (not onDismiss) to prevent _onIsMenuVisibleChanged being called twice
            // (once by the panel and once by the header button)
            onDismissed={this._onIsMenuVisibleChanged.bind(this, false)}
            styles={classNames.subComponentStyles.navPanel}
          >
            {/* {nav} */}
          </Panel>
        )}
      </>
    );
  }

  private _onIsMenuVisibleChanged = (isMenuVisible: boolean): void => {
    this.setState({ isMenuVisible });
  };

  private _onLinkClick = (): void => {
    this.setState({ isMenuVisible: false });
  };

  private _onRenderLink = (link: INavLink): JSX.Element => {
    // Nav-linkText is a class name from the Fabric nav
    return (
      <span key={1} className="Nav-linkText">
        {link.name}
      </span>
    );
  };
}

export const App: React.FunctionComponent<IAppProps> = styled<IAppProps, IAppStyleProps, IAppStyles>(
  AppBase,
  getAppStyles,
  undefined,
  {
    scope: "App"
  }
);
