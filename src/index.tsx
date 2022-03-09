import React, { useState } from "react"
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
  const [keysInput, setKeysInput] = useState("0 0-1-0 0-2")
  return (
    <div>
      Tree Component
      <hr />
      <h1>输入要被选中的key</h1>
      <input
        value={keysInput}
        onChange={(e) => setKeysInput(e.target.value)}
        type="text"
      />
      <Tree selectedKeys={keysInput.split(" ")} data={treeData} />
    </div>
  )
}

ReactDOM.render(<Index />, document.querySelector("#app"))
