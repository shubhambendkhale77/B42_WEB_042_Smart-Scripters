# Shop-Smart (A E-commerce Platform)

## Introduction
This project is a feature-rich multi-vendor e-commerce platform designed for seamless online shopping. It includes advanced features such as real-time tracking, gamification, AI-powered recommendations, and a mobile-first approach. The platform allows multiple vendors to list products, manage inventory, and track sales, while customers can browse, purchase, and review products with ease.

## Project Type
Frontend

## Deployed App
[https://deployed-site.frontend](https://deployed-site.frontend)  


## Directory Structure
```
Shop-Smart
├── .gitignore
├── eslint.config.js
├── folder_structure.txt
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
│
├── hooks
│   └── useLogout.jsx
│
├── public
│   └── vite.svg
│
└── src
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    │
    ├── assets
    │   ├── react.svg
    │   │
    │   ├── Auth
    │   │   ├── firebase.js
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   │
    │   └── Carousel
    │       ├── 1.jpg
    │       ├── 2.jpg
    │       ├── 3.jpg
    │       ├── 4.jpg
    │       ├── 5.jpg
    │       ├── 6.jpg
    │       └── 7.jpg
    │
    ├── components
    │   ├── BuyNowModal.jsx
    │   ├── Category.jsx
    │   ├── Footer.jsx
    │   ├── HeroSection.jsx
    │   ├── HomePageProductCard.jsx
    │   ├── Navbar.jsx
    │   ├── SearchBar.jsx
    │   ├── Testimonial.jsx
    │   ├── Track.jsx
    │   │
    │   ├── admin
    │   │   ├── OrderDetail.jsx
    │   │   ├── ProductDetail.jsx
    │   │   └── UserDetail.jsx
    │   │
    │   └── Home
    │       ├── Carousel.jsx
    │       ├── CategorySearch.jsx
    │       ├── Coupons.jsx
    │       ├── DealOfDay.jsx
    │       ├── FeaturedCategories.jsx
    │       ├── Features.jsx
    │       ├── PageProductCard.jsx
    │       └── Trending.jsx
    │
    ├── context
    │   └── useAuth.jsx
    │
    ├── pages
    │   ├── AddProductPage.jsx
    │   ├── AdminDashboard.jsx
    │   ├── CartPage.jsx
    │   ├── CategoryPage.jsx
    │   ├── Home.jsx
    │   ├── OrderTracker.jsx
    │   ├── Product.jsx
    │   ├── ProductInfo.jsx
    │   ├── UpdateProductPage.jsx
    │   ├── UserDashboard.jsx
    │   └── Wishlist.jsx
    │
    ├── Private
    │   └── PrivateRoute.jsx
    │
    ├── redux
    │   ├── CartSlice.jsx
    │   ├── store.jsx
    │   └── wishlistReducer.js
    │
    └── routers
        └── AppRoutes.jsx
```



## Video Walkthrough of the Project
[Link to project walkthrough video](#)

## Video Walkthrough of the Codebase
[Link to codebase walkthrough video](#)

## Features
- Multi-vendor product listing and management
- AI-powered product recommendations
- Real-time order tracking
- Gamification elements for enhanced user engagement
- Secure authentication and role-based access control
- Responsive, mobile-first UI

## Design Decisions or Assumptions
- Vendors have separate dashboards for managing their products.
- Customers can add multiple products from different vendors to a single cart.
- AI-driven recommendations personalize user experience.
- Real-time tracking is enabled using WebSockets.
- Payment gateway integration ensures secure transactions.

## Installation & Getting Started
Follow these steps to install and run the project locally.

```bash
# Clone the repository
git clone https://github.com/shubhambendkhale77/B42_WEB_042_Smart-Scripters

# Install dependencies
cd B42_WEB_042_Smart-Scripters
npm install

# Start frontend
npm run dev
```

## Credentials
Provide user credentials for authenticated pages.

```bash
Admin Login:
Email: admin@example.com
Password: admin123

Vendor Login:
Email: vendor@example.com
Password: vendor123

Customer Login:
Email: customer@example.com
Password: customer123
```

## APIs Used
-Used Firebase Firestore for Database

## Technology Stack
- **Frontend:** React.js, Tailwind CSS
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth

