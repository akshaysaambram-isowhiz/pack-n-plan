import { PageTransition } from "@/components/page-transition";
import { FeedbackForm } from "@/components/feedback-form";

export default function FeedbackPage() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Share Your Feedback
          </h1>
          <p className="text-muted-foreground">
            Help us improve PackNPlan by sharing your experience
          </p>
        </div>
        <FeedbackForm />
      </div>
    </PageTransition>
  );
}
