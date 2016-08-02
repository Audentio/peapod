/*
 * action types
 */

export const ADD_FIXED_ELEM = 'ADD_FIXED_ELEM';

/*
 * action creators
 */

export function addFixed(top, height) {
    return { type: ADD_FIXED_ELEM, top, height };
}
