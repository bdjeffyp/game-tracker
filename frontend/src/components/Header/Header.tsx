import { ContextualMenu, DirectionalHint, IContextualMenuItem } from "office-ui-fabric-react/lib/ContextualMenu";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { styled } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";

import { getHeaderClassNames, getHeaderStyles } from "./Header.style";
import { IHeaderProps, IHeaderStyleProps, IHeaderStyles, ISideLink } from "./Header.types";

export interface IHeaderState {
  contextMenu?: {
    target: HTMLElement;
    items: IContextualMenuItem[];
  };
}

export class HeaderBase extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);

    this.state = {
      contextMenu: undefined
    };
  }

  public render(): React.ReactNode {
    const { title, styles, isLargeDown = false, theme } = this.props;
    const { contextMenu } = this.state;

    // For screen sizes large down, hide the side links.
    const sideLinks = isLargeDown ? [] : this.props.sideLinks;

    const classNames = getHeaderClassNames(styles, { theme });
    const { subComponentStyles } = classNames;

    return (
      <div>
        <div className={classNames.root}>
          {isLargeDown && (
            <button className={classNames.button} onClick={this._onMenuClick}>
              <Icon iconName="GlobalNavButton" styles={subComponentStyles.icons} />
            </button>
          )}
          <div className={classNames.title}>{title}</div>
          {/* <div className={classNames.buttons}>
            <FocusZone direction={FocusZoneDirection.horizontal}>
              {sideLinks
                .map((link: ISideLink) => (
                  <a key={link.url} className={classNames.button} href={link.url}>
                    {link.name}
                  </a>
                ))
                .concat([
                  <button key="headerButton" className={classNames.button} onClick={this._onGearClick} aria-label="Settings">
                    <Icon iconName="Settings" styles={subComponentStyles.icons} />
                  </button>
                ])}
            </FocusZone>
          </div> */}
        </div>
        {contextMenu && (
          <ContextualMenu
            items={contextMenu.items}
            isBeakVisible={true}
            target={contextMenu.target}
            directionalHint={DirectionalHint.bottomAutoEdge}
            gapSpace={5}
            onDismiss={this._onDismiss}
          />
        )}
      </div>
    );
  }

  private _onMenuClick = (): void => {
    const { onIsMenuVisibleChanged, isMenuVisible } = this.props;

    if (onIsMenuVisibleChanged) {
      onIsMenuVisibleChanged(!isMenuVisible);
    }
  }

  private _onGearClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { contextMenu } = this.state;

    this.setState({
      contextMenu: contextMenu
        ? undefined
        : {
            target: ev.currentTarget as HTMLElement,
            items: this._getOptionMenuItems()
          }
    });
  }

  private _getOptionMenuItems(): IContextualMenuItem[] {
    return [
    ];
  }

  private _onDismiss = (): void => {
    this.setState({
      contextMenu: undefined
    });
  }
}

export const Header: React.FunctionComponent<IHeaderProps> = styled<IHeaderProps, IHeaderStyleProps, IHeaderStyles>(
  HeaderBase,
  getHeaderStyles,
  undefined,
  {
    scope: "Header"
  }
);
