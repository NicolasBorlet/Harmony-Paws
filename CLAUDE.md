# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Development Commands

### Core Development

- `npm start` or `npx expo start` - Start Expo development server
- `npm run android` - Run on Android emulator/device
- `npm run ios` - Run on iOS simulator/device
- `npm run rid` - Run on iOS physical device
- `npm run rad` - Run on Android physical device

### Code Quality & Testing

- `npm run lint` - Run ESLint on codebase
- `npm run format` - Format code with Prettier
- `npm run check` - Check code formatting
- `npm test` - Run Jest tests with watch mode
- `npm run test-final` - Run Jest tests once
- `npm run test-debug` - Run tests for changed files only

### Build & Deploy

- `npm run prebuild:ios` - Generate native iOS code
- `npm run prebuild:android` - Generate native Android code

### E2E Testing

- `npm run maestro:all` - Run all Maestro tests
- `npm run maestro:essential` - Run critical Maestro test flows
- `npm run maestro:flow` - Run specific Maestro test

## Architecture Overview

### Tech Stack

- **Framework**: Expo SDK 53 + React Native 0.79.4
- **Navigation**: Expo Router v5 (file-based routing)
- **State Management**: Legend State observables (beta) + TanStack Query v5
- **Database**: Supabase with real-time sync
- **UI/Styling**: Styled Components + custom component library
- **Animations**: React Native Reanimated v3
- **Language**: TypeScript in strict mode

### File-Based Routing Structure

```
app/
├── (auth)/           # Authenticated routes group
│   ├── (tabs)/       # Main tab navigation
│   │   ├── (home)/   # Home tab screens
│   │   ├── (medical)/ # Medical records
│   │   ├── (formation)/ # Training content
│   │   └── (account)/ # User account
│   ├── dog/          # Dog management
│   ├── messages/     # Chat system
│   ├── ride/         # Social walks/rides
│   └── onboarding/   # User onboarding
├── login.tsx         # Auth screens
├── signup.tsx
└── ctx.tsx          # Session/Auth context provider
```

### State Management Pattern

- **Legend State observables** for local state with MMKV persistence
- **TanStack Query** for server state management
- **Supabase real-time** for live data sync
- Key observables: `session$`, `user$`, `dogs$`, `filter$`, `tab$`

### Component Architecture

- **Custom UI library** in `components/ui/` (Button, Text, Block, etc.)
- **Feature-specific components** in `components/[feature]/`
- **Styled Components** for styling with theme support
- **Reanimated animations** throughout the UI

### API & Database

- **Supabase client** configured in `lib/supabase.ts`
- **API functions** in `lib/api/` with TypeScript types
- **Row Level Security (RLS)** enabled on database
- **Real-time subscriptions** for live updates

### Authentication

- **Supabase Auth** with email/password
- **LargeSecureStore** class for tokens > 2048 bytes (AES-256 encryption)
- **Session persistence** with MMKV + SecureStore
- **Onboarding flow** tracking with local storage

### Internationalization

- **i18n-js** with French/English support
- **Automatic locale detection** via Expo Localization
- **Translation files** in `lib/utils/locales/`

## Development Guidelines

### Code Patterns

- Use functional components with hooks
- Leverage Legend State observables for reactive state
- Implement TypeScript strict mode throughout
- Follow Expo SDK patterns and APIs
- Use custom UI components from `components/ui/`

### Performance Optimizations

- Use `@shopify/flash-list` instead of FlatList for large lists
- Implement React.memo for expensive components
- Utilize Legend State's fine-grained reactivity
- Leverage Expo's asset optimization system

### Testing Strategy

- **Unit tests**: Jest + React Native Testing Library
- **E2E tests**: Maestro for critical user flows
- **Test utilities**: Custom testing helpers in test files
- Run tests before commits via Husky pre-commit hooks

### Current Features Being Developed

- **Medical records system** with callback reminders
- **Social rides/walks** organization
- **Real-time messaging** between users
- **Training/formation modules**
- **Interactive maps** with dog-friendly locations

### Key Dependencies to Know

- `@legendapp/state` (beta) - Observable state management with MMKV persistence
- `@tanstack/react-query` - Server state management
- `@supabase/supabase-js` - Database and auth
- `expo-router` - File-based navigation
- `react-native-reanimated` - Performant animations
- `styled-components` - Component styling
- `@shopify/flash-list` - Optimized lists
- `react-native-maps` - Map integration
- `react-native-gifted-chat` - Chat UI
- `@gorhom/bottom-sheet` - Bottom sheet modals
- `drizzle-orm` - TypeScript ORM for database queries
- `react-native-mmkv` - High-performance key-value storage

### Environment Setup

- Use Expo Dev Client for development builds
- Configure Supabase environment variables
- Set up proper TypeScript paths in `tsconfig.json`
- Ensure MMKV and SecureStore are properly configured for state persistence

## Important Architectural Patterns

### Observable State Management

```typescript
// Example pattern for synced observables
export const user$ = observable(
  syncedSupabase<typeof supabase, UserRow>({
    supabase,
    collection: 'users',
    persist: { plugin: ObservablePersistMMKV, name: 'user' },
    // Real-time sync configuration
  }),
)
```

### Secure Storage Pattern

- Use `LargeSecureStore` class for tokens > 2048 bytes (implements AES-256
  encryption)
- Use `expo-secure-store` directly for smaller sensitive data
- MMKV for non-sensitive persistent data with better performance

### Component Organization

- **UI Components**: `components/ui/` - Reusable styled components (Button,
  Text, Block)
- **Feature Components**: `components/[feature]/` - Domain-specific components
- **Animations**: `components/animate/` - Custom animation components
- **Skeletons**: `components/skeletons/` - Loading state components

### Testing Commands

- `npm run test-watch` - Watch tests for changed files only
- `npm run updateSnapshots` - Update Jest snapshots
- `npm run maestro:essential` - Run critical E2E test flows
