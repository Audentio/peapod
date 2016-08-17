import React from 'react';
import { ContentWrap, Scrollable, Paragraph } from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class ScrollableExample extends React.Component {

    shouldComponentUpdate = PureRender;

    render() {
        return (
            <div>
                <ContentWrap>
                    <Scrollable height="100px">
                        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Paragraph>
                        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Paragraph>
                        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Paragraph>
                        <Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Paragraph>
                    </Scrollable>
                </ContentWrap>
            </div>
        );
    }

};
