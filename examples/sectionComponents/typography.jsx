import React from 'react'
import Pod from 'components.js'
import Pod_Helper from 'helper.js'

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
            <Pod.Section key={'typography'}>
                <Pod.ContentWrap>

                    <Pod.Heading>Typography</Pod.Heading>

                    <Pod.Heading kind="h4">Paragraph</Pod.Heading>
                    <Pod.Paragraph>
                        This is a Paragraph. This is a Paragraph. This is a Paragraph.
                        This is a Paragraph. This is a Paragraph. This is a Paragraph.
                        This is a Paragraph. This is a Paragraph. This is a Paragraph.
                        This is a Paragraph. This is a Paragraph. This is a Paragraph.
                        This is a Paragraph. This is a Paragraph. This is a Paragraph.
                        This is a Paragraph. This is a Paragraph.
                                Text <Pod.Code>Inline code</Pod.Code> text
                    </Pod.Paragraph>

                    <Pod.Heading kind="h4">Code</Pod.Heading>

                    <Pod.CodeBlock language="javascript">{codeExample__javascript}</Pod.CodeBlock>
                    <Pod.CodeBlock>{codeExample__css}</Pod.CodeBlock>
                    <Pod.CodeBlock>{codeExample__cpp}</Pod.CodeBlock>
                    <Pod.CodeBlock>{codeExample__python}</Pod.CodeBlock>

                    <Pod.Heading kind="h4">Horizontal Rule</Pod.Heading>
                    <Pod.Hr height="1" />

                    <Pod.Heading kind="h4">Headings</Pod.Heading>

                    <Pod.Heading kind="h1">Headings 1</Pod.Heading>
                    <Pod.Paragraph>Testing line heights for Headings</Pod.Paragraph>

                    <Pod.Heading kind="h2">Headings 2</Pod.Heading>
                    <Pod.Paragraph>Testing line heights for Headings</Pod.Paragraph>

                    <Pod.Heading kind="h3">Headings 3</Pod.Heading>
                    <Pod.Paragraph>Testing line heights for Headings</Pod.Paragraph>

                    <Pod.Heading kind="h4">Headings 4</Pod.Heading>
                    <Pod.Paragraph>Testing line heights for Headings</Pod.Paragraph>

                    <Pod.Heading kind="h5">Headings 5</Pod.Heading>
                    <Pod.Paragraph>Testing line heights for Headings</Pod.Paragraph>

                    <Pod.Heading kind="h6">Headings 6</Pod.Heading>
                    <Pod.Paragraph>Testing line heights for Headings</Pod.Paragraph>

                </Pod.ContentWrap>
            </Pod.Section>
        )
    }

}
