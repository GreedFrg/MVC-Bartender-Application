// server/models/orderModel.js
import getDb from '../utils/db.js'
import { CocktailModel } from './cocktailModel.js'

export const OrderModel = {
  async create(customer_name, cocktail_id) {
    const db = await getDb()
    const id = ++db.data.lastIds.orders
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const order = { id, customer_name, cocktail_id, status: 'PENDING', created_at: now, updated_at: now }
    db.data.orders.unshift(order)
    await db.write()
    return this.find(id)
  },
  async updateStatus(id, status) {
    const db = await getDb()
    const o = db.data.orders.find(o => o.id === id)
    if (!o) return undefined
    o.status = status
    o.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
    await db.write()
    return this.find(id)
  },
  async all() {
    const db = await getDb()
    const orders = db.data.orders.slice()
    return Promise.all(orders.map(async o => ({ ...o, cocktail: await CocktailModel.find(o.cocktail_id) })))
  },
  async find(id) {
    const db = await getDb()
    const o = db.data.orders.find(o => o.id === id)
    if (!o) return undefined
    return { ...o, cocktail: await CocktailModel.find(o.cocktail_id) }
  }
}