import axios from 'axios'
import history from '../history'
import {addItems} from './orderItems'
/**
 * ACTION TYPES
 */
const GET_ORDER = 'GET_ORDER'
const ADD_ORDER = 'ADD_ORDER'
const CREATE_CART = 'CREATE_CART'
const CREATE_SESSION_CART = 'CREATE_SESSION_CART'
const GET_SESSION_CART = 'GET_SESSION_CART'
/**
 * INITIAL STATE
 */

const defaultOrder = {
  id: '',
  status: '',
  dateOfPurchase: '',
  subTotal: 0,
  orderitems: [],
}

/**
 * ACTION CREATORS
 */
const _getOrder = (order) => ({type: GET_ORDER, order})
const _addToOrder = (item) => ({type: ADD_ORDER, item})
const _createCart = (item) => ({type: CREATE_CART, item})
const _createSessionCart = (item) => ({type: CREATE_SESSION_CART, item})
const _getSessionCart = (item) => ({type: GET_SESSION_CART, item})
/**
 * THUNK CREATORS
 */

export const getSessionCart = () => {
  //console.log('id from getOrder idcfrom getOrder', id)
  return async (dispatch) => {
    console.log('before going through the api')
    const res = await axios.get('/api/orders/session')
    console.log('response from the getssesioncart', res)
    if (res === null) {
      //console.log('create create create create', id)
      //createSessionCart(id)
    } else {
      //console.log('in getOrder thunk', res.data)
      dispatch(_getSessionCart(res.data))
    }
  }
}

export const createSessionCart = (userId, productId, price, qv, push) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/orders/session`)

    //console.log(
    // 'create sessionpost post post post in getsesioncart thunk',
    //res.data
    //),
    dispatch(_createSessionCart(res.data))
    dispatch(addItems(userId, res.data.id, productId, price, qv, push))

    //push(`/orders/cart/${res.data.userId}`)
  }
}
export const getOrder = (id) => {
  //console.log('id from getOrder idcfrom getOrder', id)
  return async (dispatch) => {
    const res = await axios.get(`/api/orders/cart/${id}`)
    if (res === null) {
      //console.log('create create create create', id)
      createCart(id)
    } else {
      //console.log('in getOrder thunk', res.data)
      dispatch(_getOrder(res.data))
    }
  }
}

export const createCart = (id, productid, productprice, qv, push, product) => {
  return async (dispatch) => {
    const res = await axios.post(`/api/orders`, {
      userId: id,
    })

    // console.log('post post post post in getOrder thunk', res.data),
    dispatch(_createCart(res.data))

    dispatch(addItems(id, res.data.id, productid, productprice, qv, push))

    //push(`/orders/cart/${res.data.userId}`)
  }
}

export const addOrder = (item) => {
  return async (dispatch) => {
    //console.log('addToorder thunk 222222222111111111', item)
    const {productId, quantity, price, userId, orderId} = item
    const newItem = await axios.post('/api/orders', {
      productId,
      quantity,
      price,
      userId,
    })
    console.log('addToCart thunk', newItem.data)
    await dispatch(_addToOrder(newItem.data))
    await dispatch(addItems(newItem.data.id, productId))
  }
}
/**
 * REDUCER
 */
export default function (state = defaultOrder, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order
    case GET_SESSION_CART:
      return action.item
    case ADD_ORDER:
      console.log(state)
      return action.item
    case CREATE_CART:
      console.log(state)
      return action.item
    case CREATE_SESSION_CART:
      return action.item
    default:
      return state
  }
}
