# 🛒Shop-Smart🛍️ (A E-commerce Platform)

## Introduction 📍
This project is a feature-rich multi-vendor e-commerce platform designed for seamless online shopping. It includes advanced features such as real-time tracking, gamification, AI-powered recommendations, and a mobile-first approach. The platform allows multiple vendors to list products, manage inventory, and track sales, while customers can browse, purchase, and review products with ease.

## Project Type 👨‍💻
Frontend

## Deployed App 🌐
[https://shop-smart-blue.vercel.app/](https://shop-smart-blue.vercel.app/)  


## Directory Structure 📂
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



## Video Walkthrough of the Project 🎥
[Link to project walkthrough video](#)


## Features ⚙️
- Multi-vendor product listing and management
- AI-powered product recommendations
- Real-time order tracking
- Gamification elements for enhanced user engagement
- Secure authentication and role-based access control
- Responsive, mobile-first UI

## Design Decisions or Assumptions 💭
- Vendors have separate dashboards for managing their products.
- Customers can add multiple products from different vendors to a single cart.
- AI-driven recommendations personalize user experience.
- Real-time tracking is enabled using WebSockets.
- Payment gateway integration ensures secure transactions.

## Installation & Getting Started 💽
Follow these steps to install and run the project locally.

```bash
# Clone the repository
https://github.com/shubhambendkhale77/ShopSmart.git
# Install dependencies
cd ShopSmart
npm install

# Start frontend
npm run dev
```

## Credentials 🧔‍♂️
Provide user credentials for authenticated pages.

```bash
Admin Login:
Email: shubham@admin.com
Password: shubham123

Customer Login: {Customers can Register and Login}
Email: user@gmail.com
Password: Password@123

```

## APIs Used 🧩
-Used Firebase Firestore for Database

## Technology Stack 🛠️
- **Frontend:** React.js, Tailwind CSS, Redux 
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth

## Web-App Preview 🎨

### **Home Page**
![Home Page](https://i.ibb.co/gLzvBpj0/home.png)

### **Login Page**
![Login Page](https://i.ibb.co/fGQJr3T6/login.png)

### **Register Page**
![Register Page](https://i.ibb.co/NgsSTH61/register.png)

### **Admin Dashboard**
![Admin Dashboard](https://i.ibb.co/k234H1xD/admin-dash.png)

### **Add Product Page (Admin)**
![Add Product Page](https://i.ibb.co/Y4VgcrYY/add-product.png)

### **User Dashboard**
![User Dashboard](https://i.ibb.co/Kp8Rvn46/user-dash.png)

### **Product Page**
![Product Page](https://i.ibb.co/d8rT7Vx/product.png)

### **Wishlist Page**
![Wishlist Page](https://i.ibb.co/MxSZr59c/wishlist.png)

### **Cart Page**
![Cart Page](https://i.ibb.co/gL9ht08g/cart.png)

### **Shipping Details**
![Shipping Details](https://i.ibb.co/Fk7tnWgy/shipdetails.png)

### **Order Tracking**
![Tracking](https://i.ibb.co/1fPr9HVd/tracking.png)

### **Footer**
![Footer](https://i.ibb.co/B5fj9667/footer.png)
