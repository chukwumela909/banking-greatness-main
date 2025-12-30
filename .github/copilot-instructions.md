# Copilot Instructions for Capital Nexus Banking App

## Architecture Overview

This is a **Next.js 14 App Router** banking application with:
- **Frontend**: React with Tailwind CSS, shadcn/ui components, Framer Motion animations
- **Backend**: Server Actions via `next-safe-action`, MongoDB with Mongoose
- **State**: React Context for forms, TanStack Query for server state

### Key Data Flow
```
Client Component → useAction() hook → Server Action (actionClient) → MongoDB → revalidatePath()
                 ↘ useFetchInfo() → TanStack Query → fetchDetails() server function
```

## Project Structure Conventions

### Server Actions Pattern
All server mutations use `next-safe-action` with Zod schemas:
```typescript
// server/actions/*.ts or server/dashboard/*.ts
"use server";
import { actionClient } from "@/lib/safeActionClient";
import { z } from "zod";

const schema = z.object({ /* validation */ });
export const myAction = actionClient.schema(schema).action(async ({ parsedInput }) => {
  await dbConnect();
  // ... mutation logic
  revalidatePath("/");
  return { success: true };
});
```

### Database Connection
Always call `dbConnect()` from `server/index.tsx` before any MongoDB operation. The connection is cached globally.

### Authentication via Cookies
User state stored in cookies: `userEmail`, `verified`, `paid`, `role`. Access with `cookies().get()` in server actions. Middleware at [middleware.ts](middleware.ts) handles route protection.

## Component Patterns

### UI Components
Located in `components/ui/` - use shadcn/ui conventions with `cn()` utility from `lib/utils.ts`:
```typescript
import { cn } from "@/lib/utils";
<div className={cn("base-class", conditional && "optional-class")} />
```

### Client Data Fetching
Use the custom hook pattern from [lib/data/fetchPost.tsx](lib/data/fetchPost.tsx):
```typescript
const { data: deets } = useFetchInfo();  // Fetches current user
const userData = deets?.data;
```

### Form Context
Multi-step forms use context providers:
- `useSignUpContext()` for signup flow
- `useLoginContext()` for login flow

## User Schema Reference
The `IUser` interface in [server/userSchema.tsx](server/userSchema.tsx) defines:
- Banking: `accountBalance`, `cardBalance`, `fixedBalance`, `bankAccountNumber`, `bankRoutingNumber`
- History: `transferHistory[]`, `depositHistory[]`, `fixedHistory[]`
- Status: `codeVerification`, `paymentVerification`, `accountVerified`
- Roles: `role` ("user" | "admin")

## Admin vs User Routes
- `/dashboard/*` - User-facing features, protected by email cookie
- `/admin/*` - Admin panel, requires `role === "admin"` cookie
- Admin actions in `server/admin/` for user management

## Development Commands
```bash
npm run dev    # Start dev server on localhost:3000
npm run build  # Production build
npm run lint   # ESLint check
```

## Environment Variables Required
- `CONNECTIONSTRING` - MongoDB connection URI
- `ENCRYPTION_KEY` - Base64 AES key for sensitive data
- `COOKIE_SECRET` - Base64 key for cookie signing

## Key Files for Understanding Features
- [server/actions/createUser.ts](server/actions/createUser.ts) - User registration flow
- [server/dashboard/transferAction.ts](server/dashboard/transferAction.ts) - Transaction pattern
- [app/dashboard/layout.tsx](app/dashboard/layout.tsx) - Query prefetching with HydrationBoundary
- [middleware.ts](middleware.ts) - Route protection logic
