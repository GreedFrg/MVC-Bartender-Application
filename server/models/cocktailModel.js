// server/models/cocktailModel.js
import getDb from '../utils/db.js'

export const CocktailModel = {
  async all() {
    const db = await getDb()
    return db.data.cocktails.slice().sort((a, b) => a.name.localeCompare(b.name))
  },
  async find(id) {
    const db = await getDb()
    return db.data.cocktails.find(c => c.id === id)
  }
}