import React, { Component } from 'react';
import Header from './components/Header';
import {Button} from '@blueprintjs/core'
import {MultiSelect} from '@blueprintjs/select'
import "@blueprintjs/select/lib/css/blueprint-select.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import { TopicSelector } from './components/TopicSelector';

export const SelectedTopics = React.createContext([] as string[])

const App = () => {
  let Selections = MultiSelect.ofType<String>()
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
        <TopicSelector />
      </div>
  )
}

export default App;
