import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { INavLink, Nav } from "office-ui-fabric-react/lib/Nav";
import { Panel, PanelType } from "office-ui-fabric-react/lib/Panel";
import {
  classNamesFunction,
  styled
} from "office-ui-fabric-react/lib/Utilities";
import {
  ResponsiveMode,
  withResponsiveMode
} from "office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode";
import * as React from "react";
import { getStyles } from "./App.style";
import {
  IAppProps,
  IAppStyleProps,
  IAppStyles
} from "./App.types";
import { Header } from "./components/Header/Header";

export interface IAppState {
  isMenuVisible: boolean;
}

const getClassNames = classNamesFunction<IAppStyleProps, IAppStyles>();

@withResponsiveMode
export class AppBase extends React.Component<IAppProps, IAppState> {
  public state: IAppState = { isMenuVisible: false };

  constructor(props: IAppProps) {
    super(props);

  }

  public componentDidMount() {
    document.title =
      this.props.appDefinition.appTitle.replace(" - ", " ");
  }

  public render(): React.ReactNode {
    const {
      appDefinition,
      styles,
      responsiveMode = ResponsiveMode.xLarge,
      theme
    } = this.props;
    const { isMenuVisible } = this.state;

    const classNames = getClassNames(styles, {
      responsiveMode,
      theme,
    });

    const isLargeDown = responsiveMode <= ResponsiveMode.large;

    const nav = (
      <Nav
        groups={appDefinition.examplePages}
        onLinkClick={this._onLinkClick}
        onRenderLink={this._onRenderLink}
        styles={classNames.subComponentStyles.nav}
      />
    );

    return (
      <Fabric className={classNames.root}>
        <div className={classNames.headerContainer}>
          <Header
            isLargeDown={isLargeDown}
            title={appDefinition.appTitle}
            sideLinks={appDefinition.headerLinks}
            isMenuVisible={isMenuVisible}
            onIsMenuVisibleChanged={this._onIsMenuVisibleChanged}
            styles={classNames.subComponentStyles.header}
          />
        </div>

        {!isLargeDown && (
          <div className={classNames.leftNavContainer}>{nav}</div>
        )}

        <div className={classNames.content} data-is-scrollable="true">
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
            {nav}
          </Panel>
        )}
      </Fabric>
    );
  }

  private _onIsMenuVisibleChanged = (isMenuVisible: boolean): void => {
    this.setState({ isMenuVisible });
  }

  private _onLinkClick = (): void => {
    this.setState({ isMenuVisible: false });
  }

  private _onRenderLink = (link: INavLink): JSX.Element => {
    // Nav-linkText is a class name from the Fabric nav
    return (
      <span key={1} className="Nav-linkText">
        {link.name}
      </span>
    );
  }
}

export const App: React.StatelessComponent<IAppProps> = styled<
  IAppProps,
  IAppStyleProps,
  IAppStyles
>(AppBase, getStyles, undefined, {
  scope: "App"
});
