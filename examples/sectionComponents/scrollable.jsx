import React from 'react'
import ReactDOM from 'react-dom'
import 'components'
import Paragraph from 'components/paragraph'
import Strong from 'components/strong'
import Code from 'components/code'

export default class ScrollableSection extends React.Component {

    render () {
        return (
            <Pod.section key={'section'}>
                <Pod.contentWrap>
                    <Pod.heading>Section + Wrapper + Scrollable</Pod.heading>
                    <Pod.scrollable height='100px'>
                        <Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Pod.paragraph>
                        <Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Pod.paragraph>
                        <Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Pod.paragraph>
                        <Pod.paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Pod.paragraph>
                    </Pod.scrollable>
                </Pod.contentWrap>
            </Pod.section>
        )
    }

}