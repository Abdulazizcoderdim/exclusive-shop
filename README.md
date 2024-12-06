# Exclusive Shop

## Project Overview
An E-commerce platform built with modern web technologies, featuring real-time updates and interactive shopping experience.

## Project Structure

### Backend
The backend is built using Node.js and Express.js, providing RESTful APIs for the e-commerce platform.

Key Features:
- User authentication and authorization
- Product management
- Order processing
- Payment integration
- Database operations

### Frontend
The frontend is developed using React.js, offering a responsive and intuitive user interface.

Key Features:
- Responsive design
- Product catalog
- Shopping cart
- User profile management
- Order tracking
- Real-time updates

### Socket Implementation
Real-time communication is handled through WebSocket, enabling live updates and notifications.

Features:
- Live product updates
- Real-time order status
- Instant notifications
- Chat support system

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd exclusive-shop
```

2. Backend Setup
```bash
cd backend
npm install
npm run dev
```

3. Frontend Setup
```bash
cd frontend
npm install
npm start
```

4. Socket Server Setup
```bash
cd socket
npm install
npm start
```

## Environment Variables
Create `.env` files in respective directories:

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=ws://localhost:8900
```

### Socket (.env)
```
PORT=8900
```

## API Documentation
API documentation is available at `/api/docs` when running the backend server.

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
