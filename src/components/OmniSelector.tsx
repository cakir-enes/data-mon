import React from "react";
import {
  HotkeysTarget,
  Hotkeys,
  Hotkey,
  MenuItem,
  Menu,
  Dialog,
  Classes,
  Button,
  Divider
} from "@blueprintjs/core";
import { Omnibar, ItemRenderer, ItemPredicate } from "@blueprintjs/select";
import { TopicTree } from "./TopicTree";
import { NavButton } from "./NavButton";

export interface IOmniTopic {
  name: string;
  added: boolean;
}

const TopicOmnibar = Omnibar.ofType<IOmniTopic>();

@HotkeysTarget
export class OmniSelector extends React.PureComponent<
  ISelectorProps,
  ISelectorState
> {
  state = {
    isOpen: false,
    isOnSubMode: false,
    isPublishing: false,
    activeTopicName: ""
  };

  items = this.props.availableTopics;

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

  topicRenderer: ItemRenderer<IOmniTopic> = (
    topic,
    { modifiers, handleClick }
  ) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        key={topic.name}
        text={topic.name}
        onClick={handleClick}
        icon={
          this.state.isOnSubMode
            ? topic.added
              ? "tick"
              : "plus"
            : "arrow-right"
        }
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

  filterTopic: ItemPredicate<IOmniTopic> = (query, topic) => {
    return topic.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
  };

  handleItemSelect = (item: IOmniTopic) => {
    if (this.state.isOnSubMode) {
      item.added
        ? this.props.delSubscription(item.name)
        : this.props.addSubscription([item.name]);
      item.added = !item.added;
    } else {
      this.setState({
        activeTopicName: item.name,
        isPublishing: true,
        isOpen: false
      });
    }
  };
  render() {
    return (
      <>
        <div style={{ display: "flex" }}>
          <NavButton
            icon="search"
            hotkey="shift + s"
            text="Subscribe"
            onClick={() => console.log()}
          />
          <Divider style={{ marginLeft: "40px", marginRight: "40px" }} />
          <NavButton
            icon="search-around"
            hotkey="shift + p"
            text="Publish"
            onClick={() => console.log()}
          />
        </div>
        <TopicOmnibar
          key="SubSearchbar"
          inputProps={{
            placeholder: this.state.isOnSubMode
              ? "Subscribe to a topic..."
              : "Publish a topic.."
          }}
          itemListRenderer={this.renderItemList}
          itemPredicate={this.filterTopic}
          itemsEqual="name"
          items={this.items}
          itemRenderer={this.topicRenderer}
          isOpen={this.state.isOpen}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={this.handleItemSelect}
          onClose={() => this.setState({ isOpen: false })}
        />
        <Dialog
          title={`Publish ${this.state.activeTopicName}:`}
          isOpen={this.state.isPublishing}
          onClose={() => this.setState({ isPublishing: false })}
        >
          <div className={Classes.DIALOG_BODY}>
            <TopicTree name={this.state.activeTopicName} />
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button text="PUBLISH" />
            </div>
          </div>
        </Dialog>
      </>
    );
  }
}

interface ISelectorProps {
  availableTopics: IOmniTopic[];
  addSubscription: (names: string[]) => void;
  delSubscription: (name: string) => void;
}

interface ISelectorState {
  isOpen: boolean;
  isOnSubMode: boolean;
  isPublishing: boolean;
  activeTopicName: string;
}
