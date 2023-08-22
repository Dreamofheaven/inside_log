import axios from 'axios'
import {
    POST_LIST_REQUEST, POST_LIST_SUCCESS, POST_LIST_FAIL,
    POST_DETAILS_REQUEST, POST_DETAILS_SUCCESS, POST_DETAILS_FAIL,
    POST_DELETE_REQUEST, POST_DELETE_SUCCESS, POST_DELETE_FAIL,
    POST_CREATE_REQUEST, POST_CREATE_SUCCESS, POST_CREATE_FAIL, POST_CREATE_RESET,
    POST_UPDATE_REQUEST, POST_UPDATE_SUCCESS, POST_UPDATE_FAIL, POST_UPDATE_RESET,
} from '../constants/postConstants'

export const listPosts =  (keyword=' ') => async {dispatch} => {
    try {
        dispatch({type: POST_LIST_REQUEST})

        const{data}=await axios.get('/api/posts${keyword}')
        dispatch({
            type:POST_LIST_SUCCESS, payload: data
        })
    } catch (error) {
        dispatch({
            type: POST_LIST_FAIL, 
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }

}
export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/products/create/`,
            {},
            config
        )
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            config
        )
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}