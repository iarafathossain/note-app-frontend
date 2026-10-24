import { AuthCard } from "../_components/auth-card";
import { LoginForm } from "./_components/login-form";

export default function LoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
      <AuthCard
        title="Welcome back"
        description="Log in to continue to your notes."
        footerText="New to Note App?"
        footerHref="/register"
        footerLabel="Create an account"
      >
        <LoginForm />
      </AuthCard>
    </main>
  );
}
