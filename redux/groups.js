import { api } from '../App';

const SET_GROUPS = 'SET_GROUPS';
const ADD_GROUP = 'ADD_GROUP';

export default function reducer(state = [], action) {
    switch (action.type) {
        case SET_GROUPS:
            return [...action.payload.groups];
        case ADD_GROUP:
            return [action.payload.group, ...state];
        default:
            return state;
    }
}

function setGroups(groups) {
    return {
        type: SET_GROUPS,
        payload: {
            groups,
        },
    };
}

function addNewGroup(group) {
    return {
        type: ADD_GROUP,
        payload: {
            group,
        },
    };
}

export function fetchGroups() {
    return async (dispatch) => {
        try {
            const resp = await api.get('/api/bees/category/');
            await dispatch(setGroups(resp.data));
        } catch (e) {
            console.warn(e);
        }
    };
}

export function addGroup(data) {
    return async (dispatch) => {
        try {
            const resp = await api.post('/api/bees/category/', data);
            await dispatch(addNewGroup(resp.data));
        } catch (e) {
            console.warn(e);
        }
    };
}
