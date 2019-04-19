import React, { Component, useState, useRef, useEffect } from "react";
import { MultiSelect } from "@blueprintjs/select";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import "@blueprintjs/table/lib/css/table.css";
import { TopicSelector } from "./components/TopicSelector";
import { Topic } from "./components/Topic";
import { topicApi } from "./api/TopicApi";
import {
  useFocusedTopicContext,
  useSubscriptionsContext
} from "./api/EasyState";
import { Label, UL } from "@blueprintjs/core";
import { OmniSelector } from "./components/OmniSelector";

export const SelectedTopics = React.createContext({
  selected: [] as string[],
  addTopics: (it: string[]) => {}
});

const Labele = () => {
  const lele = useFocusedTopicContext();
  const { subs } = useSubscriptionsContext();

  return (
    <div>
      <Label>{lele.topic ? lele.topic.name : "NONE"}</Label>
      <UL>
        {subs.map(i => (
          <Topic name="TEST" key={i} />
        ))}
      </UL>
    </div>
  );
};

const SubscriptionList = () => {
  const { subs } = useSubscriptionsContext();
  return (
    <UL>
      {subs.map(name => (
        <Topic name={name} key={name} />
      ))}
    </UL>
  );
};

const TopicSelectorAndPublisher = () => {
  const { addSubscription } = useSubscriptionsContext();
  return (
    <OmniSelector
      availableTopics={["AAAA", "VVVV", "CCC"]}
      addSubscription={addSubscription}
    />
  );
};

const App = () => {
  return (
    <div className="App">
      <useFocusedTopicContext.Provider>
        <useSubscriptionsContext.Provider>
          {/* <TopicSelector /> */}
          <TopicSelectorAndPublisher />
          <SubscriptionList />
        </useSubscriptionsContext.Provider>
      </useFocusedTopicContext.Provider>
    </div>
  );
};

export default App;
