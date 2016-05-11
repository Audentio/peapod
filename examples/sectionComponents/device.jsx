import React from 'react'
import Pod from 'components.js'

export default class DeviceSection extends React.Component {

    render () {
        return (
            <Pod.Section key={'device'}>
                <Pod.ContentWrap>
                    <Pod.Heading>Image Containers / Scrollable(horizontal)</Pod.Heading>
                    <Pod.Paragraph>Todo: Update iphone to show actual screen??, Add MacBook, iPad and iMac</Pod.Paragraph>
                </Pod.ContentWrap>


                <Pod.Scrollable horizontal={true} styler={{center: true}}>
                    <Pod.Device device='iphone' variant="black" styler={{style: {display: 'inline-block'}}}>
                        <Pod.Heading kind="h5">Not Scrollable</Pod.Heading>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                    </Pod.Device>

                    <Pod.Device device='iphone' variant="black" styler={{style: {display: 'inline-block'}}}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Embed width="100%" height="100%" src="https://www.youtube.com/Embed/QhUzmR8eZAo" />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device device='iphone' variant="black" styler={{scrollable: true, style: {display: 'inline-block'}}}>
                        <Pod.Heading kind="h5">Scrollable</Pod.Heading>
                        <Pod.Block>
                            <Pod.Block_Left>
                                <Pod.Photo src="smallimg.png" styler={{ style: { display: 'block', width:'100px' } }}/>
                            </Pod.Block_Left>
                            <Pod.Block>
                                <Pod.Heading kind="h4">Not a media element(Level 1 elements)</Pod.Heading>
                                <Pod.Paragraph> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint quaerat ex, rerum nulla officia expedita deleniti excepturi debitis vitae ea deserunt. Nihil quo voluptate ad atque veritatis, officia itaque sunt! </Pod.Paragraph>
                            </Pod.Block>
                        </Pod.Block>

                        <Pod.Media image="smallimg.png" title="A media element(Level 2 element)">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui ex asperiores rem alias aspernatur quis fugiat eum tempore quaerat, culpa unde earum at recusandae ipsa fuga facilis doloremque minus expedita.
                        </Pod.Media>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                    </Pod.Device>


                    <Pod.Device device='phone' variant="black" orientation='horizontal'styler={{scrollable: true, style: {display: 'inline-block'}}}>
                        <Pod.Lazy distance="50" height="100%">
                            <Pod.Embed width="100%" height="100%" src="http://www.themehouse.com/" />
                        </Pod.Lazy>
                    </Pod.Device>

                    <Pod.Device device='macbook' variant="gold" styler={{style: {display: 'inline-block'}}}>
                            <Pod.Embed width="100%" height="100%" src="http://www.themehouse.com/" />
                    </Pod.Device>

                    <Pod.Device device='macbook' variant="spacegrey" styler={{style: {display: 'inline-block'}}}>
                            <Pod.Embed width="100%" height="100%" src="http://www.themehouse.com/" />
                    </Pod.Device>

                    <Pod.Device device='macbook' variant="silver" styler={{style: {display: 'inline-block'}}}>
                            <Pod.Embed width="100%" height="100%" src="http://www.themehouse.com/" />
                    </Pod.Device>

                    <Pod.Device device='iphone' variant="black" styler={{scrollable: true, style: {display: 'inline-block'}}}>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                        <Pod.Photo src="image.png" styler={{ style: { display: 'block' } }}/>
                    </Pod.Device>
                </Pod.Scrollable>

                <br className="clear" />
            </Pod.Section>
        )
    }

}
