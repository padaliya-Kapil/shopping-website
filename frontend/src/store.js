import {createStore , combineReducers,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'

import {productListReducer , productDetailsReducer} from './reducers/productreducers'
import {cartReducer} from './reducers/cartreducers'
import {userLoginReducer,userRegisterReducer}  from './reducers/userReducers'

const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer ,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
                JSON.parse(localStorage.getItem('cartItems')) : []

const userInFromStorage = localStorage.getItem('userInfo') ? 
                JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart : {cartItems:cartItemsFromStorage},
    userLogin : {userInfo : userInFromStorage}
}
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store

