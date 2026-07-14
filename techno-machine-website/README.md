# Techno Machine Website

## Project overview
This repository contains a production-ready full-stack rebuild of the Techno Machine industrial machinery import/export website.

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Data storage:** JSON files (`backend/data/products.json`, `backend/data/contacts.json`)
- **Bilingual support:** Arabic/English with full RTL/LTR direction switching

---

## Local setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs the React app in development mode.

### Backend
```bash
cd backend
npm install
npm start
```
Starts the API server.

---

## Environment variables

### Frontend (`frontend/.env`)
Use `frontend/.env.example` as a template:

- `VITE_API_BASE_URL`: Backend base URL in development (default example: `http://localhost:5000`)

### Backend (`backend/.env`)
Use `backend/.env.example` as a template:

- `PORT`: Port for Express server (example: `5000`)
- `ADMIN_KEY`: Required key for protected `GET /api/contact` endpoint

---

## Production build and serve flow

1. Build the frontend:
```bash
cd frontend
npm install
npm run build
```
2. Install backend dependencies and run server:
```bash
cd ../backend
npm install --production
npm start
```
3. In production, Express serves static files from `frontend/dist` automatically.

---

## Deployment steps (real hosting)

1. Upload project files to your Node.js hosting/server.
2. Create `backend/.env` with real `PORT` and strong `ADMIN_KEY`.
3. Build frontend on server (or upload prebuilt `frontend/dist`):
   - `cd frontend && npm install && npm run build`
4. Install backend runtime dependencies:
   - `cd ../backend && npm install --production`
5. Keep Node process alive using PM2:
   - `pm2 start server.js --name techno-machine-api`
   - `pm2 save`
   - `pm2 startup`
6. Point custom domain DNS to your server/IP.
7. Configure reverse proxy (Nginx/Apache) to forward traffic to backend port.
8. Enable SSL with Let’s Encrypt (Certbot) or your hosting provider’s SSL manager.

---

## Client handoff customization checklist

Before handoff to the client, replace these placeholders:

- [ ] Add real machine/factory photos into `frontend/public/assets/images/`
- [ ] Replace placeholder contact details (phone/email/address) across UI
- [ ] Replace placeholder Google Maps location with the real business map link
- [ ] Connect contact form to a real email/notification service (e.g., Nodemailer) instead of JSON-only storage
