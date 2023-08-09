import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userLoginReducer from './reducers/userReducers'; 
import userRegisterReducer from './reducers/userReducers'; 
import userDetailsReducer from './reducers/userReducers'; 
import userDeleteReducer from './reducers/userReducers'; 
import userUpdateReducer from './reducers/userReducers'; 


const rootReducer = combineReducers({
    user: userLoginReducer,
    register: userRegisterReducer,
    details: userDetailsReducer,
    delete:userDeleteReducer,
    update:userUpdateReducer,
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export default store;