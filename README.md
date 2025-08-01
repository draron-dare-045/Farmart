## Farmart

Farmart is an e-commerce platform designed to connect farmers directly with buyers, eliminating middlemen to ensure farmers maximize their profits. This application allows farmers to list and manage farm animals for sale, while users can browse, search, filter, and purchase animals seamlessly.
Table of Contents



## Features

**Farmer Dashboard**: Farmers can register/login, add/edit animals for sale, and confirm/reject orders.
**User Marketplace**: Users can register/login, browse animals, search by type/breed, filter by breed/age, add to cart, and checkout.
**Mobile-Friendly**: Responsive design for seamless use on desktops and mobile devices.
**Secure Authentication**: Role-based access for farmers and users/buyers.
**State Management**: Efficient state handling using Redux Toolkit.

## Farmer

-Register and log in to manage their farm.
-Add new animals for sale with details (type, breed, age, price, image).
-Update or edit existing animal listings.
-Confirm or reject purchase orders from users.

## Buyer

-Register and log in to browse the marketplace.
-View all available animals.
-Search animals by type and breed.
-Filter animals by breed and age.
-Add animals to a cart.
-Checkout and pay for items in the cart.

## Tech Stack

**Frontend**: ReactJS, Redux Toolkit (state management), Tailwind CSS (styling)
**Backend**: Django
**Database**: PostgreSQL
**Testing**: Jest (frontend), Minitest (backend)
**Wireframes**: Designed in Figma for mobile-friendly layouts
**Progressive Web Application**: Designed to be used by the Farmer and the buyer while still offline.

## Setup Instructions

## Frontend Setup

**Clone the repository**:git clone https://github.com/draron-dare-045/Farmart.git
```
cd Farmart
```

**Install dependencies**:npm install


**Start the development server**:npm start
```
npm run dev
```

The app will run at http://localhost:5173.

## Backend Setup

**Navigate to the backend repository**:git clone https://github.com/draron-dare-045/Farmart-Backend.git
```
cd Farmart-Backend
```

**Create a virtual environment and install dependencies**:python -m venv venv

**Activate the Virtual Enviroment**: source venv/bin/activate

**Set up PostgreSQL**:
```
Create a database named farmart.

Update farmart_project/settings.py with your database credentials.

Run migrations:python manage.py migrate

Start the backend server:python manage.py runserver

The API will run at http://localhost:5000.
```
## Environment Variables

**Frontend**: Create a .env file in the Farmart root with:REACT_APP_API_URL=http://localhost:5000

**Backend**: Configure database settings in farmart_project/settings.py.


## Access the App:
**Frontend**: Open http://localhost:3000 for the React app.
**Backend**: Access API endpoints at http://localhost:5000/api (e.g., /api/animals, /api/auth/login).


**Farmer**:
Register/login at /register or /login.
Navigate to /farmer/dashboard to add/edit animals or manage orders.


**User**:
Register/login at /register or /login.
Browse animals at /animals, use search/filter, add to cart, and checkout at /checkout.


## Contributing

5.1: Fork the repository.
**Create a feature branch**:git checkout -b feature/your-feature


**Commit your changes**:git commit -m "Add your feature"


**Push to your branch**:git push origin feature/your-feature
```
Create a pull request to the main branch on https://github.com/draron-dare-045/Farmart.
```
Note: Ensure your commits use an email linked to your GitHub account to appear as a contributor:
git config --global user.email "your.github.email@example.com"

## License

This project is licensed under the [MIT License](./LICENSE).

