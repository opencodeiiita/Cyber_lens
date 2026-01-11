import React, { useState } from "react";

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call (UI only)
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login attempt:", { email, password });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <i className="fa-solid fa-lock text-white text-2xl" />
            <span className="text-2xl font-bold text-slate-100">
              Cyber <span className="text-cyan-500">Lens</span>
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight mb-2">
            Log in to CyberLens
          </h1>
          <p className="text-sm text-neutral-400">
            Access your threat intelligence dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="border border-neutral-800 bg-neutral-900 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-300 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors({ ...errors, email: undefined });
                  }
                }}
                className={`w-full px-3 py-2 text-sm bg-neutral-950 border ${
                  errors.email ? "border-red-500" : "border-neutral-800"
                } placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors`}
                placeholder="you@example.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-300 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors({ ...errors, password: undefined });
                  }
                }}
                className={`w-full px-3 py-2 text-sm bg-neutral-950 border ${
                  errors.password ? "border-red-500" : "border-neutral-800"
                } placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors`}
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-2 text-sm font-medium bg-cyan-500 text-neutral-950 hover:bg-cyan-400 disabled:bg-neutral-700 disabled:text-neutral-500 transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-400">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        {/* Optional Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-neutral-500">
            CyberLens can be used without creating an account
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
