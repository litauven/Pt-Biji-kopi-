"use client";

import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, LogIn, UserPlus, LogOut, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginModal() {
  const {
    t,
    isLoginOpen,
    setIsLoginOpen,
    user,
    login,
    logout,
  } = useApp();

  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "signin") {
      if (!form.email || !form.password) return;
      // Simulate simple login
      const mockName = form.email.split("@")[0].replace(".", " ");
      const capitalizedName = mockName.charAt(0).toUpperCase() + mockName.slice(1);
      login(capitalizedName || "Gourmet Partner", form.email);
      setSuccessMsg("Welcome back to the BKN Club!");
    } else {
      if (!form.name || !form.email || !form.password) return;
      login(form.name, form.email);
      setSuccessMsg("Account created! Enjoy your membership roasts.");
    }

    setTimeout(() => {
      setSuccessMsg("");
      setIsLoginOpen(false);
      setForm({ name: "", email: "", password: "" });
    }, 2000);
  };

  const handleLogout = () => {
    logout();
    setIsLoginOpen(false);
  };

  return (
    <AnimatePresence>
      {isLoginOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLoginOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50"
          />

          {/* Modal box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.35 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-espresso-black text-warm-cream border border-coffee-gold/15 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-coffee-gold/15 flex justify-between items-center bg-espresso-dark">
              <span className="font-serif-editorial text-lg font-bold tracking-wide text-white">
                {user?.isLoggedIn ? "Member Profile" : t("loginTitle")}
              </span>
              <button
                onClick={() => setIsLoginOpen(false)}
                className="p-1 rounded-full text-warm-cream/60 hover:text-coffee-gold hover:bg-white/5 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {successMsg ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-4 flex flex-col items-center justify-center"
                >
                  <CheckCircle2 className="w-16 h-16 text-coffee-gold stroke-[1.5]" />
                  <p className="text-white font-serif-editorial text-lg font-bold">{successMsg}</p>
                </motion.div>
              ) : user?.isLoggedIn ? (
                /* Logged In View */
                <div className="space-y-6 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-coffee-brown/50 border border-coffee-gold/20 flex items-center justify-center text-coffee-gold mx-auto text-xl font-bold font-serif-editorial">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-bold font-serif-editorial">{user.name}</h3>
                    <p className="text-warm-cream/50 text-xs mt-1">{user.email}</p>
                  </div>

                  <div className="p-4 rounded bg-espresso-dark/65 border border-coffee-gold/5 text-left text-xs space-y-2">
                    <p className="text-coffee-gold font-bold">✨ BKN CLUB STATUS: RESERVE MEMBER</p>
                    <p className="text-warm-cream/60">Enjoy exclusive access to micro-lot coffee beans and private roasting slots.</p>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white hover:bg-red-500/10 font-bold uppercase tracking-wider py-3.5 rounded text-xs transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> {t("loginLogout")}
                  </button>
                </div>
              ) : (
                /* Logged Out / Auth Forms */
                <div className="space-y-6">
                  {/* Tabs Selector */}
                  <div className="flex border-b border-coffee-gold/10">
                    <button
                      onClick={() => setActiveTab("signin")}
                      className={`flex-1 pb-3 text-sm tracking-wider font-bold transition-all relative ${activeTab === "signin" ? "text-coffee-gold" : "text-warm-cream/40"}`}
                    >
                      {t("loginSigninTab")}
                      {activeTab === "signin" && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-coffee-gold" />}
                    </button>
                    <button
                      onClick={() => setActiveTab("signup")}
                      className={`flex-1 pb-3 text-sm tracking-wider font-bold transition-all relative ${activeTab === "signup" ? "text-coffee-gold" : "text-warm-cream/40"}`}
                    >
                      {t("loginSignupTab")}
                      {activeTab === "signup" && <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-coffee-gold" />}
                    </button>
                  </div>

                  <p className="text-xs text-warm-cream/50">{t("loginSubtitle")}</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {activeTab === "signup" && (
                      <div className="flex flex-col gap-1">
                        <label className="text-xs text-warm-cream/60 uppercase tracking-wide">{t("loginFullName")}</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleInputChange}
                          required
                          className="bg-espresso-dark border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none"
                          placeholder="e.g. Michael Chen"
                        />
                      </div>
                    )}

                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-warm-cream/60 uppercase tracking-wide">{t("loginEmail")}</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        required
                        className="bg-espresso-dark border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none"
                        placeholder="yourname@domain.com"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-warm-cream/60 uppercase tracking-wide">{t("loginPassword")}</label>
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                        required
                        className="bg-espresso-dark border border-coffee-gold/20 focus:border-coffee-gold rounded px-3 py-2 text-sm text-white focus:outline-none"
                        placeholder="••••••••"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-coffee-gold hover:bg-coffee-gold-light text-espresso-black font-bold uppercase tracking-wider py-3.5 rounded text-xs transition-all duration-300 mt-2 flex items-center justify-center gap-2"
                    >
                      {activeTab === "signin" ? (
                        <>
                          <LogIn className="w-4 h-4" /> {t("loginButton")}
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4" /> {t("loginRegisterButton")}
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
