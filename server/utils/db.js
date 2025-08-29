// server/utils/db.js — LowDB (pure JS)
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { join } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'

const dataDir = join(process.cwd(), 'server', 'data')
if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true })
const file = join(dataDir, 'db.json')

const defaults = {
  cocktails: [],
  orders: [],
  lastIds: { cocktails: 0, orders: 0 }
}

let dbPromise = null

async function init() {
  const adapter = new JSONFile(file)
  const db = new Low(adapter, defaults)
  await db.read()
  if (!db.data) db.data = structuredClone(defaults)

  // seed cocktails once
  if (!db.data.cocktails.length) {
    db.data.cocktails = [
      { id: 1, name: 'Margarita', price: 10.0, description: 'Tequila, lime, triple sec' },
      { id: 2, name: 'Old Fashioned', price: 12.0, description: 'Bourbon, bitters, sugar' },
      { id: 3, name: 'Mojito', price: 9.0, description: 'Rum, mint, lime, soda' },
      { id: 4, name: 'Cosmopolitan', price: 11.0, description: 'Vodka, cranberry, triple sec, lime' }
    ]
    db.data.lastIds = { cocktails: 4, orders: 0 }
    await db.write()
  }
  return db
}

export default async function getDb() {
  if (!dbPromise) dbPromise = init()
  return dbPromise
}