import React, { useEffect, useState } from "react"
import classnames from "classnames"
import "./style.less"
import { log } from "./debug"
type TreeData = NodeData[]

function deleteKeyFromArray(key: string, array: string[]) {
  return array.filter((keyFromArray) => keyFromArray !== key)
}

interface TreeProps {
  data: TreeData
  selectedKeys?: string[]
  expandedKeys?: string[]
  defaultExpandedKeys?: string[]
  defaultSelectedKeys?: string[]
  onSelect?: (keys: string[], { node: NodeData }) => void
}

function Tree({
  data = [],
  selectedKeys: selectedKeysFromProps,
  expandedKeys: expandedKeysFromProps,
  defaultExpandedKeys = [],
  defaultSelectedKeys = [],
  onSelect,
}: TreeProps) {
  const [selectedKeys, setSelectedKeys] = useState(
    selectedKeysFromProps || defaultSelectedKeys
  )
  const [expandedKeys, setExpandedKeys] = useState(
    expandedKeysFromProps || defaultExpandedKeys
  )

  useEffect(() => {
    // 处理 selectedKeysFromProps 的 变化
    // 也要防止第一次变为 undefined
    selectedKeysFromProps && setSelectedKeys(selectedKeysFromProps)
    log("selectedKeysFromProps useEffect", {
      expandedKeysFromProps,
      selectedKeys,
    })
  }, [selectedKeysFromProps])

  const onTreeSelect: (
    key: string,
    { selected: bool, node: NodeData }
  ) => void = (key, { selected, node }) => {
    const keys = selected
      ? selectedKeys.concat(key)
      : deleteKeyFromArray(key, selectedKeys)
    onSelect?.(keys, { node })

    // 如果外界没有传入 selectedKeysFromProps 状态需要自己维护
    if (!selectedKeysFromProps) {
      setSelectedKeys(keys)
    }
  }

  return (
    <div className="tree">
      {data.map((nodeData) => (
        <TreeNode
          key={nodeData.key}
          data={nodeData}
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
          onSelect={onTreeSelect}
        />
      ))}
    </div>
  )
}

export interface NodeData {
  key: string
  title: string
  children?: NodeData[]
}

interface TreeNodeProps {
  data: NodeData
  selectedKeys: string[]
  expandedKeys: string[]
  onSelect?: (key: string, { selected: bool, node: NodeData }) => void
}

function TreeNode({
  data,
  selectedKeys,
  expandedKeys,
  onSelect,
}: TreeNodeProps) {
  const hasChildren = data.children?.length ? true : false
  const selected = selectedKeys?.includes(data.key)
  const expanded = expandedKeys?.includes(data.key)

  const onNodeSelect = () => {
    onSelect?.(data.key, {
      selected: !selected,
      node: data,
    })
  }

  const onNodeExpand = () => {}

  return (
    <div className="tree-node">
      <div className="content">
        {hasChildren && (
          <div onClick={onNodeExpand} className="switcher">
            {expanded ? "-" : "+"}
          </div>
        )}
        <div
          onClick={onNodeSelect}
          className={classnames("title", {
            active: selected,
          })}
        >
          {data.title}
        </div>
      </div>
      {hasChildren &&
        expanded &&
        data.children.map((nodeData) => (
          <TreeNode
            data={nodeData}
            key={nodeData.key}
            selectedKeys={selectedKeys}
            expandedKeys={expandedKeys}
            onSelect={onSelect}
          />
        ))}
    </div>
  )
}

export default Tree
export { TreeData }
