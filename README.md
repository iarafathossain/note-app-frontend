# Note App Frontend

Next.js frontend for the Note App.

**Live app:** https://note-app-job-task.iarafathossain.me

## Tech stack

- Next.js 16 with TypeScript
- React 19
- Tailwind CSS and shadcn/ui
- React Hook Form and Zod

## Local development

```bash
git clone https://github.com/iarafathossain/note-app-frontend.git
cd note-app-frontend
yarn install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
```

Start the development server:

```bash
yarn dev
```

Open http://localhost:3000.

## Scripts

```bash
yarn dev       # Start development server
yarn build     # Create production build
yarn start     # Serve production build
yarn lint      # Run ESLint
```

## Architecture and security

- Route groups and nested routes organize navigation.
- Reusable components provide the UI structure.
- Authentication cookies (`access_token` and `refresh_token`) are set by the backend; the frontend does not treat client-provided auth state as trusted.
