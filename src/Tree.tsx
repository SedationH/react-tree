import React, { useState } from "react"
import classnames from "classnames"
type TreeData = NodeData[]

interface TreeProps {
  data: TreeData
  selectedKeys?: string[]
  expandedKeys?: string[]
  defaultExpandedKeys?: string[]
  defaultSelectedKeys?: string[]
}

function Tree({
  data = [],
  selectedKeys,
  expandedKeys,
  defaultExpandedKeys = [],
  defaultSelectedKeys = [],
}: TreeProps) {
  selectedKeys = [...defaultSelectedKeys]
  expandedKeys = [...defaultExpandedKeys]

  return (
    <div className="tree">
      {data.map((nodeData) => (
        <TreeNode
          key={nodeData.key}
          data={nodeData}
          selectedKeys={selectedKeys}
          expandedKeys={expandedKeys}
        />
      ))}
    </div>
  )
}

interface NodeData {
  key: string
  title: string
  children?: NodeData[]
}

interface TreeNodeProps {
  data: NodeData
  selectedKeys: string[]
  expandedKeys: string[]
}

function TreeNode({ data, selectedKeys, expandedKeys }: TreeNodeProps) {
  const hasChildren = data.children?.length ? true : false
  const [expanded, setExpanded] = useState(expandedKeys?.includes(data.key))
  const [selected, setSelected] = useState(selectedKeys?.includes(data.key))

  const onExpand = () => {
    setExpanded(!expanded)
  }

  const onSelect = () => {
    setSelected(!selected)
  }

  return (
    <div className="tree-node">
      <div className="content">
        {hasChildren && (
          <div onClick={onExpand} className="switcher">
            {expanded ? "-" : "+"}
          </div>
        )}
        <div
          onClick={onSelect}
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
          />
        ))}
    </div>
  )
}

export default Tree
export { TreeData }
