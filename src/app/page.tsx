import { EmailContinueForm } from "@/components/email-continue-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 p-6">
      <h1 className="text-4xl font-semibold tracking-tight">Spend Time Well</h1>
      <EmailContinueForm />
    </div>
  );
}
