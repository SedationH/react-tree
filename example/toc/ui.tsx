import React from "react"
import ReactDOM from "react-dom"
import Tree from "../../src/Tree"
import "./style.less"

function TOCDisplayComponent({ treeData }) {
  console.log(treeData)
  return (
    <div>
      <Tree data={treeData} />
    </div>
  )
}

export default TOCDisplayComponent

let $root: HTMLElement
const ROOT_ID = "awesome-toc-root"
// const CSS_ID = "awesome-toc-css"

function initTOCDisplayComponent(treeData) {
  $root = document.createElement("div")
  $root.id = ROOT_ID
  document.body.append($root)

  ReactDOM.render(<TOCDisplayComponent treeData={treeData} />, $root)
}

export { initTOCDisplayComponent }
