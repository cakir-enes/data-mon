import React, { useState } from "react";
import {
  Button,
  Divider,
  Collapse,
  ControlGroup,
  HTMLSelect,
} from "@blueprintjs/core";
import { Table, Column, Cell, RegionCardinality, SelectionModes, ColumnHeaderCell } from "@blueprintjs/table";
import { useTopic, useFocusedTopic } from '../api/TopicHooks';
import { useFocusedTopicContext } from '../api/EasyState';

export const Topic = ({name}: {name: string}) => {
  let [isOpen, setIsOpen] = useState(false);
  let [topic, updateNumOfLastTopics] = useTopic(name)
  let { focusToTopic } = useFocusedTopicContext()

  return (
    <div style={{ width: "100%" }}>
      <ControlGroup>
        <Button
          icon={isOpen ? "caret-down" : "caret-right"}
          fill={true}
          alignText="left"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div style={{ float: "left" }}>{topic.name}</div>
          <div style={{ float: "right", overflow: "hidden" }}>
            Last Received: {topic.lastRecieved}
          </div>
        </Button>
        <Button text="Publish"  onClick={() => focusToTopic(topic)} />
        <HTMLSelect options={[5, 10, 15]} onChange={e => updateNumOfLastTopics( +e.currentTarget.value)} />
      </ControlGroup>
      <Collapse isOpen={isOpen}>
      <div style={{height: "400px"}}>
        <Table selectionModes={SelectionModes.COLUMNS_ONLY} numRows={topic && topic.fields ? topic.fields.length : 0}>
          {[<Column  name="FIELDS" cellRenderer={i => <Cell key={i+""}>{(topic && topic) ? topic.fields[i] : ""}</Cell>} />].concat(
            topic && topic.topicStack && topic.fields ? topic.topicStack.map((t, i) => <Column name={t.timeStamp} cellRenderer={i => <Cell key={i+""}>{t[topic.fields[i]]}</Cell>} />)
          : [])}
        </Table>
        </div>
      </Collapse>
    </div>
  );
};

const style: React.CSSProperties = {
  fontSize: "inherit",
  boxShadow: "none",
  background: "transparent",
  border: "1px solid #ccc",
  padding: "0.5rem",
  WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
};