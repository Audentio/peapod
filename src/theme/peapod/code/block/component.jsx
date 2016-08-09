/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React, { PropTypes } from 'react';
import Styler from 'utility/styler.js';
import Pod_Helper from 'utility/helper.js';
// import Highlightjs from 'highlight.js/lib/highlight.js';
import PureRender from 'utility/pureRender.js';

// const DefaultLanguages = ['cpp', 'cs', 'css', 'json', 'java', 'javascript', 'nginx', 'objectivec', 'perl', 'php', 'python', 'ruby', 'xml'];

// import default languages
// DefaultLanguages.forEach((lang) => {
//     Highlightjs.registerLanguage(lang, require('highlight.js/lib/languages/'+lang)); // eslint-disable-line
// });

/**
* Code block component
*
* @element CodeBlock
*
* @param {boolean} [highlight=true] - Enable syntax highlighting
* @param {string} [language] - Manually specify language (auto-detected by default)
* @param {string} [theme=github-gist] - theme
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

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
        const classes = Styler.getClassStyle(this);
        const { label, children: code } = this.props;

        return (
            <pre className={classes.main}>
                {label && <div ref="label" className={classes.label}>{label}</div>}
                <code ref="codeContainer" className={classes.code}>{code}</code>
            </pre>
        );
    }

    componentDidMount() {
        const { theme } = this.props;
        const { highlightCode } = this;

        // HLJS
        Pod_Helper.addScript({
            id: 'hljs_core',
            url: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.5.0/highlight.min.js',
            callback: (script, status) => {
                if (status === 200) highlightCode();
            },
        });

        // theme stylesheet
        Pod_Helper.addStylesheet(`hljs_theme_${theme}`, `//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/${theme}.min.css`);
    }

    shouldComponentUpdate = PureRender

    componentDidUpdate() {
        this.highlightCode();
    }

    highlightCode() {
        if (!this.props.highlight) return; // highlighting is disabled - Halt.

        const { Highlightjs } = window;

        const { language, label } = this.props;
        const { codeContainer: container, label: labelContainer } = this.refs;

        const highlightBlock = (lang) => {
            // Add passed language as className for highlightBlock()
            // http://highlightjs.readthedocs.io/en/latest/api.html#highlightblock-block
            container.className += ` hljs ${lang}`;

            // Run highlighter
            Highlightjs.highlightBlock(container);
        };

        // Load language from CDN
        // when it is explicity defined
        if (language) {
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
            const bestGuess = Highlightjs.highlightAuto(container.innerText, Highlightjs.listLanguages()).language;
            labelContainer.innerText = bestGuess;
        }

        // Highlight code block;
        highlightBlock(language);
    }
};
