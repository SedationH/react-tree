import React from "react"

type TreeData = NodeData[]

interface TreeProps {
  data: TreeData
  selectedKeys?: string[]
}

function Tree({ data = [], selectedKeys }: TreeProps) {
  return (
    <div className="tree">
      {data.map((nodeData) => (
        <TreeNode
          selectedKeys={selectedKeys}
          key={nodeData.key}
          data={nodeData}
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
}

function TreeNode({ data, selectedKeys }: TreeNodeProps) {
  const hasChildren = data.children?.length ? true : false
  return (
    <div>
      {selectedKeys?.includes(data.key) ? (
        <span style={{ background: "red" }}>{data.title}</span>
      ) : (
        <span>{data.title}</span>
      )}

      {hasChildren && <Tree selectedKeys={selectedKeys} data={data.children} />}
    </div>
  )
}

export default Tree
export { TreeData }
