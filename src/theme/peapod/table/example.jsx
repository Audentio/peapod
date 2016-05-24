import React from 'react';
import Pod from 'utility/components.js';

module.exports = class TableExample extends React.Component {

    dummyData() {
        const rows = {
            1: {
                id: 1,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            2: {
                id: 2,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            3: {
                id: 3,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            4: {
                id: 4,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            5: {
                id: 5,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
        };

        const columns = [
            {
                property: 'id',
                header: 'id',
                cell: '',
                sortable: true,
                centered: false,
                hidden: '',
                fixed: '',
            },
            {
                property: 'who',
                header: 'who',
                cell: '',
                sortable: true,
                centered: false,
                hidden: '',
                fixed: '',
            },
            {
                property: 'col3',
                header: 'col3',
                cell: '',
                sortable: true,
                centered: false,
                hidden: '',
                fixed: '',
            },
            {
                property: 'col4',
                header: 'col4',
                cell: '',
                sortable: true,
                centered: false,
                hidden: '',
                fixed: '',
            },
        ];

        return { rows, columns };
    }

    render() {
        return (
            <div>
                <Pod.ContentWrap>
                    <Pod.Table
                        data={this.dummyData().rows}
                        columns={this.dummyData().columns}
                    />
                </Pod.ContentWrap>
            </div>
        );
    }
}
