import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class ListsSection extends React.Component {

    render () {
        return (
            <Pod.section key={'lists'}>
                <Pod.contentWrap>

                    <Pod.heading>Lists</Pod.heading>

                    <Pod.card styler={{style:{width: '350px'}}}>

                        <Pod.cardSection styler={{kind:'title-small'}}>
                            <Pod.heading kind="h6" styler={{secondary: true}}>Alternating List</Pod.heading>
                        </Pod.cardSection>


                            <Pod.list>
                                <Pod.listItem
                                    image={'image.png'}
                                    icon={'star_border'}
                                    secondary={"Something something"}

                                    styler={{image: 'right', icon: 'left', divider: 'right'}}
                                    onClick={(event)=>{console.log("List Item Clicked")}}
                                    onIconClick={()=>{console.log("List Item Button Clicked")}}
                                >
                                    Item #1
                                </Pod.listItem>
                                <Pod.listItem image={'image.png'} icon={'star_border'} secondary={"Something something"} styler={{divider: 'left'}}>
                                    Item #2
                                </Pod.listItem>
                                <Pod.listItem image={'image.png'} icon={'star_border'} secondary={"Something something"} styler={{image: 'right', icon: 'left', divider: 'right'}}>
                                    Item #3
                                </Pod.listItem>
                                <Pod.listItem image={'image.png'} icon={'star_border'} secondary={"Something something"} styler={{divider: 'left'}}>
                                    Item #4
                                </Pod.listItem>
                                <Pod.listItem image={'image.png'} icon={'star_border'} secondary={"Something something"} styler={{image: 'right', icon: 'left', divider: 'right'}}>
                                    Item #5
                                </Pod.listItem>
                            </Pod.list>

                    </Pod.card>
                    <Pod.card styler={{style:{width: '350px'}}}>

                        <Pod.cardSection styler={{kind:'title-small'}}>
                            <Pod.heading kind="h6" styler={{secondary: true}}>Standard list with secondary text</Pod.heading>
                        </Pod.cardSection>

                            <Pod.list>
                                <Pod.listItem secondary={"Something something"}>
                                    Item #1
                                </Pod.listItem>
                                <Pod.listItem secondary={"Something something"}>
                                    Item #2
                                </Pod.listItem>
                                <Pod.listItem secondary={"Something something"}>
                                    Item #3
                                </Pod.listItem>
                                <Pod.listItem secondary={"Something something"}>
                                    Item #4
                                </Pod.listItem>
                                <Pod.listItem secondary={"Something something"}>
                                    Item #5
                                </Pod.listItem>
                            </Pod.list>

                    </Pod.card>
                    <Pod.card styler={{style:{width: '350px'}}}>

                        <Pod.cardSection styler={{kind:'title-small'}}>
                            <Pod.heading kind="h6" styler={{secondary: true}}>List with images</Pod.heading>
                        </Pod.cardSection>

                            <Pod.list>
                                <Pod.listItem image={'image.png'} styler={{imgSize: 'small'}}>Item #1</Pod.listItem>
                                <Pod.listItem image={'image.png'} styler={{imgSize: 'small'}}>Item #2</Pod.listItem>
                                <Pod.listItem image={'image.png'} styler={{imgSize: 'small'}}>Item #3</Pod.listItem>
                                <Pod.listItem image={'image.png'} styler={{imgSize: 'small'}}>Item #4</Pod.listItem>
                                <Pod.listItem image={'image.png'} styler={{imgSize: 'small'}}>Item #5</Pod.listItem>
                            </Pod.list>

                    </Pod.card>
                    <Pod.card styler={{style:{width: '350px'}}}>

                        <Pod.cardSection styler={{kind:'title-small'}}>
                            <Pod.heading kind="h6" styler={{secondary: true}}>List with large images</Pod.heading>
                        </Pod.cardSection>

                            <Pod.list>
                                <Pod.listItem image={'image.png'} styler={{imgSize: 'large'}}>Item #1</Pod.listItem>
                                <Pod.listItem image={'image.png'} styler={{imgSize: 'large'}}>Item #2</Pod.listItem>
                                <Pod.listItem image={'image.png'} styler={{imgSize: 'large'}}>Item #3</Pod.listItem>
                                <Pod.listItem image={'image.png'} styler={{imgSize: 'large'}}>Item #4</Pod.listItem>
                                <Pod.listItem image={'image.png'} styler={{imgSize: 'large'}}>Item #5</Pod.listItem>
                            </Pod.list>

                    </Pod.card>
                    <Pod.card styler={{style:{width: '350px'}}}>

                        <Pod.cardSection styler={{kind:'title-small'}}>
                            <Pod.heading kind="h6" styler={{secondary: true}}>List with icons</Pod.heading>
                        </Pod.cardSection>

                            <Pod.list>
                                <Pod.listItem icon={'star_border'}>Item #1</Pod.listItem>
                                <Pod.listItem icon={'star_border'}>Item #2</Pod.listItem>
                                <Pod.listItem icon={'star_border'}>Item #3</Pod.listItem>
                                <Pod.listItem icon={'star_border'}>Item #4</Pod.listItem>
                                <Pod.listItem icon={'star_border'}>Item #5</Pod.listItem>
                            </Pod.list>
                    </Pod.card>

                </Pod.contentWrap>
            </Pod.section>
        )
    }

}