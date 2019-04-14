import { useState, useEffect } from "react";
import {topicApi} from './TopicApi'

const formatDate = (date: Date) =>
`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

export function useTopic(name: string): TopicState {
  let [topic, setTopic] = useState({} as TopicState)

  useEffect(() => {
      function handleNewTopic(newTopic: any) {
          let topics = topic.topicStack || []
          if (topics.length >= topic.numOfTopics)
              topics.pop()
          topics.push(newTopic)
          setTopic({
              name,
              lastRecieved: "",
              fields: topicApi.getFieldsOf(name),
              numOfTopics: 5,
              topicStack: topics
          })    
      }
      topicApi.subscribeToTopic(name, handleNewTopic)
      return () => topicApi.unsubscribeFromTopic(name)
  }, [])
  console.log(topic)
  return topic
}

export function useSubscriptions(): string[] {
    let [subs, setSubs] = useState(["TEST"] as string[])
    useEffect(() => {
        
        }
    )

    return subs
}



interface TopicState {
    name: string;
    lastRecieved: string;
    fields: string[];
    numOfTopics: number;
    topicStack: any[];
}

export interface AppState {
    publishingTopic: any;
    subscriptions: string[]
}