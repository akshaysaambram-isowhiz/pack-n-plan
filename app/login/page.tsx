import { LoginForm } from "@/components/forms/login-form";
import { PageTransition } from "@/components/page-transition";

export default function LoginPage() {
  return (
    <PageTransition>
      <div className="container mx-auto max-w-md py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>
        <LoginForm />
      </div>
    </PageTransition>
  );
}
