import Link from "next/link";
import { AuthPageWrapper } from "../_component/AuthPageWrapper";
import { RegisterForm } from "../_component/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthPageWrapper
      title={
        <>
          Request Your <br />
          <span className="italic font-normal">Membership.</span>
        </>
      }
      subtitle="Institutional Enrollment Protocol"
      footer={
        <p className="meta-label text-zinc-400 font-normal">
          Already have access?{" "}
          <Link
            href="/login"
            className="text-black font-medium hover:underline underline-offset-4 ml-2"
          >
            Sign In
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthPageWrapper>
  );
}
