const markdownIt = require('markdown-it');
const markdownItContainer = require('markdown-it-container');

function renderContainer(type) {
  return function (tokens, idx, _options, env, self) {
    const content = tokens[idx].info.trim();
    if (tokens[idx].nesting === 1) {
      return '' +
`<ac:structured-macro ac:macro-id="00000000-0000-0000-0000-000000000000" ac:name="${type}" ac:schema-version="1">
  <ac:rich-text-body>
    ${markdown.utils.escapeHtml(content[1])}`;
    } else {
      return '' +
`
  </ac:rich-text-body>
</ac:structured-macro>
`;
    }
  };
}

function renderFence(tokens, idx, _options, env, self) {
  const token = tokens[idx];
  const src = token.content.trim();
  const parameters = [];

  const lang = token.info.replace(/=$|=\d+$|=\+$|!$|=!$/, '').trim();
  if (lang) {
    parameters.push(`<ac:parameter ac:name= "language">${lang}</ac:parameter>`);
  }
  const hasLinenumbers = /=$|=\d+$|=\+$/.test(token.info);
  if (hasLinenumbers) {
    parameters.push('<ac:parameter ac:name = "linenumbers">true</ac:parameter>');
  }

  return '' +
`<ac:structured-macro ac:macro-id="00000000-0000-0000-0000-000000000000" ac:name="code" ac:schema-version="1">
  ${parameters.join('\n  ')}
  <ac:plain-text-body><![CDATA[${src}]]></ac:plain-text-body>
</ac:structured-macro>
`;
}

var markdown = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  })
  .use(markdownItContainer, 'success', {
    render: renderContainer('tip')
  })
  .use(markdownItContainer, 'info', {
    render: renderContainer('info')
  })
  .use(markdownItContainer, 'warning', {
    render: renderContainer('note')
  })
  .use(markdownItContainer, 'danger', {
    render: renderContainer('warning')
  })
  .use(require('markdown-it-abbr'))
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-deflist'))
  .use(require('markdown-it-mark'))
  .use(require('markdown-it-ins'))
  .use(require('markdown-it-sub'))
  .use(require('markdown-it-sup'))
  .use(require('markdown-it-task-lists'))
  .use(require('markdown-it-emoji'))
  ;

markdown.renderer.rules.fence = renderFence;

exports.convert = (src) => {
  return markdown.render(src);
}
