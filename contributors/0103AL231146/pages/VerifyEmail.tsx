import React, { useState } from "react";

const VerifyEmail: React.FC = () => {
  const [isResending, setIsResending] = useState(false);
  const [email] = useState("user@example.com"); // This would come from signup state

  const handleResendEmail = () => {
    setIsResending(true);

    // Simulate API call (UI only)
    setTimeout(() => {
      setIsResending(false);
      console.log("Resend verification email to:", email);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <i className="fa-solid fa-envelope text-white text-2xl" />
            <span className="text-2xl font-bold text-slate-100">
              Cyber <span className="text-cyan-500">Lens</span>
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Check your email
          </h1>
          <p className="text-sm text-neutral-400">
            We've sent a verification link to your email
          </p>
        </div>

        {/* Email Verification Card */}
        <div className="border border-neutral-800 bg-neutral-900 p-6">
          {/* Email Display */}
          <div className="mb-6 p-4 bg-neutral-950 border border-neutral-800 rounded-lg">
            <div className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-envelope-open text-cyan-400" />
              <span className="text-sm font-mono text-neutral-300">
                {email}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                <span className="text-xs text-cyan-400">1</span>
              </div>
              <p className="text-sm text-neutral-300">
                Open your email inbox and find the verification message from
                CyberLens
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                <span className="text-xs text-cyan-400">2</span>
              </div>
              <p className="text-sm text-neutral-300">
                Click the verification link to activate your account
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center mt-0.5">
                <span className="text-xs text-cyan-400">3</span>
              </div>
              <p className="text-sm text-neutral-300">
                Return to CyberLens to access your threat intelligence dashboard
              </p>
            </div>
          </div>

          {/* Resend Button */}
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className="w-full px-4 py-2 text-sm font-medium bg-neutral-800 text-neutral-300 hover:bg-neutral-700 disabled:bg-neutral-800 disabled:text-neutral-500 transition-colors border border-neutral-700"
          >
            {isResending ? "Sending..." : "Resend verification email"}
          </button>

          {/* Help Text */}
          <div className="mt-4 text-center">
            <p className="text-xs text-neutral-500">
              Didn't receive the email? Check your spam folder or try resending
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-400">
            <a
              href="/login"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Back to sign in
            </a>
          </p>
        </div>

        {/* Security Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-neutral-500">
            For security reasons, this link will expire in 24 hours
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
