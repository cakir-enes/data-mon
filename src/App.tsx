import React, { Component, useState, useRef, useEffect } from "react";
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import "@blueprintjs/table/lib/css/table.css";
import { Topic } from "./components/Topic";
import {
  useFocusedTopicContext,
  useSubscriptionsContext
} from "./api/EasyState";
import { UL, FocusStyleManager } from "@blueprintjs/core";
import { OmniSelector } from "./components/OmniSelector";

const SubscriptionList = () => {
  const { subs } = useSubscriptionsContext();

  return (
    <UL>
      {subs.map((name, i) => (
        <Topic name={name} key={name} tabIndex={i} />
      ))}
    </UL>
  );
};

const TopicSelectorAndPublisher = () => {
  const { subs, addSubscription, delSubscription } = useSubscriptionsContext();
  const [availableTopics, setAvlTopics] = useState(
    ["AAA", "VVVV", "CCCC"].map(i => ({ name: i, added: false }))
  );
  useEffect(() => {
    availableTopics.forEach(t => (t.added = subs.includes(t.name)));
  }, [subs]);
  return (
    <OmniSelector
      availableTopics={availableTopics}
      addSubscription={addSubscription}
      delSubscription={delSubscription}
    />
  );
};

const App = () => {
  FocusStyleManager.onlyShowFocusOnTabs();
  return (
    <div className="App">
      <useFocusedTopicContext.Provider>
        <useSubscriptionsContext.Provider>
          <div style={{ justifyContent: "center", display: "flex" }}>
            <TopicSelectorAndPublisher />
          </div>
          <SubscriptionList />
        </useSubscriptionsContext.Provider>
      </useFocusedTopicContext.Provider>
    </div>
  );
};

export default App;
