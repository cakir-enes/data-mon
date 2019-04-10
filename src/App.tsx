import React, { Component, useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import {Button} from '@blueprintjs/core'
import {MultiSelect} from '@blueprintjs/select'
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { TopicSelector } from './components/TopicSelector';

export const SelectedTopics = React.createContext({selected: [] as string[], addTopics: (it: string[]) => {}})

const App = () => {
  let Selections = MultiSelect.ofType<String>()
  let [selected, setSelected] = useState([] as string[])
  useEffect(() => {
    console.log(`Selected:: ${selected}`)
  }, [selected])
  return (
      <div className="App">
        <header className="App-header">
          <Header></Header>
        
          <p>
            Editsdsdfaafsd sdf<code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Reac
          </a>
        
        </header>
        <SelectedTopics.Provider 
          value={{selected: selected, addTopics: (it: string[]) => {
            setSelected(selected.concat(it)); console.log(`Selected: ${selected} Added: ${it}`)}
            }}>
        <TopicSelector />
        </SelectedTopics.Provider>
      </div>
  )
}

export default App;
