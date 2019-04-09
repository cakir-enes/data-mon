import React, { useState, useContext } from "react";
import { MultiSelect, ItemRenderer, Select, ItemPredicate } from "@blueprintjs/select";
import { MenuItem, Button, Callout, UL } from "@blueprintjs/core";
import { SelectedTopics }from '../App'

interface ITopic {
  name: string;
  added: false;
}

export const TopicSelector = () => {
  let [topics, setTopics] = useState(["AAA", "BB", "CC"].map(i => ({name: i, added: false} as ITopic)));
  let [selected, setSelected] = useState([] as ITopic[]);
  let addedTopics = useContext(SelectedTopics)

  let TopicSelects = MultiSelect.ofType<string>();
  
  let isSelected = (topic: ITopic) => {
    return selected.includes(topic, 0)
  }

  let filterTopic: ItemPredicate<string> = (query, name) => {
    return (
      name.toLowerCase().indexOf(query.toLowerCase())
      ) >= 0
  }

  let handleItemSelect = (topic: ITopic) => {
    let idx = selected.findIndex(i => i.name === topic.name)
    if (idx !== -1) {
      selected.splice(idx, 1)
    } else {
      setSelected([...selected, name])
    }
  }
// TODO FIX
  let handleAddTopics = () => {
    selectedTopics = selectedTopics.concat(selected)
    console.log(`STOPICS: ${selectedTopics} S: ${selected}`)
    selectedTopics.concat(selected);
    console.log(selectedTopics);

    setTopics(topics.filter(it => selectedTopics.indexOf(it) < 0))
  }
  
  let topicRenderer: ItemRenderer<ITopic> = (topic, {modifiers, handleClick}) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
    <MenuItem
    active={modifiers.active} 
    icon={isSelected(topic.name) ? "tick" : "blank"} 
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
      onItemSelect={handleItemSelect}
      tagRenderer={i => i}
      itemPredicate={filterTopic}
      selectedItems={selected}
      tagInputProps={{onRemove: (_tag, idx: number) => setSelected(selected.filter(t => t !== _tag))}}
      noResults={<MenuItem disabled={true} text="No results." />}
    >
    </TopicSelects>
    <Button text="Add Selected Topics" onClick={handleAddTopics} />
    </>
  );
};
