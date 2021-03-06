import React, { useState } from 'react';
import Tree, { TreeData } from '@sedationh/react-tree';
import '../../src/assets/style.less';

const treeData: TreeData = [
  {
    key: '0',
    title: '0',
    children: [
      {
        key: '0-0',
        title: '0-0',
      },
      {
        key: '0-1',
        title: '0-1',
        children: [
          {
            key: '0-1-0',
            title: '0-1-0',
          },
        ],
      },
      {
        key: '0-2',
        title: '0-2',
      },
    ],
  },
  {
    key: '1',
    title: '1',
    children: [
      {
        key: '1-0',
        title: '1-0',
      },
    ],
  },
];

const Index = () => {
  const [selectedKeysInput, setSelectedKeysInput] = useState('0 1');
  const [expandedKeysInput, setExpandedKeysInput] = useState('0 0-1');
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);

  const onSelect = (keys, { node }) => {
    setSelectedKeys(keys);
  };

  const onExpand = (keys, { node }) => {
    setExpandedKeys(keys);
  };

  return (
    <div>
      Tree Component
      <hr />
      <h1>输入要默认被选中的key</h1>
      <input
        value={selectedKeysInput}
        onChange={(e) => setSelectedKeysInput(e.target.value)}
        type="text"
      />
      <h1>输入要默认被展开的key</h1>
      <input
        value={expandedKeysInput}
        onChange={(e) => {
          setExpandedKeysInput(e.target.value);
        }}
        type="text"
      />
      <Tree
        defaultExpandedKeys={expandedKeysInput.split(' ')}
        defaultSelectedKeys={selectedKeysInput.split(' ')}
        data={treeData}
        onSelect={onSelect}
        // selectedKeys={selectedKeys}
        onExpand={onExpand}
        // expandedKeys={expandedKeys}
      />
    </div>
  );
};

export default Index;
