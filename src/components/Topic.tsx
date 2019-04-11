import React, { useState } from "react";
import {
  Label,
  Button,
  Card,
  Divider,
  Collapse,
  Icon,
  ControlGroup,
  HTMLSelect
} from "@blueprintjs/core";
import { Table, Column, Cell, RegionCardinality, SelectionModes } from "@blueprintjs/table";

const style: React.CSSProperties = {
  fontSize: "inherit",
  boxShadow: "none",
  background: "transparent",
  border: "1px solid #ccc",
  padding: "0.5rem",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
};

const formatDate = (date: Date) =>
  `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
const str = "";
function parseJson(obj: any, depth: number = 0) {
  for (var prop in obj) {
    if (typeof obj[prop] === "object") {
      parseJson(obj[prop], depth + 2);
    }
    str.concat(" ".repeat(depth), obj[prop]);
  }
}

const cellRenderer = (rowIndex: number) => {
  return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>;
};

export const Topic = () => {
  let topicName = "tr.com.zileley.lelbeley";
  let [recentTopics, setRecentTopics] = useState([] as any[]);
  let [lastReceived, setLastReceived] = useState(new Date(Date.now()));
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      <ControlGroup>
        <Button
          icon={isOpen ? "caret-down" : "caret-right"}
          fill={true}
          alignText="left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div style={{ float: "left" }}>{topicName}</div>
          <div style={{ float: "right", overflow: "hidden" }}>
            Last Received: {formatDate(lastReceived)}
          </div>
        </Button>
        <HTMLSelect options={[5, 10, 15]} />
      </ControlGroup>
      <Collapse isOpen={isOpen}>
        <Table onSelection={(e) => {console.log(e)}} selectionModes={SelectionModes.ROWS_ONLY} numRows={10}>
          <Column name="asd\nasdas" cellRenderer={cellRenderer}>
          
          </Column>
        </Table>
      </Collapse>
    </div>
  );
};

function f(obj: any, str = "", topic: any) {
  let type = Array.isArray(obj) ? "array" : typeof obj;
  switch (type) {
    case "array":
      obj.forEach((it: any, idx: number) => f(it, `${str}[${idx}]`, topic));
      break;
    case "object":
      for (var prop in obj) {
        f(obj[prop], `${str}.${prop}`, topic);
      }
      break;
    default:
      console.log(`${str} -> ${obj}`);
      topic[str] = obj;
  }
}
