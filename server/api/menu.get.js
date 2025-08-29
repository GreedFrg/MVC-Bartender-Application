// server/api/menu.get.js
import { CocktailModel } from '../models/cocktailModel.js'
export default defineEventHandler(async () => {
  return await CocktailModel.all()
})