import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class TypographySection extends React.Component {

    render () {
var codeExample__javascript = `function $initHighlight(block, flags) {
  try {
    if (block.className.search(/\bno\-highlight\b/) != -1)
      return processBlock(block.function, true, 0x0F) + ' class=""';
  } catch (e) {
    /* handle exception */
    var e4x =
        <div>Example
            <p>1234</p></div>;
  }
  for (var i = 0 / 2; i < classes.length; i++) { // "0 / 2" should not be parsed as regexp
    if (checkCondition(classes[i]) === undefined)
      return /\d+[\s/]/g;
  }
  console.log(Array.every(classes, Boolean));
}`;
var codeExample__css = `
@import url('print.css');
@page:right {
 margin: 1cm 2cm 1.3cm 4cm;
}

@font-face {
  font-family: Chunkfive; src: url('Chunkfive.otf');
}

div.text,
#content,
li[lang=ru] {
  font: Tahoma, Chunkfive, sans-serif;
  background: url('hatch.png') /* wtf? */;  color: #F0F0F0 !important;
  width: 100%;
}`;
var codeExample__cpp = `#include <iostream>
#define IABS(x) ((x) < 0 ? -(x) : (x))

int main(int argc, char *argv[]) {

  /* An annoying "Hello World" example */
  for (auto i = 0; i < 0xFFFF; i++)
    cout << "Hello, World!" << endl;

  char c = '\n';
  unordered_map <string, vector<string> > m;
  m["key"] = "\\\\"; // this is an error

  return -2e3 + 12l;
}`;
var codeExample__python = `@requires_authorization
def somefunc(param1='', param2=0):
    r'''A docstring'''
    if param1 > param2: # interesting
        print 'Gre\'ater'
    return (param2 - param1 + 1 + 0b10l) or None

class SomeClass:
    pass

>>> message = '''interpreter
... prompt'''`;

        return(
            <Pod.section key={'typography'}>
                <Pod.contentWrap>

                    <Pod.heading>Typography</Pod.heading>

                    <Pod.heading kind="h4">Paragraph</Pod.heading>
                    <Pod.paragraph>
                        This is a paragraph. This is a paragraph. This is a paragraph.
                        This is a paragraph. This is a paragraph. This is a paragraph.
                        This is a paragraph. This is a paragraph. This is a paragraph.
                        This is a paragraph. This is a paragraph. This is a paragraph.
                        This is a paragraph. This is a paragraph. This is a paragraph.
                        This is a paragraph. This is a paragraph.
                                Text <Code>Inline code</Code> text
                    </Pod.paragraph>

                    <Pod.heading kind="h4">Code</Pod.heading>

                    <Pod.codeBlock language="javascript">{codeExample__javascript}</Pod.codeBlock>
                    <Pod.codeBlock>{codeExample__css}</Pod.codeBlock>
                    <Pod.codeBlock>{codeExample__cpp}</Pod.codeBlock>
                    <Pod.codeBlock>{codeExample__python}</Pod.codeBlock>

                    <Pod.heading kind="h4">Horizontal Rule</Pod.heading>
                    <Pod.hr height="1" />

                    <Pod.heading kind="h4">Headings</Pod.heading>

                    <Pod.heading kind="h1">Headings 1</Pod.heading>
                    <Pod.paragraph>Testing line heights for headings</Pod.paragraph>

                    <Pod.heading kind="h2">Headings 2</Pod.heading>
                    <Pod.paragraph>Testing line heights for headings</Pod.paragraph>

                    <Pod.heading kind="h3">Headings 3</Pod.heading>
                    <Pod.paragraph>Testing line heights for headings</Pod.paragraph>

                    <Pod.heading kind="h4">Headings 4</Pod.heading>
                    <Pod.paragraph>Testing line heights for headings</Pod.paragraph>

                    <Pod.heading kind="h5">Headings 5</Pod.heading>
                    <Pod.paragraph>Testing line heights for headings</Pod.paragraph>

                    <Pod.heading kind="h6">Headings 6</Pod.heading>
                    <Pod.paragraph>Testing line heights for headings</Pod.paragraph>

                </Pod.contentWrap>
            </Pod.section>
        )
    }

}