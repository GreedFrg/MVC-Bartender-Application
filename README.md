# Bartender Service — Dark Theme (Nuxt 4 + LowDB)

Dark-themed, no Tailwind. MVC-style server using LowDB (pure JS).

## Run
```bash
npm install
npm run dev
```

## Routes
- `/` — Home with Menu / Order / Order Queue buttons
- `/menu` — Patron selects cocktail & places order
- `/order` — Simple helper page linking to menu
- `/orderQueue` — Bartender views and updates order queue

## API
- `GET /api/menu` — list cocktails
- `GET /api/orders` — list orders
- `POST /api/orders` — create order `{ customer_name, cocktail_id }`
- `PATCH /api/orders/:id` — update status `{ status: 'PENDING'|'PREPARING'|'READY'|'PICKED_UP' }`
```