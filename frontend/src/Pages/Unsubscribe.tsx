import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import { FaSadTear, FaCheckCircle, FaSpinner } from "react-icons/fa";

const Unsubscribe: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No unsubscribe token provided.");
      return;
    }

    const unsubscribeUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/newsletter/unsubscribe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus("success");
          setMessage("You've been successfully unsubscribed.");
        } else {
          setStatus("error");
          setMessage(data.message || "Failed to unsubscribe.");
        }
      } catch (error) {
        setStatus("error");
        setMessage("A network error occurred. Please try again.");
      }
    };

    unsubscribeUser();
  }, [token]);

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-[var(--color-background)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] rounded-full blur-[80px] opacity-10 pointer-events-none" />

        {status === "loading" && (
          <div className="flex flex-col items-center justify-center py-8">
            <FaSpinner className="animate-spin text-4xl text-[var(--color-primary)] mb-4" />
            <h2 className="text-xl font-bold text-[var(--color-text)]">Processing...</h2>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center justify-center">
            <FaCheckCircle className="text-5xl text-[var(--color-primary)] mb-6" />
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">You've Been Unsubscribed</h2>
            <p className="text-[var(--color-text-muted)] mb-8">
              We're sorry to see you go. You will no longer receive emails from our newsletter.
              You can rejoin anytime to continue receiving AI, automation, and growth insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={() => navigate("/")}
                className="flex-1 bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] font-bold py-3 px-6 rounded-xl hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300"
              >
                Return to Website
              </button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center">
            <FaSadTear className="text-5xl text-red-500 mb-6" />
            <h2 className="text-2xl font-bold text-[var(--color-text)] mb-4">Unsubscribe Failed</h2>
            <p className="text-[var(--color-text-muted)] mb-8">{message}</p>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] font-bold py-3 px-6 rounded-xl hover:bg-[#222] transition-all duration-300"
            >
              Return Home
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Unsubscribe;
