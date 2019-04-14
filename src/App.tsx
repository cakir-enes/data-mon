import React, { Component, useState, useRef, useEffect } from 'react';
import {MultiSelect} from '@blueprintjs/select'
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "@blueprintjs/core/lib/css/blueprint.css";

import '@blueprintjs/table/lib/css/table.css'
import { TopicSelector } from './components/TopicSelector';
import { Topic } from './components/Topic';
import { topicApi } from "./api/TopicApi"

export const SelectedTopics = React.createContext({selected: [] as string[], addTopics: (it: string[]) => {}})

const App = () => {
  let Selections = MultiSelect.ofType<String>()
  let [selected, setSelected] = useState([] as string[])
  useEffect(() => {
    console.log(`Selected:: ${selected}`)
  }, [selected])
  return (
      <div className="App">
        <SelectedTopics.Provider 
          value={{selected: selected, addTopics: (it: string[]) => {
            setSelected(selected.concat(it)); console.log(`Selected: ${selected} Added: ${it}`)}
            }}>
        <TopicSelector />
        </SelectedTopics.Provider>
        <Topic name="TEST" />
      </div>
  )
}

export default App;
