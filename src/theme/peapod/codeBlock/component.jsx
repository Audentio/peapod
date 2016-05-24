/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { PropTypes, Component } from 'react';
import Pod_Styler from 'utility/styler.js';
import Pod_Helper from 'utility/helper.js';
import Highlightjs from 'highlight.js/lib/highlight.js';
import PureRender from 'utility/pureRender.js';

const DefaultLanguages = ['cpp', 'cs', 'css', 'json', 'java', 'javascript', 'nginx', 'objectivec', 'perl', 'php', 'python', 'ruby', 'xml'];

// import default languages
DefaultLanguages.forEach((lang) => {
    Highlightjs.registerLanguage(lang, require('highlight.js/lib/languages/'+lang)); // eslint-disable-line
});

/**
* Code block component
*
* @element CodeBlock
*
* @param {boolean} [highlight=true] - Enable syntax highlighting
* @param {string} [language] - Manually specify language (auto-detected by default)
* @param {string} [theme=github-gist] - theme
*/
module.exports = class CodeBlock extends Component {

    static propTypes = {
        highlight: PropTypes.bool,
        language: PropTypes.string,
        children: PropTypes.string,
        theme: PropTypes.string,
        label: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.bool,
        ]),
    }

    static defaultProps = {
        highlight: true,
        theme: 'github-gist',
    }

    render() {
        const style = Pod_Styler.getStyle(this);
        const { label, children: code } = this.props;

        return (
            <pre style={style.main}>
                {label &&
                    <div ref="label" style={style.label}>{label}</div>
                }
                <code ref="codeContainer" style={style.code}>{code}</code>
            </pre>
        );
    }

    componentWillMount() {
        const { theme } = this.props;

        // Load theme stylesheet
        Pod_Helper.addStylesheet(`hljs_theme_${theme}`, `//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/${theme}.min.css`);
    }

    componentDidMount() {
        this.highlightCode();
    }

    shouldComponentUpdate = PureRender

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        if (!this.props.highlight) return; // highlighting is disabled - Halt.

        const { language, label } = this.props;
        const { codeContainer: container, label: labelContainer } = this.refs;
        const registeredLanguages = Highlightjs.listLanguages();

        const highlightBlock = (lang) => {
            // Add passed language as className for highlightBlock()
            // http://highlightjs.readthedocs.io/en/latest/api.html#highlightblock-block
            container.className += ` hljs ${lang}`;

            // Run highlighter
            Highlightjs.highlightBlock(container);
        };

        // Load language from CDN
        // when it is explicity defined and missing
        if (language &&                                                 // Language is passed
            registeredLanguages.indexOf(language) === -1                // Not in library already
        ) {
            Pod_Helper.addScript({
                id: `hljs-lang-${language}`,
                url: `//cdn.jsdelivr.net/highlight.js/9.2.0/languages/${language}.min.js`,
                ajax: true,
                callback: (response) => {
                    if (response.status !== 200) return; // unsuccessful
                    // Highlight code block on success
                    highlightBlock(language);
                },
            });
        }

        // Add label
        if (label && language) {
            // Use passed language as label
            labelContainer.innerText = language;
        } else if (typeof label === 'string') {
            // Use custom label
            labelContainer.innerText = label;
        } else if (label) {
            // Guess language
            // confined to default languages defined above (top of this file)
            const bestGuess = Highlightjs.highlightAuto(container.innerText, registeredLanguages).language;
            labelContainer.innerText = bestGuess;
        }

        // Highlight code block;
        highlightBlock(language);
    }
};
