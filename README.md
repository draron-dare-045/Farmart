Farmart Frontend Application
This is the official frontend for Farmart, a modern, Amazon-style e-commerce platform connecting farmers directly with buyers. Built with React and styled with Tailwind CSS, this application provides two distinct user portals: a feature-rich shopping experience for buyers and a comprehensive management dashboard for farmers.

✨ Key Features
Dual User Portals:

Buyer Portal (/): An intuitive e-commerce interface for Browse livestock, adding items to a cart, and making purchases.

Seller Central (/seller): A dedicated dashboard for farmers to manage their listings, track stock, and view incoming orders.

URL-Based Routing: Clean, intuitive navigation that uses the browser's URL to determine the current view, providing a seamless Single Page Application (SPA) experience.

Robust Authentication: Secure user registration and login flows tailored to each user role (Buyer or Farmer).

Dynamic Shopping Cart: A fully functional shopping cart with the ability to add/remove items and view a summary before checkout.

Stock & Image Management: Farmers can upload images for their listings and set stock quantities. The frontend prevents over-buying and clearly displays stock levels to customers.

Order & Payment Flow: Buyers can view their order history, and the application integrates with the backend to handle the M-Pesa payment process.

Responsive Design: A mobile-first design built with Tailwind CSS ensures the application looks and works great on all devices, from phones to desktops.

Contact Form: An integrated contact page using EmailJS to allow users to send messages directly.

🛠️ Technologies Used
Core: React, Vite

Styling: Tailwind CSS

State Management: React Context API (for Auth and Cart)

Client-side Routing: Custom logic using the browser's History API.

Email Service: EmailJS for the contact form.

📂 Project Structure
The project follows a professional and scalable feature-sliced folder structure.

src/
├── api/          # Centralized API client for backend communication.
├── components/   # Reusable UI components (Buttons, Modals, etc.).
│   ├── buyer/
│   ├── common/
│   ├── farmer/
│   └── layout/
├── context/      # Global state providers (AuthContext, CartContext).
├── hooks/        # Custom React hooks (e.g., useAuth).
├── pages/        # Top-level components for each route/page.
│   ├── buyer/
│   ├── farmer/
│   └── shared/
├── App.jsx       # Main application component with routing logic.
└── index.js      # Main entry point of the application.

🚀 Setup and Local Installation
Follow these steps to get the project running on your local machine.

1. Prerequisites
Node.js (v16 or later)

npm or yarn

2. Clone the Repository
git clone <your-frontend-repository-url>
cd <your-frontend-project-name>

3. Install Dependencies
npm install
# or
yarn install

4. Configure Environment Variables
Create a .env file in the root of the project. This file will hold the URL of your backend server.

.env

# URL of your running Django backend server
# For local development:
VITE_API_URL=http://127.0.0.1:8000

5. Run the Development Server
Make sure your backend server is running first. Then, start the React development server.

npm run dev
# or
yarn dev

The frontend will now be running at http://localhost:5173/.

📦 Deployment
This application can be easily deployed to static hosting platforms like Vercel or Netlify.

Build the Project: Run npm run build to create a production-ready dist folder.

Configure Hosting: Connect your hosting provider to your GitHub repository.

Set Environment Variables: In your hosting provider's dashboard, set the VITE_API_URL environment variable to the live URL of your deployed backend (e.g., https://farmart-backend.onrender.com).

Deploy: The platform will automatically build and deploy your site.
