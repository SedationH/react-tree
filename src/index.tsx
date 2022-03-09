import React from "react"
import ReactDOM from "react-dom"
import Tree, { TreeData } from "./Tree"

const treeData: TreeData = [
  {
    key: "0",
    title: "0",
    children: [
      {
        key: "0-0",
        title: "0-0",
      },
      {
        key: "0-1",
        title: "0-1",
        children: [
          {
            key: "0-1-0",
            title: "0-1-0",
          },
        ],
      },
      {
        key: "0-2",
        title: "0-2",
      },
    ],
  },
  {
    key: "1",
    title: "1",
  },
]

const Index = () => {
  return (
    <div>
      Tree Component
      <Tree data={treeData} />
    </div>
  )
}

ReactDOM.render(<Index />, document.querySelector("#app"))
