import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

import { userLoginReducer } from './reducers/userReducers'; 
import { userRegisterReducer } from './reducers/userReducers'; 
import { userDetailsReducer } from './reducers/userReducers'; 
import { userDeleteReducer } from './reducers/userReducers'; 
import { userUpdateReducer } from './reducers/userReducers'; 

import {postListReducer, postDetailReducer, postDeleteReducer,
postCreateReducer, postUpdateReducer, reviewListReducer, reviewCreateReducer} from './reducers/postReducers' 
 

const rootReducer = combineReducers({
    postList: postListReducer,
    postDetails: postDetailReducer,
    postDelete: postDeleteReducer,
    postCreate: postCreateReducer,
    postUpdate: postUpdateReducer,

    reviewList: reviewListReducer,
    reviewCreate: reviewCreateReducer,
    
    userLogin: userLoginReducer,
    register: userRegisterReducer,
    details: userDetailsReducer,
    delete: userDeleteReducer,
    update: userUpdateReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null 

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}


// const store = createStore(
//     rootReducer, initialState,
//     composeWithDevTools(applyMiddleware(thunk))
// );

// const store = configureStore({
//     reducer : {
//         rootReducer: rootReducer.reducer, 
//         preloadedState: initialState,
//     }
// }, composeWithDevTools(applyMiddleware(thunk)));

// const store = configureStore({
//     reducer: rootReducer, 
//     preloadedState: initialState,
// }, composeWithDevTools(applyMiddleware(thunk)));

//////////////////////////수정/////////////
const middleware = [thunk]

const store = createStore(rootReducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;