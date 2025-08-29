// server/api/orders.get.js
import { OrderModel } from '../models/orderModel.js'
export default defineEventHandler(async () => {
  return await OrderModel.all()
})