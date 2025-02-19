import {init } from './init';

export const appReducer = (state = init, action: any) => {
    switch (action.type) {
        case 'UPDATE_LOGIN_STATUS' : return {...state, ...action.payload};
        default : return state; 
    }
}