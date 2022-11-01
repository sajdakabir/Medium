import * as api from '../api';
import { AUTH } from '../constants/actionTypes';


export const signin=(fromData,history)=>async(dispatch)=>{
    try {
        history('/')
    } catch (error) {
        console.log(error);
    }
}

export const signup=(fromData,history)=>async(dispatch)=>{
    try {
        history('/')
    } catch (error) {
        console.log(error);
    }
}