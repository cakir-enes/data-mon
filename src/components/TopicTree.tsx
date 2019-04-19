import React, { useEffect, useState } from "react";
import {
  Tree,
  ITreeNode,
  Tooltip,
  Position,
  Icon,
  Intent,
  Classes
} from "@blueprintjs/core";
import { topicApi } from "../api/TopicApi";

export interface ITreeExampleState {
  nodes: ITreeNode[];
}

export const TopicTree = ({ name }: { name: string }) => {
  const [nodes, setNodes] = useState([] as ITreeNode[]);
  const [fake, setFake] = useState(false);

  useEffect(() => {
    const root: ITreeNode = {
      id: 0,
      label: "ROOT",
      childNodes: [],
      isExpanded: true
    };
    const fields = topicApi.getFieldsOf(name);

    function insert(node: ITreeNode, path: string) {
      const pathParts = path.split(".");
      let current = node;
      pathParts.forEach((part, i) => {
        let children = current.childNodes || [];
        let alreadyExists = false;
        let idx = children.findIndex(ch => ch.label === part);
        alreadyExists = idx >= 0;

        if (!alreadyExists) {
          let node: ITreeNode = {
            label: part,
            id: current.label + part,
            isExpanded: true,
            childNodes: i == pathParts.length - 1 ? undefined : []
          };
          children.push(node);
          current = node;
        } else {
          current = children[idx];
        }
      });
    }
    fields.forEach(f => insert(root, f));
    setNodes(root.childNodes!);
  }, []);

  const handleNodeClick = (
    nodeData: ITreeNode,
    _nodePath: number[],
    e: React.MouseEvent<HTMLElement>
  ) => {
    const originallySelected = nodeData.isSelected;
    if (!e.shiftKey) {
      forEachNode(nodes, n => (n.isSelected = false));
    }
    nodeData.isSelected =
      originallySelected == null ? true : !originallySelected;
    setNodes(nodes);
    setFake(!fake);
  };

  const handleNodeCollapse = (nodeData: ITreeNode) => {
    nodeData.isExpanded = false;
    setNodes(nodes);
    setFake(!fake);
  };

  const handleNodeExpand = (nodeData: ITreeNode) => {
    nodeData.isExpanded = true;
    setNodes(nodes);
    setFake(!fake);
  };

  const forEachNode = (
    nodes: ITreeNode[],
    callback: (node: ITreeNode) => void
  ) => {
    if (nodes == null) {
      return;
    }

    for (const node of nodes) {
      callback(node);
      if (node.childNodes) forEachNode(node.childNodes, callback);
    }
  };

  return (
    <Tree
      contents={nodes}
      onNodeClick={handleNodeClick}
      onNodeCollapse={handleNodeCollapse}
      onNodeExpand={handleNodeExpand}
      className={Classes.ELEVATION_0}
    />
  );
};
