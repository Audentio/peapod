/* Copyright <%= package.year %>, Audentio, LLC.
* All rights reserved.
*
* LICENSE: <%= package.licence %>
*/

import React from 'react'
import Pod_Styler from '../styler.js'
import Pod_Helper from '../helper.js'
import Wrapper from '../wrapper.jsx'


//@Tushar including Highlightjs seems to be causing "Module parse failed: Maximum call stack size exceeded" -- KC
import Highlightjs from 'highlight.js/lib/highlight.js'

//import languages
['cpp','cs','css','json','java','javascript','nginx','objectivec','perl','php','python','ruby','xml'].forEach(function(lang){
    Highlightjs.registerLanguage(lang, require('highlight.js/lib/languages/'+lang));
})

/**
* Code block component
*
* @element CodeBlock
*
* @param {boolean} [highlight=true] - Enable syntax highlighting
* @param {string} [language] - Manually specify language (auto-selected by default)
*/
var CodeBlock = React.createClass({

    propTypes: {
        highlight: React.PropTypes.bool,
        language: React.PropTypes.string
    },

    getDefaultProps() {
        highlight: true
    },

    highlightCode(){
        var container = this.refs.codeContainer,
            _this = this;

        //Minified language files seem malformed
        //some basic languages loaded Manually (see line 15 this file)

        if(this.props.language) {

            Pod_Helper.addScript({
                id: 'hljs-lang-'+_this.props.language,
                url: '//cdn.jsdelivr.net/highlight.js/9.2.0/languages/'+_this.props.language+'.min.js',
                ajax: true,
                callback: function(response){
                    if(response.status !== 200) return;
                    console.log(hljs.listLanguages())
                    var highlighted = hljs.highlight('js', _this.props.children, true);
                    console.log(highlighted)
                    container.innerHTML = highlighted.value
                    container.setAttribute('data-lang', highlighted.language)
                }
            })
        }
        var highlighted = (this.props.language) ?
            Highlightjs.highlight(this.props.language, this.props.children, true) :
            Highlightjs.highlightAuto(this.props.children);

        container.innerHTML = highlighted.value
        container.setAttribute('data-lang', highlighted.language)
    },

    componentWillMount() {
        if(!window.hljs) window.hljs = Highlightjs;
        Pod_Helper.addStylesheet('HLJS', '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.2.0/styles/github-gist.min.css')
    },

    componentWillUpdate() {
        this.highlightCode()
    },

    componentDidMount(){
        this.highlightCode()
    },

	render() {
        var style = Pod_Styler.getStyle(this)
		return (
            <pre className="prettyprint" style={style.main}>
    			<code ref="codeContainer">{this.props.children}</code>
    		</pre>
		);
	}

});

module.exports = Wrapper(CodeBlock);
