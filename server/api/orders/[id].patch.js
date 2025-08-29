// server/api/orders/[id].patch.js
import { OrderModel } from '../../models/orderModel.js'
const allowed = new Set(['PENDING', 'PREPARING', 'READY', 'PICKED_UP'])

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isInteger(id)) {
    setResponseStatus(event, 400)
    return { error: 'Invalid order id' }
  }
  const body = await readBody(event)
  const status = body && body.status
  if (!allowed.has(status)) {
    setResponseStatus(event, 400)
    return { error: 'Invalid status' }
  }
  const updated = await OrderModel.updateStatus(id, status)
  if (!updated) {
    setResponseStatus(event, 404)
    return { error: 'Order not found' }
  }
  return updated
})