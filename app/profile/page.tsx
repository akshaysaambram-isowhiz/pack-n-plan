import { ProtectedRoute } from "@/components/protected-route";
import { ProfileForm } from "@/components/profile-form";
import { PageTransition } from "@/components/page-transition";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <PageTransition>
        <div className="container mx-auto max-w-4xl py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Your Profile</h1>
            <p className="mt-2 text-muted-foreground">
              Manage your personal information and preferences
            </p>
          </div>
          <ProfileForm />
        </div>
      </PageTransition>
    </ProtectedRoute>
  );
}
