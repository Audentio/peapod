/*! Peapod v<%= package.version %>
*  Copyright Audentio <%= package.year %>
*  LICENSE: <%= package.licence %>
*/

import React from 'react';
import ReactDOM from 'react-dom';

import Styler from 'utility/styler.js';
import { Icon, Lazy } from 'utility/components.js';
import Pod_Helper from 'utility/helper.js';

const options = {
    // this acts as src for lazyLoaded images until they're loaded
    defaultImage: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgMAYAADYANKqWpHYAAAAASUVORK5CYII=',

    // lazy loading
    lazy: false,

    // load image if distance from viewport is smaller than this
    // TODO: Convert to lazy load
    lazyDistance: 500,

    // Multi-dimensional array defining prefixes for different device pixeDensity
    // set false to disable hiDPI loading
    // [['1.5', '@2x']]
    hidpi: false,

    // show enlarged image in lightbox
    lightbox: true,

    // Animate Lightbox entry-exit
    lightboxAnimation: true,
};


/**
* Image component: loads HiDPI images on retina devices
*
* @element Pod_image
* @param {string} src - Image URL ()
* @param {(bool|Object)} [hidpi-data] - object map of pixel densities and prefixes. False to disable hidpi asset loading
* @param {string} [alt] - alt attribute
* @param {string} [caption] - Image caption
* @param {bool} [lazy] - Should the resource load lazily?
* @param {Number} [lazyDistance] - Lazy images will be loaded when within this distance from viewport
* @param {bool} [lightbox] - Enable lightbox on instance
* @param {bool} [lightboxAnimation] - Animated lightbox (ability to turn off for specific high-res images)
*/
module.exports = componentName => class Pod_Component extends React.Component {

    static displayName = componentName;

    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: (this.props.lazy === true),
            lightboxVisible: false,
            fullscreenIcon: (Pod_Helper.fullscreen.isEnabled()) ? 'fullscreen_exit' : 'fullscreen',
        };
    }

    static propTypes = {
        src: React.PropTypes.string.isRequired,
        hidpiData: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.bool]),
        alt: React.PropTypes.string,
        caption: React.PropTypes.string,
        lazy: React.PropTypes.bool,
        lazyDistance: React.PropTypes.number,
        lightbox: React.PropTypes.bool,
        lightboxAnimation: React.PropTypes.bool,
        allowDownload: React.PropTypes.bool,
    }

    static defaultProps = {
        hidpiData: options.hidpi,
        lazy: options.lazy,
        lazyDistance: options.lazyDistance,
        lightbox: options.lightbox,
        styler: options.styler,
        lightboxAnimation: options.lightboxAnimation,
    }

    keyHandler(e) {
        if (e.keyCode === Pod_Helper.keymap.ESC) {
            this.hideLightbox();
        }
    }

    toggleFullscreen() {
        Pod_Helper.fullscreen.toggle();

        if (Pod_Helper.fullscreen.isEnabled()) {
            this.setState({ fullscreenIcon: 'fullscreen_exit' });
        } else {
            this.setState({ fullscreenIcon: 'fullscreen' });
        }
    }

    // show lightbox
    showLightbox() {
        if (!this.props.lightbox) {
            return false;
        }

        this.setState({ lightboxVisible: true });

        // enable scrolling
        //Pod_Helper.scrolling(false);

        // add keyboard listener
        window.addEventListener('keydown', this.keyHandler);

        return true;
    }

    // hide lightbox
    // uses setTimeout to delay hiding lightbox - page scrolls to top without that.
    hideLightbox() {
        /*
        var delay = 0, _this = this;

        if( Pod_Helper.fullscreen.isEnabled() ) {
        delay = 100;
        Pod_Helper.fullscreen.exit()
        }

        setTimeout(function(){
        _this.setState({lightboxVisible: false});

        //enable scrolling
        //document.documentElement.style.overflow = ''
        Pod_Helper.scrolling(true)

        //remove keyboard listener
        window.removeEventListener('keydown', _this.keyHandler)
        }, delay)*/

        if (Pod_Helper.fullscreen.isEnabled()) {
            Pod_Helper.fullscreen.exit();
            this.setState({ fullscreenIcon: 'fullscreen' });
        }

        this.setState({ lightboxVisible: false });

        Pod_Helper.scrolling(true);

        // remove keyboard listener
        window.removeEventListener('keydown', this.keyHandler);
    }

    // Onclick handler
    // decides whether to hide or not
    lightboxOnClick(e) {
        // overlay is clicked
        // hide
        if (e.target.tagName !== 'IMG') {
            this.hideLightbox();
        } else {
            // If image is clicked
            // Open image in browser tab
            const newWindow = window.open(e.target.src, '_blank');
            newWindow.focus();
        }
    }

    // Check if element is within the defined viewport range
    // -- {lazyDistance}px above and below current viewport
    lazyCheck() {
        const bounds = ReactDOM.findDOMNode(this).getBoundingClientRect();
        const scrollTop = window.pageYOffset;
        const top = bounds.top + scrollTop;
        const height = bounds.bottom - bounds.top;

        if (top === 0 || (top <= (scrollTop + window.innerHeight + options.lazyDistance) && (top + height + options.lazyDistance) > scrollTop)) {
            this.setState({ visible: true });
            this.removeListener(); // stop listening, the show is over
        }
    }

    removeListener() {
        window.removeEventListener('scroll', this.lazyCheck);
        window.removeEventListener('resize', this.lazyCheck);
    }

    componentDidMount() {
        // initial check
        this.lazyCheck();

        // start listening for viewport events
        if (this.props.lazy) {
            window.addEventListener('scroll', this.lazyCheck);
        }
    }

    // re-check on update
    componentDidUpdate() {
        if (!this.state.visible) {
            this.lazyCheck();
        }
    }

    // stop listening if component is about to unmount
    componentWillUnmount() {
        this.removeListener();
    }

    componentWillMount() {
        const hiDpiData = this.props.hidpiData;

        if (hiDpiData) { // hiDPI resource is available
            // break down the url
            const url = this.props.src.split('.');
            const extension = url.splice(-1, 1);
            const filePath = url.join('.');
            let suffix = '';

            // loop through hidpi array. Overrides are sequential
            hiDpiData.forEach((item) => {
                // grab suffix from last apporpiate array
                suffix = (window.devicePixelRatio >= Number(item[0])) ? item[1] : suffix;
            });

            // Suffixed URL
            this.imageURL = filePath + suffix + '.' + extension;
        } else { // hiDPI is disabled. Load normal resource
            this.imageURL = this.props.src;
        }
    }

    downloadFile() {
        Pod_Helper.downloadFile(this.imageURL);
    }

    openInNew() {
        if (Pod_Helper.fullscreen.isEnabled()) {
            Pod_Helper.fullscreen.exit();
            this.setState({ fullscreenIcon: 'fullscreen' });
        }
        const newTab = window.open(this.imageURL, '_blank');
        newTab.focus();
    }

    render() {
        const classes = Styler.getClasses(this);
        const showLightbox = this.showLightbox.bind(this);
        const hideLightbox = this.hideLightbox.bind(this);
        const toggleFullscreen = this.toggleFullscreen.bind(this);
        const downloadFile = this.downloadFile.bind(this);
        const openInNew = this.openInNew.bind(this);

        return (
            <div className={classes.main}>
                <Lazy>
                    <img
                        onClick={showLightbox}
                        src={this.imageURL}
                        alt={this.props.alt}
                        className={classes.image}
                    />
                </Lazy>

                {this.props.caption &&
                    <span className={classes.caption}>{this.props.caption}</span>
                }

                {((this.props.lightbox && this.state.lightboxVisible) || this.props.lightboxAnimation) &&
                    <div className={classes.lightbox}>

                        <div className={classes.lightboxInner}>
                            <img
                                className={classes.lightboxImage}
                                src={(this.state.visible || true) ? this.imageURL : options.blankImage}
                                role="presentation"
                            />
                        </div>

                        <div className={classes.lightboxActions}>
                            <Icon className={classes.lightboxAction} onClick={hideLightbox}>close</Icon>
                            {Pod_Helper.fullscreen.isAvailable() &&
                                <Icon className={classes.lightboxAction} onClick={toggleFullscreen}>{this.state.fullscreenIcon}</Icon>
                            }

                            {this.props.allowDownload && <Icon onClick={downloadFile} className={classes.lightboxAction}>file_download</Icon>}

                            <Icon onClick={openInNew} className={classes.lightboxAction}>open_in_new</Icon>

                        </div>
                    </div>
                }
            </div>
        );
    }
};
