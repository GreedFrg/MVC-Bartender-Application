// server/api/orders.post.js
import { OrderModel } from '../models/orderModel.js'
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { customer_name, cocktail_id } = body || {}
  if (!customer_name || !Number.isInteger(cocktail_id) || cocktail_id <= 0) {
    setResponseStatus(event, 400)
    return { error: 'Invalid request' }
  }
  const order = await OrderModel.create(String(customer_name), Number(cocktail_id))
  setResponseStatus(event, 201)
  return order
})