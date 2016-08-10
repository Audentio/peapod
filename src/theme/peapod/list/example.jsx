import React from 'react';
import { ContentWrap, Card, Card_Section, Heading, List, List_Item } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class ListExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <ContentWrap>
                    <Card styler={{ style: { width: '350px' } }}>

                        <Card_Section styler={{ kind: 'title-small' }}>
                            <Heading kind="h6" styler={{ secondary: true }}>Alternating List</Heading>
                        </Card_Section>
                        <List>
                            <List_Item
                                image={'assets/media/image.png'}
                                icon={'star_border'}
                                secondary={"Something something"}
                                styler={{ image: 'right', icon: 'left', divider: 'right' }}
                                onClick={() => { /* eslint-disable no-console */ console.log('List Item Clicked'); }}
                                onIconClick={() => { console.log('List Item Button Clicked'); /* eslint-enable no-console */ }}
                            >
                                Item #1
                            </List_Item>
                            <List_Item image={'assets/media/image.png'} icon={'star_border'} secondary={"Something something"} styler={{ divider: 'left' }}>
                                Item #2
                            </List_Item>
                            <List_Item image={'assets/media/image.png'} icon={'star_border'} secondary={"Something something"} styler={{ image: 'right', icon: 'left', divider: 'right' }}>
                                Item #3
                            </List_Item>
                            <List_Item image={'assets/media/image.png'} icon={'star_border'} secondary={"Something something"} styler={{ divider: 'left' }}>
                                Item #4
                            </List_Item>
                            <List_Item image={'assets/media/image.png'} icon={'star_border'} secondary={"Something something"} styler={{ image: 'right', icon: 'left', divider: 'right' }}>
                                Item #5
                            </List_Item>
                        </List>

                    </Card>
                    <Card styler={{ style: { width: '350px' } }}>

                        <Card_Section styler={{ kind: 'title-small' }}>
                            <Heading kind="h6" styler={{ secondary: true }}>Standard List with secondary text</Heading>
                        </Card_Section>

                        <List>
                            <List_Item secondary={"Something something"}>
                                Item #1
                            </List_Item>
                            <List_Item secondary={"Something something"}>
                                Item #2
                            </List_Item>
                            <List_Item secondary={"Something something"}>
                                Item #3
                            </List_Item>
                            <List_Item secondary={"Something something"}>
                                Item #4
                            </List_Item>
                            <List_Item secondary={"Something something"}>
                                Item #5
                            </List_Item>
                        </List>

                    </Card>
                    <Card styler={{ style: { width: '350px' } }}>

                        <Card_Section styler={{ kind: 'title-small' }}>
                            <Heading kind="h6" styler={{ secondary: true }}>List with images</Heading>
                        </Card_Section>

                        <List>
                            <List_Item image={'assets/media/image.png'} styler={{ imgSize: 'small' }}>Item #1</List_Item>
                            <List_Item image={'assets/media/image.png'} styler={{ imgSize: 'small' }}>Item #2</List_Item>
                            <List_Item image={'assets/media/image.png'} styler={{ imgSize: 'small' }}>Item #3</List_Item>
                            <List_Item image={'assets/media/image.png'} styler={{ imgSize: 'small' }}>Item #4</List_Item>
                            <List_Item image={'assets/media/image.png'} styler={{ imgSize: 'small' }}>Item #5</List_Item>
                        </List>

                    </Card>
                    <Card styler={{ style: { width: '350px' } }}>

                        <Card_Section styler={{ kind: 'title-small' }}>
                            <Heading kind="h6" styler={{ secondary: true }}>List with large images</Heading>
                        </Card_Section>

                        <List>
                            <List_Item image={'assets/media/image.png'} styler={{ imgSize: 'large' }}>Item #1</List_Item>
                            <List_Item image={'assets/media/image.png'} styler={{ imgSize: 'large' }}>Item #2</List_Item>
                            <List_Item image={'assets/media/image.png'} styler={{ imgSize: 'large' }}>Item #3</List_Item>
                            <List_Item image={'assets/media/image.png'} styler={{ imgSize: 'large' }}>Item #4</List_Item>
                            <List_Item image={'assets/media/image.png'} styler={{ imgSize: 'large' }}>Item #5</List_Item>
                        </List>

                    </Card>
                    <Card styler={{ style: { width: '350px' } }}>

                        <Card_Section styler={{ kind: 'title-small' }}>
                            <Heading kind="h6" styler={{ secondary: true }}>List with icons</Heading>
                        </Card_Section>

                        <List>
                            <List_Item icon={'star_border'}>Item #1</List_Item>
                            <List_Item icon={'star_border'}>Item #2</List_Item>
                            <List_Item icon={'star_border'}>Item #3</List_Item>
                            <List_Item icon={'star_border'}>Item #4</List_Item>
                            <List_Item icon={'star_border'}>Item #5</List_Item>
                        </List>
                    </Card>
                </ContentWrap>
            </div>
        );
    }
};
