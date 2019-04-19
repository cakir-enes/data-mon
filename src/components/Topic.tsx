import React, { useState } from "react";
import {
  Button,
  Divider,
  Collapse,
  ControlGroup,
  HTMLSelect
} from "@blueprintjs/core";
import { Table, Column, Cell, SelectionModes } from "@blueprintjs/table";
import { useTopic } from "../api/TopicHooks";
import {
  useFocusedTopicContext,
  useSubscriptionsContext
} from "../api/EasyState";

export const Topic = ({
  name,
  tabIndex
}: {
  name: string;
  tabIndex: number;
}) => {
  let [isOpen, setIsOpen] = useState(false);
  let [topic, _] = useTopic(name);
  let { focusToTopic } = useFocusedTopicContext();
  let { delSubscription } = useSubscriptionsContext();

  return (
    <div style={{ width: "100%" }}>
      <ControlGroup tabIndex={tabIndex}>
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
        <Button text="Publish" onClick={() => focusToTopic(topic)} />
        <Button icon="cross" onClick={() => delSubscription(name)} />
        {/* <HTMLSelect options={[ 5, 10, 15 ]} onChange={(e) => updateNumOfLastTopics(+e.currentTarget.value)} /> */}
      </ControlGroup>
      <Collapse isOpen={isOpen}>
        <div style={{ height: "400px" }}>
          <Table
            selectionModes={SelectionModes.COLUMNS_ONLY}
            numRows={topic && topic.fields ? topic.fields.length : 0}
          >
            {[
              <Column
                key={"FIELDSKEY"}
                name="FIELDS"
                cellRenderer={i => (
                  <Cell key={i + ""}>
                    {topic && topic ? topic.fields[i] : ""}
                  </Cell>
                )}
              />
            ].concat(
              topic && topic.topicStack && topic.fields
                ? topic.topicStack.map((t, i) => (
                    <Column
                      key={i}
                      name={t.timeStamp}
                      cellRenderer={i => (
                        <Cell key={i + ""}>{t[topic.fields[i]]}</Cell>
                      )}
                    />
                  ))
                : []
            )}
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
