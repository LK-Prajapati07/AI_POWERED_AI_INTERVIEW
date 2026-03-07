# AI Interview Backend

A powerful Node.js/Express backend for an AI-powered interview preparation platform. This backend handles authentication, interview management, AI-powered resume analysis, and payment processing.

## 🚀 Features

- **Firebase Authentication** - Secure user authentication via Firebase
- **AI-Powered Interview** - Generate interview questions using OpenRouter AI
- **Resume Analysis** - Parse and analyze resumes (PDF) using pdfjs-dist
- **Voice Answer Processing** - Handle voice-based interview responses
- **Payment Integration** - Stripe-powered payment processing
- **MongoDB Database** - Robust data persistence with Mongoose ODM
- **JWT Tokens** - Secure session management with JSON Web Tokens
- **RESTful API** - Clean, well-structured REST endpoints

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: Firebase Admin
- **AI Integration**: OpenRouter SDK
- **Payments**: Stripe
- **File Upload**: Multer
- **PDF Processing**: pdfjs-dist
- **Utilities**: Axios, Cookie Parser, CORS, Dotenv

## 📁 Project Structure

```
Backend/
├── app.js                  # Main Express application entry point
├── package.json            # Dependencies and scripts
├── .env                    # Environment variables (not tracked)
├── Public/                 # Static files directory
├── src/
│   ├── config/
│   │   ├── DB.js           # MongoDB connection
│   │   ├── env.js          # Environment configuration
│   │   ├── firebaseAdmin.js# Firebase Admin initialization
│   │   └── token.js        # JWT token utilities
│   ├── controller/
│   │   ├── auth.controller.js    # Authentication logic
│   │   ├── interview.controller.js# Interview & AI logic
│   │   └── payment.controller.js  # Payment processing
│   ├── middleware/
│   │   ├── auth.middleware.js    # JWT verification
│   │   └── multer.js        # File upload configuration
│   ├── model/
│   │   ├── interview.model.js    # Interview schema
│   │   ├── payment.model.js      # Payment schema
│   │   └── user.model.js         # User schema
│   ├── routes/
│   │   ├── auth.route.js         # Auth API routes
│   │   ├── interview.route.js    # Interview API routes
│   │   └── payment.route.js      # Payment API routes
│   ├── Services/
│   │   └── openRouter.service.js # OpenRouter AI service
│   └── ai-interview-57aa6-firebase-adminsdk-fbsvc-29f31a4060.json # Firebase Admin credentials
```

## � API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/firebase-login` | Login with Firebase token | ❌ |
| POST | `/logout` | Logout user | ✅ |
| GET | `/me` | Get current user info | ✅ |
| GET | `/protected` | Protected route test | ✅ |

### Interview Routes (`/api/interview`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/resume` | Upload & analyze resume | ✅ |
| POST | `/generate-question` | Generate AI interview questions | ✅ |
| POST | `/submit-answer` | Submit answer to question | ✅ |
| POST | `/finish-interview` | Complete interview session | ✅ |
| GET | `/get-interview` | Get all user's interviews | ✅ |
| GET | `/report/:id` | Get interview report | ✅ |
| GET | `/:id` | Get single interview details | ✅ |

### Payment Routes (`/api/payment`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/create-checkout` | Create Stripe checkout session | ✅ |
| GET | `/verify-payment` | Verify payment status | ✅ |

## ⚙️ Environment Variables

Create a `.env` file in the Backend root directory:

```env
# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:5173

# MongoDB
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_jwt_secret_key

# Firebase
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email

# OpenRouter AI
OPENROUTER_API_KEY=your_openrouter_api_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 📦 Installation

1. **Navigate to Backend directory:**
   ```bash
   cd Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   # Fill in your environment variables
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:5000`

## 🔧 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| dev | `npm run dev` | Start development server with nodemon |
| test | `npm test` | Run tests (not configured) |

## 🔐 Authentication Flow

1. User authenticates with Firebase on frontend
2. Frontend sends Firebase token to `/api/auth/firebase-login`
3. Backend verifies token and generates JWT
4. JWT is sent as HTTP-only cookie
5. Subsequent requests include JWT for authentication
6. `auth.middleware.js` verifies JWT on protected routes

## 🤖 AI Integration

The backend uses **OpenRouter** to connect with various AI models for:
- **Resume Analysis**: Extracting skills, experience, and qualifications from uploaded PDFs
- **Question Generation**: Creating relevant interview questions based on job role and resume
- **Answer Evaluation**: Analyzing candidate responses and providing feedback

## 💳 Payment Flow

1. User selects pricing plan on frontend
2. Frontend calls `/api/payment/create-checkout`
3. Backend creates Stripe Checkout Session
4. User redirected to Stripe checkout
5. On success, user redirected to `/payment-success`
6. Payment verified via `/api/payment/verify-payment`

## 🏗️ Models

### User Model
- `firebaseUid`: Firebase user ID
- `email`: User email
- `name`: User display name
- `photoURL`: Profile photo URL
- `credits`: Available interview credits

### Interview Model
- `user`: Reference to User
- `jobRole`: Target job position
- `experience`: Years of experience
- `questions`: Array of interview questions
- `answers`: Candidate responses
- `resumeData`: Analyzed resume information
- `status`: Interview status (in-progress, completed)
- `report`: AI-generated feedback

### Payment Model
- `user`: Reference to User
- `stripeSessionId`: Stripe session ID
- `amount`: Payment amount
- `credits`: Credits purchased
- `status`: Payment status

## 📝 License

ISC License

## 👤 Author

Lalit Prajapati

