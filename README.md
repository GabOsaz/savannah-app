# Savannah Interview App

A React-based user management application built with TypeScript, Vite, and Tailwind CSS.

- **Live link**: https://savannah-app-theta.vercel.app/

## Features

- **User List**: Browse and search through users with pagination
- **User Details**: View individual user profiles with their posts
- **Post Management**: Create and delete posts for each user
- **Search**: Real-time search functionality for users
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Routing**: React Router
- **Database**: SQL.js (in-browser SQLite)

## Getting Started

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Testing
```bash
npm test
npm run test:watch
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components and logic
├── hooks/              # Custom React hooks
├── __TEST__/           # Test files
└── setupTests.ts       # Test configuration
```

The app provides a complete user management interface with modern React patterns and comprehensive testing coverage.
