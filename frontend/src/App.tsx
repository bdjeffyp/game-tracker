import * as React from "react";

export default class App extends React.Component {
  public render(): JSX.Element {
    return <button onClick={this._buttonClicked}>Hey there!</button>;
  }

  private _buttonClicked = (): void => {
    alert("Hello, world!");
  }
}
