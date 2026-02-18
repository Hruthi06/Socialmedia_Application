import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Sparkles, Users, MessageCircle, Heart, Share2 } from "lucide-react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { ErrorMessage } from "../components/ErrorMessage";

type AuthMode = "signin" | "signup";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    general: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user types
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      general: "",
      username: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (mode === "signup" && !formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (
      mode === "signup" &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Simulate success or error - higher success rate for demo
      if (Math.random() > 0.9) {
        setErrors((prev) => ({
          ...prev,
          general: mode === "signin" 
            ? "Invalid username or password" 
            : "Username already exists",
        }));
      } else {
        // Success - navigate to feed
        console.log("Authentication successful", formData);
        navigate("/feed");
      }
    }, 1500);
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setFormData({ username: "", password: "", confirmPassword: "" });
    setErrors({ general: "", username: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="size-full flex">
      {/* Left side - Illustration (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: "10%", right: "10%" }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">SocialSphere</h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Connect with friends
              <br />
              and the world
            </h2>
            <p className="text-white/80 text-lg">
              Share moments, discover stories, and build meaningful connections
              with people around you.
            </p>
          </motion.div>
        </div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative z-10 grid grid-cols-2 gap-4"
        >
          {[
            { icon: Users, text: "Global Community" },
            { icon: MessageCircle, text: "Real-time Chat" },
            { icon: Heart, text: "Share Moments" },
            { icon: Share2, text: "Easy Sharing" },
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4"
            >
              <feature.icon className="w-5 h-5 text-white" />
              <span className="text-white text-sm">{feature.text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">SocialSphere</h1>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-2 mb-8 bg-muted p-1.5 rounded-xl">
            <button
              onClick={() => switchMode("signin")}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                mode === "signin"
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => switchMode("signup")}
              className={`flex-1 py-2.5 rounded-lg transition-all ${
                mode === "signup"
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          <h2 className="mb-2">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {mode === "signin"
              ? "Enter your credentials to access your account"
              : "Join our community and start connecting"}
          </p>

          {/* General error message */}
          {errors.general && (
            <div className="mb-4">
              <ErrorMessage message={errors.general} />
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="username"
              label="Username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              error={errors.username}
              autoComplete="username"
            />

            <Input
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
            />

            {mode === "signup" && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                autoComplete="new-password"
              />
            )}

            {mode === "signin" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-6"
              isLoading={isLoading}
            >
              {mode === "signin" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === "signin" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => switchMode("signup")}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up for free
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => switchMode("signin")}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>

          {/* Terms and privacy */}
          {mode === "signup" && (
            <p className="mt-6 text-xs text-center text-muted-foreground">
              By creating an account, you agree to our{" "}
              <button className="text-primary hover:underline">
                Terms of Service
              </button>{" "}
              and{" "}
              <button className="text-primary hover:underline">
                Privacy Policy
              </button>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}