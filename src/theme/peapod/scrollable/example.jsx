import React from 'react';
import Pod from 'components.js';

module.exports = class ScrollableExample extends React.Component {

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Scrollable height="100px">
                        <Pod.Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Pod.Paragraph>
                        <Pod.Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Pod.Paragraph>
                        <Pod.Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Pod.Paragraph>
                        <Pod.Paragraph>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis error dolore perspiciatis nesciunt asperiores nihil vero omnis, ut fuga explicabo perferendis, labore commodi sit quod? Enim, eligendi omnis sit quasi!</Pod.Paragraph>
                    </Pod.Scrollable>
                </Pod.ContentWrap>
            </div>
        );
    }

}
