import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import HasChildrenIcon from './HasChildrenIcon';

type TreeData = NodeData[];

function deleteKeyFromArray(key: string, array: string[]) {
  return array.filter((keyFromArray) => keyFromArray !== key);
}

interface TreeProps {
  data: TreeData;
  selectedKeys?: string[];
  expandedKeys?: string[];
  defaultExpandedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelect?: (keys: string[], { node }: { node: NodeData }) => void;
  onExpand?: (keys: string[], { node }: { node: NodeData }) => void;
}

const prefix = 'sedationh';

function Tree({
  data = [],
  selectedKeys: selectedKeysFromProps,
  expandedKeys: expandedKeysFromProps,
  defaultExpandedKeys = [],
  defaultSelectedKeys = [],
  onSelect,
  onExpand,
}: TreeProps) {
  const [selectedKeys, setSelectedKeys] = useState(selectedKeysFromProps || defaultSelectedKeys);
  const [expandedKeys, setExpandedKeys] = useState(expandedKeysFromProps || defaultExpandedKeys);

  useEffect(() => {
    // 处理 selectedKeysFromProps 的 变化
    // 也要防止第一次变为 undefined
    selectedKeysFromProps && setSelectedKeys(selectedKeysFromProps);
  }, [selectedKeysFromProps]);

  useEffect(() => {
    // 处理 expandedKeysFromProps 的 变化
    // 也要防止第一次变为 undefined
    expandedKeysFromProps && setExpandedKeys(expandedKeysFromProps);
  }, [expandedKeysFromProps]);

  const onTreeSelect: (
    key: string,
    {
      selected,
      node,
    }: {
      selected: boolean;
      node: NodeData;
    },
  ) => void = (key, { selected, node }) => {
    const keys = selected ? selectedKeys.concat(key) : deleteKeyFromArray(key, selectedKeys);
    onSelect?.(keys, { node });

    // 如果外界没有传入 selectedKeysFromProps 状态需要自己维护
    if (!selectedKeysFromProps) {
      setSelectedKeys(keys);
    }
  };

  const onTreeExpand: (
    key: string,
    {
      expanded,
      node,
    }: {
      expanded: boolean;
      node: NodeData;
    },
  ) => void = (key, { expanded, node }) => {
    const keys = expanded ? expandedKeys.concat(key) : deleteKeyFromArray(key, expandedKeys);
    onExpand?.(keys, { node });

    // 如果外界没有传入 expandedKeysFromProps 状态需要自己维护
    if (!expandedKeysFromProps) {
      setExpandedKeys(keys);
    }
  };

  return (
    <div className={classnames(`${prefix}-tree`)}>
      {data.map((nodeData) => (
        <TreeNode
          key={nodeData.key}
          data={nodeData}
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          onSelect={onTreeSelect}
          onExpand={onTreeExpand}
        />
      ))}
    </div>
  );
}

export interface NodeData {
  key: string;
  title: string;
  children?: NodeData[];
}

interface TreeNodeProps {
  data: NodeData;
  selectedKeys: string[];
  expandedKeys: string[];
  onSelect: (
    key: string,
    {
      selected,
      node,
    }: {
      selected: boolean;
      node: NodeData;
    },
  ) => void;
  onExpand: (key: string, { expanded, node }: { expanded: boolean; node: NodeData }) => void;
}

function TreeNode({ data, selectedKeys, expandedKeys, onSelect, onExpand }: TreeNodeProps) {
  const hasChildren = data.children?.length ? true : false;
  const selected = selectedKeys?.includes(data.key);
  const expanded = expandedKeys?.includes(data.key);

  const onNodeSelect = () => {
    onSelect(data.key, {
      selected: !selected,
      node: data,
    });
  };

  const onNodeExpand = () => {
    onExpand(data.key, {
      expanded: !expanded,
      node: data,
    });
  };

  return (
    <div className={`${prefix}-tree-node`}>
      <div className={`${prefix}-tree-node-content`}>
        {hasChildren ? (
          <div onClick={onNodeExpand} className={`${prefix}-tree-node-content-switcher`}>
            <HasChildrenIcon
              className={classnames(`${prefix}-tree-node-content-switcher-icon`, {
                expanded: expanded,
              })}
            />
          </div>
        ) : (
          <div className={`${prefix}-tree-node-content-switcher-placeholder`}></div>
        )}
        <div
          className={classnames(`${prefix}-tree-node-content-title`, {
            selected: selected,
          })}
          onClick={onNodeSelect}
        >
          {data.title}
        </div>
      </div>
      <div
        className={classnames(`${prefix}-tree-node-children-wrapper`, {
          expanded: expanded,
        })}
      >
        <div className={`${prefix}-tree-node-children`}>
          {data.children?.map((nodeData) => (
            <TreeNode
              data={nodeData}
              key={nodeData.key}
              selectedKeys={selectedKeys}
              expandedKeys={expandedKeys}
              onSelect={onSelect}
              onExpand={onExpand}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tree;
export { TreeData };
