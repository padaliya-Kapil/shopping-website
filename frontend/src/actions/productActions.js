import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST , 
    PRODUCT_LIST_SUCCESS , 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_REQUEST ,
  PRODUCT_CREATE_REQUEST ,
  PRODUCT_CREATE_SUCCESS ,
  PRODUCT_CREATE_FAIL ,
  PRODUCT_CREATE_RESET ,
} from '../constants/productConstants.js'

    // thunk allows us to put a function inside a function
export const listProducts = () => async(dispatch) =>{
    try {
        // will call the reducer to load to product 
        dispatch({type:PRODUCT_LIST_REQUEST})

        const {data} = await axios.get('/api/products')

        dispatch({type:PRODUCT_LIST_SUCCESS ,
            payload : data
        })
        
    } catch (error) {

        dispatch({type : PRODUCT_LIST_FAIL ,
        payload : error.response && error.response.data.message 
                                ? error.response.data.message 
                                : error.response
    })
        
    }
}


export const listProductDetails = (id) => async(dispatch) =>{
    try {
        // will call the reducer to load to single product 
        dispatch({type:PRODUCT_DETAIL_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({type:PRODUCT_DETAIL_SUCCESS ,
            payload : data
        })
        
    } catch (error) {

        dispatch({type : PRODUCT_DETAIL_FAIL ,
        payload : error.response && error.response.data.message 
                                ? error.response.data.message 
                                : error.response
    })
        
    }
}



export const deleteProduct  = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
    await axios.delete(`/api/products/${id} `,config);
  
      // console.log(data)
  
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response,
      });
    }
  };


export const createProduct  = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  const {data} = await axios.post(`/api/products/ `,{}, config);

    // console.log(data)

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload : data 
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
  
  
    


