import { api } from '../App';
import { store } from './index';

import { fetchUser } from './user';

const SET_JOBS = 'SET_JOBS';
const ADD_JOB = 'ADD_JOB';
const SET_ACTIVE_JOBS = 'SET_ACTIVE_JOBS';
const ACCEPT_FINISHED = 'ACCEPT_FINISHED';
const REMOVE_JOB = 'REMOVE_JOB';
const FETCH = 'FETCH';
const FETCH_FAIL = 'FETCH_FAIL';

export default function reducer(state = { past: [], active: [], isLoading: false }, action) {
    switch (action.type) {
        case SET_JOBS:
            return { ...state, past: [...action.payload.jobs], isLoading: false };
        case ADD_JOB:
            return { ...state, active: [action.payload.job, ...state.active], isLoading: false };
        case SET_ACTIVE_JOBS:
            return { ...state, active: [...action.payload.jobs], isLoading: false };
        case ACCEPT_FINISHED:
            return {
                past: {...state, past: [action.payload.job, ...state.past]},
                active: state.active.filter(job => job.id !== action.payload.job.id),
                isLoading: false,
            };
        case FETCH:
            return { ...state, isLoading: true };
        case FETCH_FAIL:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}

function setJobs(jobs) {
    return {
        type: SET_JOBS,
        payload: {
            jobs,
        },
    };
}

function addNewJob(job) {
    return {
        type: ADD_JOB,
        payload: {
            job,
        },
    };
}


function setActiveJobs(jobs) {
    return {
        type: SET_ACTIVE_JOBS,
        payload: {
            jobs,
        },
    };
}

function _acceptFinished(job) {
    return {
        type: ACCEPT_FINISHED,
        payload: {
            job,
        },
    };
}

export function addJob(job) {
    return async (dispatch) => {
        dispatch({ type: FETCH });
        try {
            const resp = await api.post('/api/bees/job/', job);
            dispatch(addNewJob(resp.data));
        } catch (e) {
            console.warn(e);
            dispatch({ type: FETCH_FAIL });
        }
    };
}

export function fetchActiveJobs() {
    return async (dispatch) => {
        dispatch({ type: FETCH });
        try {
            const resp = await api.get('/api/bees/job/', {
                params: {
                    principal: store.getState().user.employer_bee,
                    finished: false,
                },
            });
            dispatch(setActiveJobs(resp.data));
        } catch (e) {
            console.warn(e);
            dispatch({ type: FETCH_FAIL });
        }
    };
}

export function fetchPastJobs() {
    return async (dispatch) => {
        dispatch({ type: FETCH });
        try {
            const resp = await api.get('/api/bees/job/', {
                params: {
                    principal__user: store.getState().user.id,
                    finished: true,
                },
            });
            dispatch(setJobs(resp.data));
        } catch (e) {
            console.warn(e);
            dispatch({ type: FETCH_FAIL });
        }
    };
}

export function deleteJob(job) {
    return async (dispatch) => {
        dispatch({ type: FETCH });
        try {
            const resp = await api.delete(`/api/bees/job/${job.id}/`);
            dispatch(removeJob(job));
        } catch (e) {
            console.warn(e);
            dispatch({ type: FETCH_FAIL });
        }
    };
}

export function markFinished(job) {
    return async (dispatch) => {
        try {
            const resp = await api.post(`/api/bees/job/${job.id}/accept_finished/`);
            dispatch(_acceptFinished(job));
            return resp.data;
        } catch (e) {
            console.warn(e);
        }
        return null;
    };
}
