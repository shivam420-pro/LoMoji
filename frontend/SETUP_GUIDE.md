# 🚀 LoMoji Application Setup Guide

## 📋 Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- Git

## 🔧 Initial Setup

### 1. Fix PowerShell Execution Policy (Windows Only)
Open PowerShell as Administrator and run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Verify Installation
```bash
npm list vite
```

## 🏃‍♂️ Running the Application

### Frontend (React/Vite)
```bash
# Development mode
npm run dev
# or
npm start

# Production build
npm run build

# Preview production build
npm run preview
```

### Backend (Node.js/Express)
```bash
# Start the backend server
npm run server
# or
node server.js
```

## 🌐 Access URLs
- **Frontend**: http://localhost:4028
- **Backend API**: http://localhost:5000

## 📁 Project Structure
```
/
├── server.js              # Backend server (Express + MongoDB)
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── src/                   # React frontend source
│   ├── components/        # Reusable UI components
│   ├── pages/            # Page components
│   ├── styles/           # CSS files
│   └── main.jsx          # App entry point
└── public/               # Static assets
```

## 🔧 Troubleshooting

### If Vite is not recognized:
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install`
4. Try `npm run dev`

### If PowerShell blocks npm:
1. Run PowerShell as Administrator
2. Execute: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
3. Try npm commands again

### If port 4028 is in use:
1. Check what's running on port 4028: `netstat -ano | findstr :4028`
2. Kill the process or change port in `vite.config.js`

## 📝 Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start backend server
- `npm run format` - Format code with Prettier

## 🎯 Quick Start
1. Run `npm install`
2. Open two terminal windows
3. In first terminal: `npm run server` (backend)
4. In second terminal: `npm run dev` (frontend)
5. Open http://localhost:4028 in browser

## 🔗 API Endpoints
- `POST /api/users` - User signup (saves to MongoDB)

## 📦 Dependencies
- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Express, Mongoose, CORS
- **Database**: MongoDB Atlas 