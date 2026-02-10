# TrustVerify Frontend

This is the frontend application for TrustVerify, a comprehensive fraud prevention platform built with React, TypeScript, and modern web technologies.

## Features

- **React 18** with TypeScript for type-safe development
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for modern, responsive styling
- **Radix UI** components for accessible UI elements
- **TanStack Query** for efficient server state management
- **Wouter** for lightweight client-side routing
- **Framer Motion** for smooth animations
- **Stripe Integration** for secure payment processing

## Quick Start

### Prerequisites

- Node.js 18+
- Backend API server running on port 5000

### Environment Variables

Create a `.env` file with:

```bash
# Stripe Public Key (for payments)
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key

# Backend API URL
VITE_API_URL=http://localhost:5000

# Application Environment
VITE_APP_ENV=production
```

### Installation & Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   Navigate to `http://localhost:3000`

### Production Build

1. **Build for production:**
   ```bash
   npm run build
   ```

2. **Preview production build:**
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Radix UI component wrappers
│   ├── navigation.tsx  # Main navigation component
│   └── logo.tsx        # Brand logo component
├── pages/              # Application pages/routes
│   ├── pricing.tsx     # Consumer pricing page
│   ├── business.tsx    # Business solutions page
│   ├── dashboard.tsx   # User dashboard
│   └── ...
├── hooks/              # Custom React hooks
│   ├── use-auth.ts     # Authentication hook
│   └── use-toast.ts    # Toast notification hook
├── lib/                # Utility functions
│   ├── queryClient.ts  # TanStack Query configuration
│   └── utils.ts        # General utilities
├── assets/             # Static assets
└── index.css          # Global styles and Tailwind config
```

## Key Components

### Navigation System
- **Desktop Navigation**: Clean header with organized menu sections
- **Mobile Navigation**: Responsive hamburger menu with touch-friendly interface
- **Consumer Portal**: Easy access to consumer pricing and fraud protection

### Pages Overview

1. **Landing Page** (`/`) - Main homepage with platform overview
2. **Consumer Portal** (`/pricing`) - Individual fraud protection plans
3. **Business Solutions** (`/business`) - Enterprise fraud prevention
4. **Platform Demo** (`/demo`) - Interactive fraud detection demonstration
5. **Dashboard** (`/dashboard`) - User account management
6. **Developer Portal** (`/developers`) - API documentation and key management

### Pricing Structure

**Consumer Plans:**
- **Free**: Basic fraud alerts and 2 checks/month
- **Premium**: £9.99/month - Unlimited checks, dark web monitoring
- **Protect**: £14.99/month - Credit monitoring, advanced ID vault
- **Total**: £19.99/month - Fraud insurance, 24/7 concierge

**Business Plans:**
- **Essential**: £499/month - 50,000 API calls
- **Professional**: £999/month - 150,000 API calls  
- **Enterprise**: £1,999+/month - 500,000+ API calls

## Styling & Design

- **Color Scheme**: Deep Royal Blue (#003366) + Vibrant Teal (#00C2A8) + Alert Amber (#FFB400)
- **Typography**: Inter font family for professional appearance
- **Design Philosophy**: Trust-focused with "From Detection to Resolution" messaging
- **Responsive Design**: Mobile-first approach with touch-friendly interactions

## State Management

- **TanStack Query** for server state and caching
- **React Hook Form** for form state management
- **Local Storage** for user preferences and session persistence
- **Context API** for global UI state (themes, modals)

## Deployment Options

### Netlify/Vercel Deployment
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in dashboard

### Traditional Web Server
1. Build application: `npm run build`
2. Upload `dist/` contents to web server
3. Configure server to serve index.html for all routes

### Docker Deployment
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Performance Optimizations

- **Code Splitting**: Automatic route-based code splitting with Vite
- **Tree Shaking**: Dead code elimination for smaller bundles
- **Asset Optimization**: Image compression and lazy loading
- **Caching Strategy**: Efficient HTTP caching with service workers

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile**: iOS 14+, Android Chrome 88+
- **Progressive Enhancement**: Graceful degradation for older browsers

## Contributing

### Development Workflow
1. Create feature branch from `main`
2. Make changes with proper TypeScript typing
3. Test responsiveness across devices
4. Submit pull request with clear description

### Code Style
- **TypeScript**: Strict mode enabled with comprehensive typing
- **ESLint**: Configured for React and TypeScript best practices
- **Prettier**: Automatic code formatting on save
- **Component Structure**: Functional components with hooks

## Support & Documentation

- **User Guide**: https://docs.trustverify.io
- **Component Library**: https://ui.trustverify.io
- **Support**: support@trustverify.io
- **Status**: https://status.trustverify.io