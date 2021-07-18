import { makeHtmlAttributes } from '@rollup/plugin-html'

export const generateHTML = ({ attributes, files, meta, publicPath }) => {
  const scripts = (files.js || [])
      .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.script);
      return `<script src="${publicPath}${fileName}"${attrs}></script>`;
  })
      .join('\n');
  const links = (files.css || [])
      .map(({ fileName }) => {
      const attrs = makeHtmlAttributes(attributes.link);
      return `<link href="${publicPath}${fileName}" rel="stylesheet"${attrs}>`;
  })
      .join('\n');
  const metas = meta
      .map((input) => {
      const attrs = makeHtmlAttributes(input);
      return `<meta${attrs}>`;
  })
      .join('\n');
  return `<!doctype html>
<html${makeHtmlAttributes(attributes.html)}>
  <head>
    ${metas}
    <title>Evolutionary games</title>
    ${links}
    ${scripts}
  </head>

  <body>
    <div id="app"></div>
  </body>
</html>`;
};
