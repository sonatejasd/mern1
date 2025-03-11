import {init } from './init';

export const appReducer = (state = init, action) => {
    switch (action.type) {
        case 'UPDATE_LOGIN_STATUS' : 
            return {...state, ...action.payload};
        case 'SHOW_EDIT_MODAL': 
            return {...state, ...action.payload};
        case 'STUDENTS':
            return {...state, students: action.payload};
        case 'DELETE_STUDENT':
            return {...state, ...action.payload};
        default : return state; 
    }
}