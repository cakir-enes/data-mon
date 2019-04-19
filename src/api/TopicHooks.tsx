import { useState, useEffect, createContext, useReducer } from "react";
import { topicApi } from "./TopicApi";
import { TopicSelector } from "../components/TopicSelector";

// export const SET_FOCUSED_TOPIC = 'SET_FOCUSED_TOPIC'
// export const ADD_SUB = 'ADD_SUB'
// export const DEL_SUB = "DEL_SUB"

// interface SetFocusedTopicAction {
//     type: typeof SET_FOCUSED_TOPIC
//     payload: TopicState
// }

// interface AddSubAction {
//     type: typeof ADD_SUB
//     payload: string
// }

// interface DelSubAction {
//     type: typeof DEL_SUB
//     payload: string
// }

// type AppActionTypes = SetFocusedTopicAction | AddSubAction | DelSubAction

// export function setFocusedTopic(newTopic: TopicState): AppActionTypes {
//     return {
//         type: SET_FOCUSED_TOPIC,
//         payload: newTopic
//     }
// }
// export function addSubscription(topicName: string): AppActionTypes {
//     return {
//         type: ADD_SUB,
//         payload: topicName
//     }
// }

// export function delSubscription(topicName: string): AppActionTypes {
//     return {
//         type: DEL_SUB,
//         payload: topicName
//     }
// }

// export const initialState: AppState = {
//     focusedTopic: null,
//     subscriptions: [] as string[]
// }

// export function appReducer(state = initialState, action: AppActionTypes): AppState {
//     switch (action.type) {
//         case ADD_SUB:
//             return {
//                 ...state,
//                 subscriptions: [...state.subscriptions, action.payload]
//             }
//         case DEL_SUB:
//             return {
//                 ...state,
//                 subscriptions: state.subscriptions.filter(i => i !== action.payload)
//             }
//         case SET_FOCUSED_TOPIC:
//             return {
//                 ...state,
//                 focusedTopic: action.payload
//             }
//         default:
//             return state
//     }
// }

interface IAppContext {
  focusedTopic: TopicState | null;
  subscriptions: string[];
  addSubscription: (t: string) => void;
  delSubscription: (t: string) => void;
  setFocusedTopic: (t: TopicState) => void;
}
export const AppContext = createContext<Partial<IAppContext>>({});

// export const StateProvider: React.FunctionComponent<{}> = props => {

//     return (
//         <AppContext.Provider value={useReducer(appReducer, initialState)}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }

export function useTopic(name: string): [TopicState, (i: number) => void] {
  let [topic, setTopic] = useState({ topicStack: [] as any[] } as TopicState);
  let [numOfTopics, setNumOfTopics] = useState(100);

  useEffect(() => {
    const handleNewTopic = (newTopic: any) => {
      let topics = topic.topicStack;
      topics.push(newTopic);
      if (topics.length >= numOfTopics) {
        topics = topics.slice(topics.length - numOfTopics, topics.length);
      }
      setTopic({
        name,
        lastRecieved: newTopic.timeStamp,
        fields: topicApi.getFieldsOf(name),
        topicStack: topics
      });
    };
    topicApi.subscribeToTopic(name, handleNewTopic);
    return () => topicApi.unsubscribeFromTopic(name);
  }, [numOfTopics]);

  let updateNumOfLastTopics = (i: number) => {
    setNumOfTopics(i);
  };

  return [topic, updateNumOfLastTopics];
}

export interface TopicState {
  name: string;
  lastRecieved: string;
  fields: string[];
  topicStack: any[];
}

// export interface AppState {
//     focusedTopic: TopicState | null
//     subscriptions: string[]
// }
