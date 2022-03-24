import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeData } from '@sedationh/react-tree';
import { iterateNestedTokenDOMs, NestedTokenDOM } from './preprocess';
import './style.less';
import '../../../assets/style.css';

export function getKeyArray(key) {
  const arr = key.split('-');
  const len = arr.length;
  const keyArray = [];
  for (let end = 1; end <= len; end++) {
    keyArray.push(arr.slice(0, end).join('-'));
  }

  return keyArray;
}

function TOCDisplayComponent({
  treeData,
  DOM2keyMap,
}: {
  treeData: TreeData;
  DOM2keyMap: Map<Element, string>;
}) {
  const handleSelect = (
    keys,
    {
      node,
    }: {
      node: NestedTokenDOM;
    },
  ) => {
    node.dom.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    setSelectedKeys(keys);
  };

  const handleExpand = (keys, { node }) => {
    setExpandedKeys(keys);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = DOM2keyMap.get(entry.target);

          setSelectedKeys(getKeyArray(key));
          setExpandedKeys(getKeyArray(key));
        }),
      {
        rootMargin: '0px 0px -85% 0px',
      },
    );
    // TODO: 处理类型问题
    iterateNestedTokenDOMs(treeData, (nestedTokenDOM) => {
      observer.observe(nestedTokenDOM.dom);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  return (
    <div>
      <Tree
        expandedKeys={expandedKeys}
        selectedKeys={selectedKeys}
        data={treeData}
        onSelect={handleSelect}
        onExpand={handleExpand}
      />
    </div>
  );
}

export default TOCDisplayComponent;

let $root: HTMLElement;
const ROOT_ID = 'awesome-toc-root';
// const CSS_ID = "awesome-toc-css"

function initTOCDisplayComponent(treeData, DOM2keyMap) {
  $root = document.createElement('div');
  $root.id = ROOT_ID;
  document.body.append($root);

  ReactDOM.render(<TOCDisplayComponent DOM2keyMap={DOM2keyMap} treeData={treeData} />, $root);
}

export { initTOCDisplayComponent };
