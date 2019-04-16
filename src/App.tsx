import React, { Component, useState, useRef, useEffect } from 'react';
import { MultiSelect } from '@blueprintjs/select'
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import '@blueprintjs/table/lib/css/table.css'
import { TopicSelector } from './components/TopicSelector';
import { Topic } from './components/Topic';
import { topicApi } from "./api/TopicApi"
import { useFocusedTopicContext, useSubscriptionsContext } from './api/EasyState';
import { Label } from '@blueprintjs/core';

export const SelectedTopics = React.createContext({ selected: [] as string[], addTopics: (it: string[]) => { } })


const Labele = () => {
  const lele = useFocusedTopicContext()
  return <Label>{lele.topic ? lele.topic.name : "NONE"}</Label>
}

const App = () => {
  return (
    <div className="App">
      <useSubscriptionsContext.Provider>
        <TopicSelector />
      </useSubscriptionsContext.Provider>
      <useFocusedTopicContext.Provider>
        <useSubscriptionsContext.Provider initialSubs={[""]}>
          <Topic name="TEST" />
          <Labele />
        </useSubscriptionsContext.Provider>
      </useFocusedTopicContext.Provider>

    </div>
  )
}

export default App;
