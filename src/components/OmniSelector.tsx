import React, { memo } from "react";
import {
  HotkeysTarget,
  Hotkeys,
  Hotkey,
  MenuItem,
  Button,
  Menu,
  KeyCombo
} from "@blueprintjs/core";
import {
  Omnibar,
  ItemRenderer,
  ItemPredicate,
  IItemRendererProps
} from "@blueprintjs/select";

interface ITopic {
  name: string;
  added: boolean;
}

const TopicOmnibar = Omnibar.ofType<ITopic>();

@HotkeysTarget
export class OmniSelector extends React.PureComponent<
  { availableTopics: string[]; addSubscription: (names: string[]) => void },
  { isOpen: boolean; isOnSubMode: boolean }
> {
  state = {
    isOpen: false,
    isOnSubMode: false
  };

  items = this.props.availableTopics.map(
    i => ({ name: i, added: false } as ITopic)
  );

  renderHotkeys() {
    return (
      <Hotkeys>
        <Hotkey
          global={true}
          combo="shift + s"
          label="Search for topics"
          onKeyDown={() =>
            this.setState({ isOpen: !this.state.isOpen, isOnSubMode: true })
          }
          preventDefault={true}
        />
        <Hotkey
          global={true}
          combo="shift + p"
          label="Search for topics"
          onKeyDown={() =>
            this.setState({ isOpen: !this.state.isOpen, isOnSubMode: false })
          }
          preventDefault={true}
        />
      </Hotkeys>
    );
  }

  topicRenderer: ItemRenderer<ITopic> = (topic, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={topic.name}
        text={topic.name}
        onClick={handleClick}
        shouldDismissPopover={false}
      />
    );
  };

  renderItemList = (props: any) => {
    if (props.filteredItems.length === 0) {
      return (
        <Menu ulRef={props.itemsParentRef}>
          <MenuItem disabled={true} text="No results." />
        </Menu>
      );
    }
    return (
      <Menu ulRef={props.itemsParentRef}>
        {props.items.map(props.renderItem)}
      </Menu>
    );
  };

  filterTopic: ItemPredicate<ITopic> = (query, topic) => {
    return (
      topic.name.toLowerCase().indexOf(query.toLowerCase()) >= 0 && !topic.added
    );
  };

  handleItemSelect = (item: ITopic) => {
    if (this.state.isOnSubMode) {
      item.added = true;
      this.props.addSubscription([item.name]);
    }
    console.log(`NEW ITEMS: ${this.items.map(i => `${i.name} ${i.added} - `)}`);
  };

  render() {
    return (
      <>
        <span>
          Subscribe to topic
          <KeyCombo combo="shift + S" />
        </span>
        <TopicOmnibar
          key="SubSearchbar"
          inputProps={{ placeholder: "Search for subscription..." }}
          itemListRenderer={this.renderItemList}
          itemListPredicate={(query, items) =>
            items.filter(item => this.filterTopic(query, item))
          }
          itemsEqual="name"
          items={this.items}
          itemRenderer={this.topicRenderer}
          isOpen={this.state.isOpen}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={this.handleItemSelect}
          onClose={() => this.setState({ isOpen: false })}
        />
      </>
    );
  }
}
