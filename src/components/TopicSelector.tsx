import React, { useState } from "react";
import { MultiSelect, ItemRenderer, ItemPredicate } from "@blueprintjs/select";
import { MenuItem, Button } from "@blueprintjs/core";
import { useSubscriptionsContext } from "../api/EasyState";

export const TopicSelector = () => {
  let [topics, setTopics] = useState(
    ["AAA", "BB", "CC"].map(i => ({ name: i, added: false } as ITopic))
  );
  let [selectedTopics, setSelectedTopics] = useState([] as ITopic[]);
  let { addSubscription, delSubscription } = useSubscriptionsContext();
  let TopicSelects = MultiSelect.ofType<ITopic>();

  let filterTopic: ItemPredicate<ITopic> = (query, topic) => {
    return (
      (topic.name.toLowerCase().indexOf(query.toLowerCase()) &&
        !topic.selected) >= 0
    );
  };

  let handleTagRemove = (tag: string, idx: number) => {
    let topicIdx = topics.findIndex(it => it.name === tag);
    topics[topicIdx].selected = false;
    setSelectedTopics(topics.filter(i => i.selected));
    console.log(topics);
  };

  let handleAddTopics = () => {
    let selected = topics.filter(it => it.selected);
    addSubscription(selected.map(i => i.name));
    selected.forEach(it => (it.added = true));
    setTopics(topics.filter(it => !it.selected));
    setSelectedTopics([]);
  };

  let topicRenderer: ItemRenderer<ITopic> = (
    topic,
    { modifiers, handleClick }
  ) => {
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
          topic.selected = !topic.selected;
          setSelectedTopics(topics.filter(it => it.selected));
        }}
        selectedItems={selectedTopics}
        tagRenderer={topic => topic.name}
        itemPredicate={filterTopic}
        tagInputProps={{
          onRemove: (_tag, idx: number) => handleTagRemove(_tag, idx)
        }}
        noResults={<MenuItem disabled={true} text="No results." />}
      />
      <Button text="Add Selected Topics" onClick={handleAddTopics} />
    </>
  );
};

interface ITopic {
  name: string;
  added: boolean;
  selected: boolean;
}
