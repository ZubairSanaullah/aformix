import React, { useState } from "react";
import { useNavigate } from "react-router";
import { X } from "lucide-react";

type AuthMode = "login" | "signup" | "verify-otp";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // OTP state
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const apiUrl = import.meta.env.VITE_API_URL || "";

  const parseJsonResponse = async (response: Response) => {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return await response.json();
    }

    const text = await response.text();
    try {
      return text ? JSON.parse(text) : {};
    } catch {
      return { message: text || response.statusText };
    }
  };

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await parseJsonResponse(response);
      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      setMessage(data.message || "Login successful. Redirecting...");
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("authStateChange"));
      }
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (signupPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (signupPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupName,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      const data = await parseJsonResponse(response);
      if (!response.ok) {
        throw new Error(data.message || "Registration failed. Please try again.");
      }

      setMessage("Signup successful! Check your email for OTP.");
      setOtpEmail(signupEmail);
      setTimeout(() => setMode("verify-otp"), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (otp.length !== 6) {
      setError("OTP must be 6 digits.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: otpEmail, otp }),
      });

      const data = await parseJsonResponse(response);
      if (!response.ok) {
        throw new Error(data.message || "OTP verification failed. Please try again.");
      }

      setMessage("Email verified successfully! Redirecting to login...");
      setTimeout(() => {
        setMode("login");
        setLoginEmail(otpEmail);
        setOtpEmail("");
        setOtp("");
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-24 px-6 relative">
      <div className="max-w-md w-full glass-effect rounded-3xl p-10 shadow-2xl border border-[var(--color-glass-border)] relative">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 right-4 p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors rounded-full hover:bg-white/5 md:hidden"
        >
          <X size={24} />
        </button>
        {mode === "login" && (
          <>
            <h1 className="text-3xl font-bold mb-2 text-[var(--color-text)]">Login</h1>
            <p className="text-sm text-[var(--color-text-muted)] mb-8">
              Enter your credentials to access your account.
            </p>
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <label className="block text-sm font-medium text-[var(--color-text)]">
                Email
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </label>

              <label className="block text-sm font-medium text-[var(--color-text)]">
                Password
                <div className="relative mt-2">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(event) => setLoginPassword(event.target.value)}
                    placeholder="********"
                    className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 pr-12 text-sm text-[var(--color-text)] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {showLoginPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.596 3.596m16.807 16.807L9.172 9.172m0 0a3 3 0 015.364 3.364m-3.364-3.364l3.364 3.364" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>

              {error && <p className="text-sm text-red-400">{error}</p>}
              {message && <p className="text-sm text-emerald-400">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary text-sm py-3 rounded-2xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in…" : "Continue"}
              </button>

              <p className="text-center text-sm text-[var(--color-text-muted)]">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                    setMessage("");
                    setLoginEmail("");
                    setLoginPassword("");
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Create an account
                </button>
              </p>
            </form>
          </>
        )}

        {mode === "signup" && (
          <>
            <h1 className="text-3xl font-bold mb-2 text-[var(--color-text)]">Create Account</h1>
            <p className="text-sm text-[var(--color-text-muted)] mb-8">
              Sign up to get started with Aformix.
            </p>
            <form onSubmit={handleSignupSubmit} className="space-y-5">
              <label className="block text-sm font-medium text-[var(--color-text)]">
                Full Name
                <input
                  type="text"
                  value={signupName}
                  onChange={(event) => setSignupName(event.target.value)}
                  placeholder="John Doe"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </label>

              <label className="block text-sm font-medium text-[var(--color-text)]">
                Email
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(event) => setSignupEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  required
                />
              </label>

              <label className="block text-sm font-medium text-[var(--color-text)]">
                Password
                <div className="relative mt-2">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    value={signupPassword}
                    onChange={(event) => setSignupPassword(event.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 pr-12 text-sm text-[var(--color-text)] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {showSignupPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.596 3.596m16.807 16.807L9.172 9.172m0 0a3 3 0 015.364 3.364m-3.364-3.364l3.364 3.364" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>

              <label className="block text-sm font-medium text-[var(--color-text)]">
                Confirm Password
                <div className="relative mt-2">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm your password"
                    className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 pr-12 text-sm text-[var(--color-text)] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m4.753-4.753L3.596 3.596m16.807 16.807L9.172 9.172m0 0a3 3 0 015.364 3.364m-3.364-3.364l3.364 3.364" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>

              {error && <p className="text-sm text-red-400">{error}</p>}
              {message && <p className="text-sm text-emerald-400">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary text-sm py-3 rounded-2xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating account…" : "Sign Up"}
              </button>

              <p className="text-center text-sm text-[var(--color-text-muted)]">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setMessage("");
                    setSignupName("");
                    setSignupEmail("");
                    setSignupPassword("");
                    setConfirmPassword("");
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Login here
                </button>
              </p>
            </form>
          </>
        )}

        {mode === "verify-otp" && (
          <>
            <h1 className="text-3xl font-bold mb-2 text-[var(--color-text)]">Verify Email</h1>
            <p className="text-sm text-[var(--color-text-muted)] mb-8">
              Enter the 6-digit OTP sent to {otpEmail}
            </p>
            <form onSubmit={handleOtpSubmit} className="space-y-5">
              <label className="block text-sm font-medium text-[var(--color-text)]">
                OTP Code
                <input
                  type="text"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  maxLength={6}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-center tracking-widest"
                  required
                />
              </label>

              {error && <p className="text-sm text-red-400">{error}</p>}
              {message && <p className="text-sm text-emerald-400">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary text-sm py-3 rounded-2xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Verifying…" : "Verify OTP"}
              </button>

              <p className="text-center text-sm text-[var(--color-text-muted)]">
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                    setMessage("");
                    setOtp("");
                    setOtpEmail("");
                  }}
                  className="text-primary hover:underline font-medium"
                >
                  Back to signup
                </button>
              </p>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default LoginPage;
