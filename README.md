# 🚀 Demo App — Built with Expo + Tailwind

This project is a mobile app built using **Expo** and **React Native**, designed as a technical demo for the hiring process at OdeCloud. It showcases a clean architecture, smooth user experience, and modern tooling focused on performance and maintainability.

---

## 🧱 Core Stack

### 🧭 Expo + React Native

We use **Expo** for its developer-friendly ecosystem and built-in support for native APIs, fast refresh, and easy deployment. The foundation is **React Native**, ensuring a seamless cross-platform experience.

### 🧑‍💻 Expo Router

Routing is handled using **expo-router**, which provides a file-based routing system similar to Next.js. It allows us to create nested layouts (auth, tabs, modals, etc.) in an organized and scalable way.

### 🎨 Tailwind CSS + NativeWind

The UI is styled with **Tailwind CSS** using **nativewind**, making it easy to apply consistent utility-first styles across native components without custom styling overhead.

### 📦 React Query

We use **@tanstack/react-query** for data fetching, caching, and syncing server state. This ensures efficient network usage and a responsive UI, e.g. when loading user data or chat messages.

### 🔐 Expo Secure Store

Sensitive data (like onboarding flags or tokens) is stored securely using `expo-secure-store`, which provides encrypted key-value storage on the device.

---

## 📚 Other Notable Libraries

- **Zod** – Schema validation and type-safe parsing, used mainly for forms and API responses.
- **Nanostores** – Lightweight global state management used for things like authentication state.
- **Axios** – Used for API requests. Includes a custom auth interceptor to handle token logic automatically.
- **Lucide-react-native** – Icon library with customizable and modern icons.
- **Class-variance-authority / clsx** – Utilities to dynamically build Tailwind class strings.
- **Tailwind Merge** – Prevents conflicting Tailwind classes in dynamically generated strings.
- **React Native Render HTML** – Used to safely render HTML content inside chat messages or other dynamic content blocks.
- **React Native Reanimated** – For performant animations and transitions throughout the UI.

---

## 🧩 UI Components with RN Primitives

We use the `@rn-primitives` (shadcn alternative for React Native) collection — such as `Dialog`, `Select`, `Menu`, `Switch`, etc. — to build accessible, reusable UI components with consistent behavior and styling across the app. These components save development time and improve UX consistency.

---

## 📁 Project Structure

```
.
├── app/                  # File-based navigation (expo-router)
├── assets/               # Images, fonts and static files
├── components/           # Shared UI components
├── hooks/                # Custom React hooks (e.g., useChats)
├── lib/                  # Auth and API logic
├── stores/               # Nanostores for global state
├── types/                # Types from business logic
├── tailwind.config.js    # Tailwind config + plugins
└── tsconfig.json         # TypeScript config
```

---

## ⚙️ Available Scripts

```bash
npm run start      # Start the Expo dev server
npm run android    # Run the app on Android with a dev build
npm run ios        # Run the app on iOS Device with a dev build
npm run web        # Run the app in the browser
npm run lint       # Lint code with ESLint + Prettier
npm run format     # Auto-format codebase
```

---

## ✅ What’s Ready

- ✅ Authentication + onboarding flows
- ✅ Chat system with list/detail views
- ✅ Responsive, accessible UI
- ✅ Axios with token-based auth
- ✅ State management with Nanostores
- ✅ Secure local storage
- ✅ Session and data management with React Query
- ✅ Dark mode support via color variables
- ✅ Clean and modular code structure

---

## 📲 Getting Started

1. Clone the repo
2. Run `npm install`
3. Start the project with `npm run start`
4. Open it using **Expo Go** or your preferred simulator

> Let me know if you need credentials or additional instructions to test specific flows.
