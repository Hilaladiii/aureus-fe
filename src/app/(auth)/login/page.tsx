import Link from "next/link";
import { AuthPageWrapper } from "../_component/AuthPageWrapper";
import { LoginForm } from "../_component/LoginForm";

export default function LoginPage() {
  return (
    <AuthPageWrapper
      title={
        <>
          Sign In to <span className="italic font-normal">Your Vault.</span>
        </>
      }
      subtitle="Identity Verification Protocol"
      footer={
        <p className="meta-label text-zinc-400 font-normal">
          Not a member of the collective?{" "}
          <Link
            href="/register"
            className="text-black font-medium hover:underline underline-offset-4 ml-2"
          >
            Request Invitation
          </Link>
        </p>
      }
    >
      <LoginForm />
    </AuthPageWrapper>
  );
}
