import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class DeviceSection extends React.Component {

    render () {
        return (
            <Pod.section key={'imageContainer'}>
                <Pod.contentWrap>
                    <Pod.heading>Image Containers / Scrollable(horizontal)</Pod.heading>
                    <Pod.paragraph>Todo: Update iphone to show actual screen??, Add MacBook, iPad and iMac</Pod.paragraph>
                </Pod.contentWrap>

                <Pod.scrollable horizontal={true} styler={{center: true}}>
                    <Pod.imageContainer preset='iphone' styler={{style: {display: 'inline-block'}}}>
                        <Pod.heading kind="h5">Not Scrollable</Pod.heading>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                    </Pod.imageContainer>

                    <Pod.imageContainer preset='iphone' styler={{style: {display: 'inline-block'}}}>
                        <Pod.lazy distance="50" height="100%">
                            <Pod.embed width="100%" height="100%" src="https://www.youtube.com/embed/QhUzmR8eZAo" />
                        </Pod.lazy>
                    </Pod.imageContainer>

                    <Pod.imageContainer preset='iphone' styler={{scrollable: true, style: {display: 'inline-block'}}}>
                        <Pod.heading kind="h5">Scrollable</Pod.heading>
                        <Pod.block>
                            <Pod.blockLeft>
                                <Pod.photo src="smallimg.png" styler={{ style: { display: 'block', width:'100px' } }}/>
                            </Pod.blockLeft>
                            <Pod.block>
                                <Pod.heading kind="h4">Not a media element(Level 1 elements)</Pod.heading>
                                <Pod.paragraph> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quaerat ex, rerum nulla officia expedita deleniti excepturi debitis vitae ea deserunt. Nihil quo voluptate ad atque veritatis, officia itaque sunt! </Pod.paragraph>
                            </Pod.block>
                        </Pod.block>

                        <Pod.media image="smallimg.png" title="A media element(Level 2 element)">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat, culpa unde earum at recusandae ipsa fuga facilis doloremque minus expedita.
                        </Pod.media>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                    </Pod.imageContainer>

                    <Pod.imageContainer preset='iphone' styler={{scrollable: true, horizontal:true, style: {display: 'inline-block'}}}>
                        <Pod.lazy distance="50" height="100%">
                            <Pod.embed width="100%" height="100%" src="http://www.themehouse.com/" />
                        </Pod.lazy>
                    </Pod.imageContainer>

                    <Pod.imageContainer preset='iphone' styler={{style: {display: 'inline-block'}}}>
                        <Pod.lazy distance="50" height="100%">
                            <Pod.embed width="100%" height="100%" src="http://www.themehouse.com/" />
                        </Pod.lazy>
                    </Pod.imageContainer>

                    <Pod.imageContainer preset='iphone' styler={{scrollable: true, style: {display: 'inline-block'}}}>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.photo src="image.png" styler={{ style: { display: 'block' } }}/>
                    </Pod.imageContainer>
                </Pod.scrollable>

                <br className="clear" />
            </Pod.section>
        )
    }

}