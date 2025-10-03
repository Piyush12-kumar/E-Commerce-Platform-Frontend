# 🛍️ E-Commerce Frontend

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.x-61dafb.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

<div align="center">
  <img src="./public/vite.svg" alt="E-Commerce App Logo" width="120" />
  <p>A modern, responsive e-commerce platform built with React and Vite</p>
</div>

## ✨ Features

- **User Authentication** - Secure login and registration system
- **Product Management** - Browse, search, and filter products
- **Shopping Cart** - Add, remove, and update items in your cart
- **Order Processing** - Complete checkout and track order history
- **User Profiles** - Manage personal information and addresses
- **Admin Dashboard** - Comprehensive tools for store management
  - Product inventory management
  - Category management
  - User administration
  - Discount and promotion tools
  - Order oversight
- **Responsive Design** - Optimized for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm or yarn
- Backend API running on http://localhost:8080

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/my-ecommerce-app.git

# Navigate to the project directory
cd my-ecommerce-app

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
# Create a production build
npm run build

# Preview the production build locally
npm run preview
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.x
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Authentication**: JWT
- **Build Tool**: Vite
- **UI Components**: Custom components with CSS

## 📡 API Integration

The frontend connects to a RESTful API with the following endpoints:

- `/auth/*` - Authentication endpoints
- `/products/*` - Product management
- `/cart/*` - Shopping cart
- `/orders/*` - Order management
- `/admin/*` - Admin operations

## ✅ Project Status

- ✅ Frontend configuration complete
- ✅ Component structure established
- ✅ Redux state management implemented
- ✅ API integration
- ✅ Responsive design
- ✅ Error boundaries and handling
- ⚠️ Requires backend API for full functionality

## 🔍 Troubleshooting

If you experience issues:

1. **API Connection Errors**
   - Ensure backend server is running on port 8080
   - Check CORS configuration on the backend
   - Verify API endpoints are accessible

2. **Build Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete node_modules and reinstall: `rm -rf node_modules && npm install`

## 📚 Directory Structure

```
src/
├── api/          # API clients and configuration
├── components/   # UI components organized by feature
├── pages/        # Page components for routing
├── redux/        # Redux store and slices
└── utils/        # Helper functions and utilities
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Built with ❤️ using React and Vite</p>
</div>
