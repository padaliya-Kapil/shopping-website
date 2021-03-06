import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//@desc Create new Order
//@route POST /api/orders
//@access Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items ');
    return;
  } else {
    const order = new Order({
        orderItems,
        user : req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    })
    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
});

//@desc Get order by ID
//@route GET /api/orders/:id
//@access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order  =  await Order.findById(req.params.id).populate('user','name email')
  if (order){
      res.json(order)
      // console.log(order)
  }else{
    res.status(404)
    throw new Error('Order not found')
  }
});

//@desc Update order to paid
//@route GET /api/orders/:id/pay
//@access Private
const updateOrderToBePaid = asyncHandler(async (req, res) => {
  const order  =  await Order.findById(req.params.id)
  if (order){
    order.isPaid  = true 
    order.paidAt = Date.now()
    order.paymentResult ={
      id : req.body.id ,
      status : req.body.status,
      upadate_time : req.body.upadate_time,
      email_address : req.body.email_address
    }

    const updateOrder = await order.save()
    res.json(updateOrder)
  }else{
    res.status(404)
    throw new Error('Order not found')
  }
});

//@desc Get logged in user order
//@route GET /api/orders/myorders
//@access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders  =  await Order.find({user : req.user._id})
console.log('orders' , orders) 
 res.json(orders)
});


//@desc Get all order
//@route GET /api/orders
//@access Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders  =  await Order.find({}).populate('user' ,'id name')
  res.json(orders)
});


//@desc Update order to delivered
//@route GET /api/orders/:id/deliver
//@access Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order  =  await Order.findById(req.params.id)
  if (order){
    order.isDelivered = true 
    order.deliveredAt = Date.now()
 
    const updateOrder = await order.save()
    res.json(updateOrder)
  }else{
    res.status(404)
    throw new Error('Order not found')
  }
});



export {addOrderItems , getOrderById , updateOrderToBePaid , getMyOrders , getOrders ,updateOrderToDelivered}