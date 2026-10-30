import React, { useState } from "react";
import { FaPaperPlane, FaCrown, FaCheck } from "react-icons/fa";

export default function BeautyClubBanner() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 sm:mt-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-900 via-rose-800 to-amber-900 text-white p-8 sm:p-12 lg:p-16 shadow-xl">
        {/* Decorative background circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-rose-200 border border-white/15">
            <FaCrown className="text-amber-400 text-xs" /> Shraddha Beauty VIP Club
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Unlock 15% OFF Your First Luxury Order
          </h2>

          <p className="text-sm sm:text-base text-rose-100/85">
            Subscribe for secret flash sales, new luxury arrivals, and personalized shade recommendations directly in your inbox.
          </p>

          {subscribed ? (
            <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl p-4 text-center animate-fadeIn inline-flex items-center gap-2 text-sm font-bold text-white">
              <FaCheck className="text-emerald-400" /> Welcome to the Club! Check your inbox for your 15% welcome code.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 px-4 py-3 rounded-full text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-400 shadow-md"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-gray-950 font-bold px-6 py-3 rounded-full text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 shrink-0"
              >
                Join VIP Club <FaPaperPlane className="text-xs" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-rose-200/60 pt-1">
            We value your privacy. Unsubscribe at any time with 1 click.
          </p>
        </div>
      </div>
    </section>
  );
}
