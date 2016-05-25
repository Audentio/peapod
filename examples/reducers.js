import { combineReducers } from 'redux';
import { ADD_FIXED_ELEM } from './actions';

function fixed(state = [], action) {
    switch (action.type) {
    case ADD_FIXED_ELEM:
        return [
            ...state,
            {
                top: action.top,
                height: action.height,
            },
        ];
    default:
        return state;
    }
}

const fixedElems = combineReducers({
    fixed,
});

export default fixedElems;
