import { useState, useEffect } from "react";
import { topicApi } from './TopicApi'

export function useTopic(name: string): [TopicState, (i: number) => void] {
    let [topic, setTopic] = useState({ topicStack: [] as any[]} as TopicState)
    let [numOfTopics, setNumOfTopics] = useState(5)

    useEffect(() => {
        const handleNewTopic = (newTopic: any) => {
            let topics = topic.topicStack
            topics.push(newTopic)
            if (topics.length >= numOfTopics) {
                topics = topics.slice(topics.length - numOfTopics , topics.length)
            }
            setTopic({
                name,
                lastRecieved: newTopic.timeStamp,
                fields: topicApi.getFieldsOf(name),
                topicStack: topics
            })
        }
        topicApi.subscribeToTopic(name, handleNewTopic)
        return () => topicApi.unsubscribeFromTopic(name)
    }, [numOfTopics])

    let updateNumOfLastTopics = (i: number) => {
        setNumOfTopics(i)
    }

    return [topic, updateNumOfLastTopics]
}

export function useSubscriptions(): string[] {
    let [subs, setSubs] = useState(["TEST"] as string[])
    return subs
}



interface TopicState {
    name: string;
    lastRecieved: string;
    fields: string[];
    topicStack: any[];
}

export interface AppState {
    publishingTopic: any;
    subscriptions: string[]
}