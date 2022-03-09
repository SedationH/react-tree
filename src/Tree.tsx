import React from "react"

type TreeData = NodeData[]

interface TreeProps {
  data: TreeData
}

function Tree({ data = [] }: TreeProps) {
  return (
    <div>
      {data.map((nodeData) => (
        <TreeNode key={nodeData.key} data={nodeData} />
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
}

function TreeNode({ data }: TreeNodeProps) {
  const hasChildren = data.children?.length ? true : false
  return (
    <div>
      <span>{data.title}</span>

      {hasChildren && <Tree data={data.children} />}
    </div>
  )
}

export default Tree
export { TreeData }
