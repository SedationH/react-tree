import { NodeData, TreeData } from "../../src/Tree"
import {
  buildNestedTokenDOMs,
  iterateNestedTokenDOMs,
  NestedTokenDOM,
} from "./preprocess"
import { initTOCDisplayComponent } from "./ui"

class TOC {
  options: any
  tokenDOMs: HTMLElement[]

  constructor(tokenDOMs: HTMLElement[], options: any) {
    this.tokenDOMs = tokenDOMs
    this.options = options

    const nestedTokenDOMs = buildNestedTokenDOMs(tokenDOMs)
    const treeData = this.adaptTreeDataFromNestedTokenDOMs(nestedTokenDOMs)
    initTOCDisplayComponent(treeData)
  }

  adaptTreeDataFromNestedTokenDOMs(
    nestedTokenDOMs: NestedTokenDOM[]
  ): TreeData {
    return iterateNestedTokenDOMs<NodeData>(
      nestedTokenDOMs,
      (nestedTokenDOMs) => {
        nestedTokenDOMs.title = nestedTokenDOMs.dom.textContent
      }
    )
  }

  remove() {}
  show() {}
  hide() {}
}

const createTOC = (tokenDOMs: HTMLElement[], options: any) => {
  return new TOC(tokenDOMs, options)
}

export { TOC, createTOC }
