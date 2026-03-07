# AI Interview Frontend

A modern React-based frontend for an AI-powered interview preparation platform. Built with React 19, Vite, and Tailwind CSS, featuring a sleek UI with shadcn/ui components.

## 🚀 Features

- **User Authentication** - Firebase-powered login and registration
- **Interactive Interview** - Voice-based AI interview sessions
- **Resume Upload** - PDF resume upload and AI analysis
- **Real-time Timer** - Countdown timer for interview questions
- **Speech Recognition** - Voice-to-text answer submission
- **Interview Reports** - Detailed AI-generated feedback and reports
- **Payment Integration** - Stripe checkout for purchasing credits
- **Interview History** - View past interview sessions and reports
- **Dashboard** - User dashboard with credits and statistics
- **Responsive Design** - Fully responsive across all devices

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v7
- **HTTP Client**: Axios
- **Authentication**: Firebase (Client SDK)
- **Database**: Firebase Firestore
- **Payments**: Stripe
- **Charts**: Recharts
- **Animations**: Motion (Framer Motion)
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **PDF Generation**: jsPDF
- **Speech Recognition**: react-speech-recognition

## 📁 Project Structure

```
Frontend/
├── index.html              # HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
├── jsconfig.json           # JavaScript configuration
├── public/                 # Static assets
│   └── vite.svg           # Favicon
└── src/
    ├── main.jsx            # React app entry
    ├── App.jsx             # Root component
    ├── App.css             # Global styles
    ├── index.css           # Tailwind imports
    ├── firebase.js         # Firebase configuration
    ├── API/
    │   ├── axios.js        # Axios instance
    │   ├── interview.js    # Interview API calls
    │   └── payment.js      # Payment API calls
    ├── Assets/
    │   └── video/          # AI avatar videos
    ├── Components/
    │   ├── ui/             # shadcn UI components
    │   │   ├── badge.jsx
    │   │   ├── button.jsx
    │   │   ├── card.jsx
    │   │   ├── progress.jsx
    │   │   └── spinner.jsx
    │   ├── Footer.jsx      # Footer component
    │   ├── Navbar.jsx      # Navigation bar
    │   ├── PageNotFound.jsx # 404 page
    │   ├── Step1Setup.jsx  # Interview setup step
    │   ├── Step2Interview.jsx # Interview session
    │   ├── Step3InterviewReport.jsx # Results
    │   └── Timer.jsx       # Countdown timer
    ├── Hooks/
    │   ├── analyzeResume.js   # Resume analysis hook
    │   ├── auth.hooks.js     # Authentication hooks
    │   ├── Interview.hooks.js # Interview hooks
    │   ├── Payment.hook.js    # Payment hooks
    │   ├── useCountdown.js   # Countdown logic
    │   ├── useMicrophone.js  # Microphone handling
    │   └── useVoiceAnswer.js # Voice answer processing
    ├── Lib/
    │   └── utils.js        # Utility functions
    ├── Pages/
    │   ├── Home.jsx        # Home/Dashboard
    │   ├── Login.jsx       # Login page
    │   ├── Register.jsx    # Registration page
    │   ├── InterviewPage.jsx # Main interview page
    │   ├── InterviewHistory.jsx # Past interviews
    │   ├── InterviewReport.jsx # Interview results
    │   ├── Pricing.jsx     # Pricing plans
    │   ├── PaymentSuccess.jsx # Payment success
    │   ├── PaymentCancel.jsx # Payment cancelled
    │   └── Dashboard.jsx   # User dashboard
    ├── Router/
    │   ├── AppRoutes.jsx   # Route definitions
    │   ├── ProtectedRoute.jsx # Auth guard
    │   └── PublicRoute.jsx # Public route guard
    └── Store/
        ├── store.js        # Redux store
        ├── rootReducer.js  # Combined reducers
        └── authSlice.js    # Auth state slice
```

## 🛤️ Application Flow

### Authentication Flow
```
Login/Register → Firebase Auth → JWT Token → Protected Routes
```

### Interview Flow
```
Dashboard → Upload Resume → AI Analysis → Generate Questions → 
Answer Questions (Voice) → Finish Interview → View Report
```

### Payment Flow
```
Pricing Page → Select Plan → Stripe Checkout → 
Success/Cancel → Credits Added
```

## 📱 Pages Overview

| Page | Route | Description | Access |
|------|-------|-------------|--------|
| Login | `/auth` | User login | Public |
| Register | `/register` | User registration | Public |
| Home | `/` | Dashboard with credits | Protected |
| Interview | `/interview` | Start new interview | Protected |
| Interview | `/interview/:id` | Continue interview | Protected |
| History | `/history` | Past interviews | Protected |
| Report | `/interviewReport/:id` | Interview results | Protected |
| Pricing | `/payment` | Purchase credits | Protected |
| Dashboard | `/dashboard` | User stats | Protected |
| Payment Success | `/payment-success` | Success callback | Protected |
| Payment Cancel | `/payment-cancel` | Cancel callback | Protected |

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the Frontend root:

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Firebase Setup
1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Google & Email/Password)
3. Create a web app and copy the config
4. Add the config to your `.env` file

### Stripe Setup
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable and secret keys
3. Add keys to environment variables

## 📦 Installation

1. **Navigate to Frontend directory:**
   ```bash
   cd Frontend
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

4. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will run on `http://localhost:5173`

## 🔧 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| dev | `npm run dev` | Start Vite dev server |
| build | `npm run build` | Build for production |
| lint | `npm run lint` | Run ESLint |
| preview | `npm run preview` | Preview production build |

## 🎨 UI Components

The frontend uses **shadcn/ui** components which include:
- **Button** - Primary, secondary, outline, ghost variants
- **Card** - Content container with header, content, footer
- **Badge** - Status indicators and labels
- **Progress** - Progress bar for interview timer
- **Spinner** - Loading indicator

## 🔌 API Integration

### Axios Instance
Pre-configured axios instance with:
- Base URL from environment
- Credentials (cookies) enabled
- Request/response interceptors

### Interview API
- `analyzeResume(file)` - Upload and analyze resume
- `generateQuestions(data)` - Get AI-generated questions
- `submitAnswer(data)` - Submit voice/text answer
- `finishInterview(id)` - Complete interview
- `getMyInterview()` - Fetch user's interviews
- `getInterviewReport(id)` - Get interview analysis
- `getSingleInterview(id)` - Get specific interview

### Payment API
- `createCheckoutSession(priceId)` - Create Stripe session
- `verifyPayment()` - Check payment status

## 🎯 Key Features Detail

### Voice Recognition
- Uses `react-speech-recognition` for voice input
- Real-time transcription during interview
- Support for multiple languages

### AI Avatar
- Animated AI interviewer using video assets
- Male and female avatar options
- Smooth transitions between questions

### Interview Timer
- Configurable time per question
- Visual countdown progress
- Auto-submit when time expires

### Resume Analysis
- PDF parsing with pdfjs-dist
- Skill extraction
- Experience summary
- AI-generated question relevance

### Report Generation
- Overall score calculation
- Question-by-question feedback
- Strengths and weaknesses
- Export to PDF with jsPDF

## 🚦 Routing

The app uses protected routes:
- **PublicRoute**: For unauthenticated users (Login, Register)
- **ProtectedRoute**: For authenticated users (Dashboard, Interview, etc.)

## 🏗️ State Management

Redux Toolkit handles:
- **Auth Slice**: User authentication state, credits, profile
- Combined via `rootReducer`

## 📄 License

MIT License

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

