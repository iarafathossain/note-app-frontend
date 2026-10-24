import { AuthCard } from "../_components/auth-card";
import { RegisterForm } from "./_components/register-form";

export default function RegisterPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
      <AuthCard
        title="Create your account"
        description="Start organizing your thoughts with Note App."
        footerText="Already have an account?"
        footerHref="/login"
        footerLabel="Log in"
      >
        <RegisterForm />
      </AuthCard>
    </main>
  );
}
