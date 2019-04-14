import React, { useState, useContext } from "react";
import { MultiSelect, ItemRenderer, Select, ItemPredicate } from "@blueprintjs/select";
import { MenuItem, Button, Callout, UL } from "@blueprintjs/core";
import { SelectedTopics }from '../App'


export const TopicSelector = () => {
  let [topics, setTopics] = useState(["AAA", "BB", "CC"].map(i => ({name: i, added: false} as ITopic)));
  let topicsContext = useContext(SelectedTopics)
  let [selectedTopics, setSelectedTopics] = useState([] as ITopic[])
  let TopicSelects = MultiSelect.ofType<ITopic>();
  
  let filterTopic: ItemPredicate<ITopic> = (query, topic) => {
    return (
      topic.name.toLowerCase().indexOf(query.toLowerCase())
      ) >= 0
  }

  let handleTagRemove = (tag: string, idx: number) => {
    let topicIdx = topics.findIndex(it => it.name === tag)
    if (topicIdx !== -1) topics[topicIdx].selected = false
  }

  let handleAddTopics = () => {
    let selected = topics.filter(it => it.selected)
    topicsContext.addTopics(selected.map(it => it.name))
    selected.forEach(it => it.added = true)
    setTopics(topics.filter(it => !it.selected))
    setSelectedTopics([])
  }

  let topicRenderer: ItemRenderer<ITopic> = (topic, {modifiers, handleClick}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
    <MenuItem
    active={modifiers.active} 
    icon={topic.selected ? "tick" : "blank"} 
    key={topic.name} 
    text={topic.name} 
    onClick={handleClick}
    shouldDismissPopover={false} 
    />
    );
  };
  return (
    <>
    <TopicSelects
      items={topics}
      itemRenderer={topicRenderer}
      onItemSelect={topic => {
        topic.selected = !topic.selected; setSelectedTopics(topics.filter(it => it.selected))
      }}
      selectedItems={selectedTopics}
      tagRenderer={topic => topic.name}
      itemPredicate={filterTopic}
      tagInputProps={{onRemove: (_tag, idx: number) => topics[topics.findIndex(it => it.name === _tag)] }}
      noResults={<MenuItem disabled={true} text="No results." />}
    >
    </TopicSelects>
    <Button text="Add Selected Topics" onClick={handleAddTopics} />
    </>
  );
};



interface ITopic {
  name: string;
  added: boolean;
  selected: boolean;
}
