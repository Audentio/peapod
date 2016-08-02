import React from 'react';
import Pod from 'utility/components.js';
import PureRender from 'utility/pureRender.js';

module.exports = class TableExample extends React.Component {

    shouldComponentUpdate = PureRender;

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
            6: {
                id: 6,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            7: {
                id: 7,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            8: {
                id: 8,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            9: {
                id: 9,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            10: {
                id: 10,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            11: {
                id: 11,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            12: {
                id: 12,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            13: {
                id: 13,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            14: {
                id: 14,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            15: {
                id: 15,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            16: {
                id: 16,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            17: {
                id: 17,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            18: {
                id: 18,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            19: {
                id: 19,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            20: {
                id: 20,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            21: {
                id: 21,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            22: {
                id: 22,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            23: {
                id: 23,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            24: {
                id: 24,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            25: {
                id: 25,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            26: {
                id: 26,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            27: {
                id: 27,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            28: {
                id: 28,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            29: {
                id: 29,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            30: {
                id: 30,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            31: {
                id: 31,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            32: {
                id: 32,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            33: {
                id: 33,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            34: {
                id: 34,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            35: {
                id: 35,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            36: {
                id: 36,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            37: {
                id: 37,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            38: {
                id: 38,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            39: {
                id: 39,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            40: {
                id: 40,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            41: {
                id: 41,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            42: {
                id: 42,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            43: {
                id: 43,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            44: {
                id: 44,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            45: {
                id: 45,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            46: {
                id: 46,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            47: {
                id: 47,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            48: {
                id: 48,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            49: {
                id: 49,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            50: {
                id: 50,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            51: {
                id: 51,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            52: {
                id: 52,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            53: {
                id: 53,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            54: {
                id: 54,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            55: {
                id: 55,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            56: {
                id: 56,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            57: {
                id: 57,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            58: {
                id: 58,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            59: {
                id: 59,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            60: {
                id: 60,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            61: {
                id: 61,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            62: {
                id: 62,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            63: {
                id: 63,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            64: {
                id: 64,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            65: {
                id: 65,
                who: 'cow',
                col3: 'foo',
                col4: 'bar',
            },
            66: {
                id: 66,
                who: 'someone',
                col3: 'foo',
                col4: 'bar',
            },
            67: {
                id: 67,
                who: 'someone else',
                col3: 'foo',
                col4: true,
            },
            68: {
                id: 68,
                who: 'dog',
                col3: 'foo',
                col4: false,
            },
            69: {
                id: 69,
                who: 'cat',
                col3: 'foo',
                col4: 'bar',
            },
            70: {
                id: 70,
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
};
