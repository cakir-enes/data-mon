import React, { useState } from 'react'
import createUseContext from "constate"
import { TopicState } from './TopicHooks';


function useFocusedTopic({initalFocusedTopic = (null as (TopicState | null))} = {}) {
    const [topic, setTopic] = useState(initalFocusedTopic)
    const focusToTopic = (topic: TopicState) => setTopic(topic)
    return {topic, focusToTopic}
}

function useSubscriptions({initialSubs = [] as string[]} = {}) {
    const [subs, setSubs] = useState(initialSubs)
    const addSubscription = (t: string[]) => setSubs(subs.concat(t))
    const delSubscription = (t: string) => setSubs(subs.filter(i => i !== t))
    return {subs, addSubscription, delSubscription}
}

// function useFocusedTopic({ initialTopic = "None"} = {}) {
//     const [topic, setTopic] = useState(initialTopic)
//         const focusToTopic = (topic: string) => setTopic(topic)
//         return {topic, focusToTopic}
// }

export const useFocusedTopicContext = createUseContext(useFocusedTopic, value => [value.topic])
export const useSubscriptionsContext = createUseContext(useSubscriptions, value => [value.subs])
