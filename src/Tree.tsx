import React, { useEffect, useState } from "react"
import classnames from "classnames"
import { log } from "./debug"
import HasChildrenIcon from "./HasChildrenIcon"
import style from "./style.module.less"

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
  onExpand?: (keys: string[], { node: NodeData }) => void
}

function Tree({
  data = [],
  selectedKeys: selectedKeysFromProps,
  expandedKeys: expandedKeysFromProps,
  defaultExpandedKeys = [],
  defaultSelectedKeys = [],
  onSelect,
  onExpand,
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

  useEffect(() => {
    // 处理 expandedKeysFromProps 的 变化
    // 也要防止第一次变为 undefined
    expandedKeysFromProps && setExpandedKeys(expandedKeysFromProps)
    log("expandedKeysFromProps useEffect", {
      expandedKeysFromProps,
      expandedKeys,
    })
  }, [expandedKeysFromProps])

  const onTreeSelect: (
    key: string,
    { selected: bool, node: NodeData }
  ) => void = (key, { selected, node }) => {
    const keys = selected
      ? selectedKeys.concat(key)
      : deleteKeyFromArray(key, selectedKeys)
    onSelect?.(keys, { node })

    log("onTreeSelect", keys)

    // 如果外界没有传入 selectedKeysFromProps 状态需要自己维护
    if (!selectedKeysFromProps) {
      setSelectedKeys(keys)
    }
  }

  const onTreeExpand: (
    key: string,
    { expanded: bool, node: NodeData }
  ) => void = (key, { expanded, node }) => {
    const keys = expanded
      ? expandedKeys.concat(key)
      : deleteKeyFromArray(key, expandedKeys)
    onExpand?.(keys, { node })

    log("onTreeExpand", keys)

    // 如果外界没有传入 expandedKeysFromProps 状态需要自己维护
    if (!expandedKeysFromProps) {
      setExpandedKeys(keys)
    }
  }

  log("Tree render", { selectedKeys, expandedKeys })

  return (
    <div className={style.tree}>
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
  onSelect: (key: string, { selected: bool, node: NodeData }) => void
  onExpand: (key: string, { expanded: bool, node: NodeData }) => void
}

function TreeNode({
  data,
  selectedKeys,
  expandedKeys,
  onSelect,
  onExpand,
}: TreeNodeProps) {
  const hasChildren = data.children?.length ? true : false
  const selected = selectedKeys?.includes(data.key)
  const expanded = expandedKeys?.includes(data.key)

  const onNodeSelect = () => {
    log("onNodeSelect", { selected: !expanded, data, key: data.key })
    onSelect(data.key, {
      selected: !selected,
      node: data,
    })
  }

  const onNodeExpand = () => {
    log("onNodeExpand", { expanded: !expanded, data, key: data.key })
    onExpand(data.key, {
      expanded: !expanded,
      node: data,
    })
  }

  return (
    <div className={style["tree-node"]}>
      <div className={style["content"]}>
        {hasChildren ? (
          <div onClick={onNodeExpand} className={style["switcher"]}>
            <HasChildrenIcon
              className={classnames(style["switcher-icon"], {
                [style["expanded"]]: expanded,
              })}
            />
          </div>
        ) : (
          <div className={style["switcher-placeholder"]}></div>
        )}
        <div
          className={classnames(style["title-wrapper"], {
            [style["selected"]]: selected,
          })}
          onClick={onNodeSelect}
        >
          <span className={style["title"]}>{data.title}</span>
        </div>
      </div>
      <div
        className={classnames(style["children-wrapper"], {
          [style["expanded"]]: expanded,
        })}
      >
        {data.children.map((nodeData) => (
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
  )
}

export default Tree
export { TreeData }
