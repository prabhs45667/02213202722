# URL Shortener React App

Welcome to the URL Shortener web application! This project is a modern, user-friendly React app that allows you to shorten URLs, track analytics, and manage your links efficiently. Built with TypeScript and Material-UI, it offers a clean interface and useful features for both individual and bulk URL management.

## Features

- **Shorten URLs**: Instantly generate short links for any valid URL.
- **Bulk Import**: Add multiple URLs at once using the bulk import dialog.
- **Search & Filter**: Quickly find your links with a responsive search bar.
- **Statistics**: View total URLs, total clicks, and how many links you created today.
- **Analytics**: See details and analytics for each shortened URL.
- **Export**: Download your list of URLs as a JSON file for backup or sharing.
- **Persistent Storage**: All your data is saved in your browser's local storage.
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing.

## Tech Stack

- **React** with TypeScript
- **Material-UI (MUI)** for UI components
- **Context API** for state management
- **LocalStorage** for persistence
- **Jest & React Testing Library** for testing

## Getting Started

### Prerequisites
- Node.js (v16 or above recommended)
- npm

### Installation
1. Clone this repository or download the source code.
2. Open a terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
Start the development server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser to use the app.

### Building for Production
To create an optimized production build:
```bash
npm run build
```

### Running Tests
To run the test suite:
```bash
npm test
```

## Project Structure
- `src/components/common/` — Header, Footer, and Layout components
- `src/components/url-shortner/` — All URL shortener features (form, list, analytics, etc.)
- `src/context/` — App-wide context and types
- `src/types/` — TypeScript interfaces
- `public/` — Static assets and HTML

## Customization
- You can easily change the app branding by editing the `Header` and `Footer` components.
- The app is designed to be extended with backend integration if needed.




