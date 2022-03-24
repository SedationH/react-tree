import React from 'react';
import { extractArticle, extractTokenDOMs } from './preprocess';
import { createTOC, TOC } from './toc';

let toc: TOC;

const start = () => {
  const article = extractArticle();
  const tokenDOMs = extractTokenDOMs(article);
  console.log('sedationh', { article, tokenDOMs });
  if (!tokenDOMs?.length) {
    console.log('there is no article / headings');
    return;
  }
  if (toc) {
    toc.remove();
  }
  toc = createTOC(tokenDOMs, {});
  toc.show();
};

setTimeout(() => {
  start();
}, 1000);

export default () => (
  <>
    <article>
      <h1>h1 0 longlonglonglonglonglonglonglonglonglonglong</h1>
      <h2>h2 0-0</h2>
      <h3>h3 0-0-0</h3>
      <h3>h3 0-0-1</h3>
      <h2>h2 0-1</h2>
      <h2>h2 0-2</h2>
      <h1>h1 1</h1>
      <h1>h1 2</h1>
    </article>
  </>
);
