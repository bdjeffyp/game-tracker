import { IMessageBarStyleProps, IMessageBarStyles, IStyleFunctionOrObject } from 'office-ui-fabric-react';

export interface IAppMessageBarProps {
  /** Text for the message bar */
  text: string;

  /** Text for a link shown after the main text */
  linkText?: string;

  /** URL for a link shown after the main text */
  linkUrl?: string;

  /**
   * Prefix for session storage key for storing if the message bar has been closed.
   * If not provided, local storage will not be used.
   */
  sessionStoragePrefix?: string;

  /** Styles for the message bar */
  styles?: IStyleFunctionOrObject<IMessageBarStyleProps, IMessageBarStyles>;
}
