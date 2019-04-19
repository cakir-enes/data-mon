import { Classes, Icon, IconName, KeyCombo } from "@blueprintjs/core";
import * as React from "react";

export interface INavButtonProps {
  icon: IconName;
  hotkey: string;
  text: string;
  onClick: () => void;
}

export const NavButton: React.SFC<INavButtonProps> = props => (
  <div
    className={Classes.TEXT_MUTED}
    style={{ display: "flex" }}
    onClick={props.onClick}
  >
    <Icon style={{ alignSelf: "flex-start" }} icon={props.icon} />
    <span
      style={{ alignSelf: "center", paddingLeft: "15px", paddingRight: "15px" }}
      className={Classes.FILL}
    >
      {props.text}
    </span>
    <div style={{ alignSelf: "flex-end", opacity: 0.5 }}>
      <KeyCombo combo={props.hotkey} minimal={true} />
    </div>
  </div>
);
