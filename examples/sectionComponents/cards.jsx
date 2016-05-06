import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class CardsSection extends React.Component {

    render () {
        return (
            <div>
                <Pod.section key={'cards'}>
                    <Pod.contentWrap>

                        <Pod.heading>Cards</Pod.heading>
                        <Pod.card styler={{style:{width: '350px'}}}>
                            <Pod.cardSection styler={{kind:'media-section'}} mediaTitle={
                                <div>
                                    <Pod.cardSection styler={{kind:'title-small'}}>
                                        <Pod.heading kind="h4" styler={{secondary: true}}>Hello there</Pod.heading>
                                        <Pod.paragraph styler={{secondary: true}}>Lorem ipsum dolor sit</Pod.paragraph>
                                    </Pod.cardSection>

                                    <Pod.cardSection styler={{kind:'action-bar'}}>
                                        <Pod.button label="Agree" />
                                        <Pod.button label="Disagree" />
                                    </Pod.cardSection>
                                </div>
                            }>
                                <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                            </Pod.cardSection>
                        </Pod.card>

                        <Pod.card styler={{style:{width: '350px'}}}>
                            <Pod.cardSection>
                                <Pod.cardSection styler={{kind:'media-area'}}>
                                    <Pod.photo src="image.png"/>
                                </Pod.cardSection>
                                <Pod.cardSection styler={{kind:'media-area-icons'}}>
                                <Pod.button styler={{type: 'icon'}} label={
                                    (<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>favorite</Pod.icon>)
                                } />

                                <Pod.button styler={{type: 'icon'}} label={
                                    (<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>bookmark</Pod.icon>)
                                } />

                                <Pod.button styler={{type: 'icon'}} label={
                                    (<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.icon>)
                                } />
                                </Pod.cardSection>
                            </Pod.cardSection>
                        </Pod.card>

                        <Pod.card styler={{style:{width: '350px'}}}>
                            <Pod.cardSection styler={{kind:'media-section'}}>
                                <Pod.photo src="image.png"/>
                            </Pod.cardSection>

                            <Pod.cardSection styler={{kind:'action-bar'}}>
                                <Pod.button styler={{type: 'icon'}} label={
                                    (<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>favorite</Pod.icon>)
                                } />

                                <Pod.button styler={{type: 'icon'}} label={
                                    (<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>bookmark</Pod.icon>)
                                } />

                                <Pod.button styler={{type: 'icon'}} label={
                                    (<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.icon>)
                                } />
                            </Pod.cardSection>
                        </Pod.card>

                        <Pod.card styler={{style:{width: '350px'}}}>
                            <Pod.cardSection styler={{kind:'title-supports'}}>
                                <Pod.cardSection styler={{kind:'media', float: 'right'}}>
                                    <Pod.photo src="image.png" styler={{style:{width: '100px'}}}/>
                                </Pod.cardSection>

                                <Pod.heading kind="h5" styler={{secondary: true}}>Hello there</Pod.heading>
                                <Pod.paragraph styler={{secondary: true}}>Lorem ipsum dolor sit</Pod.paragraph>
                            </Pod.cardSection>

                            <Pod.cardSection styler={{kind:'action-bar'}}>
                                <Pod.button label="Agree" />
                                <Pod.button label="Disagree" />
                            </Pod.cardSection>
                        </Pod.card>

                        <Pod.card styler={{style:{width: '350px'}}}>
                            <Pod.cardSection styler={{kind:'title-supports'}}>

                                <Pod.heading kind="h5" styler={{secondary: true}}>Hello there</Pod.heading>
                                <Pod.paragraph styler={{secondary: true}}>Lorem ipsum dolor sit</Pod.paragraph>
                            </Pod.cardSection>

                            <Pod.cardSection>
                                <Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Pod.paragraph>
                            </Pod.cardSection>

                            <Pod.cardSection styler={{kind:'action-bar'}}>
                                <Pod.button label="Agree" />
                                <Pod.button label="Disagree" />
                            </Pod.cardSection>
                        </Pod.card>
                    </Pod.contentWrap>
                </Pod.section>

                <Pod.section key={'simplecards'}>
                    <Pod.contentWrap>

                        <Pod.heading>Simple Cards</Pod.heading>

                        <Pod.card styler={{padded:true, style:{width: '350px'}}} title="Simple Card" actionBar={(
                            <div>
                                <Pod.button styler={{type: 'icon'}} label={
                                        (<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>bookmark</Pod.icon>)
                                    } />

                                <Pod.button styler={{type: 'icon'}} label={
                                    (<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.icon>)
                                } />
                            </div>
                        )}>
                            <Pod.photo src="image.png"/>
                        </Pod.card>

                        <Pod.card styler={{style:{width: '350px'}}} actionBar={(
                                <div>
                                    <Pod.button styler={{type: 'icon'}} label={
                                            (<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>favorite</Pod.icon>)
                                        } />

                                    <Pod.button styler={{type: 'icon'}} label={
                                        (<Pod.icon styler={{ style: { lineHeight: 'inherit' } }}>get_app</Pod.icon>)
                                    } />
                                </div>
                            )}>
                                <Pod.photo src="image.png"/>
                            </Pod.card>

                        <Pod.card styler={{padded:true, style:{width: '350px'}}} title="Simple Card" actionBar={(
                                <div>
                                    <Pod.button label="Button" />

                                    <Pod.button label="Another Button" />
                                </div>
                            )}>
                            <Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Pod.paragraph>
                        </Pod.card>

                        <Pod.card styler={{padded:true, style:{width: '350px'}}} title="Simple Card">
                            <Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Pod.paragraph>
                        </Pod.card>

                    </Pod.contentWrap>
                </Pod.section>
            </div>
        )
    }

}