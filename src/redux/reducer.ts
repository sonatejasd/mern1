import {init } from './init';
interface UpdateLoginStatus{
    type: 'UPDATE_LOGIN_STATUS';
    payload: {
        isLoggedIn: boolean;
        user?: string;
    }
}
type ActionType = UpdateLoginStatus;
export const appReducer = (state = init, action: ActionType) => {
    switch (action.type) {
        case 'UPDATE_LOGIN_STATUS' : return {...state, ...action.payload};
        default : return state; 
    }
}