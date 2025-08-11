import { useState } from "react";
import { LogIn, Mail, Lock, Crown, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface LoginFormProps {
  onLogin: () => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("golden");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo mode - any credentials work
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center stars-bg">
      <Card className="w-full max-w-md p-8 bg-cms-surface/90 backdrop-blur-sm border-cms-border">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-cms-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-cms-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-cms-text-primary">Admin Panel</h1>
          <p className="text-cms-text-secondary mt-2">Welcome back! Please sign in to continue.</p>
        </div>

        {/* Theme Selection */}
        <div className="mb-6">
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => setSelectedTheme("golden")}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedTheme === "golden"
                  ? 'border-cms-primary bg-cms-primary/10'
                  : 'border-cms-border bg-cms-surface-elevated hover:border-cms-primary/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cms-primary rounded-lg flex items-center justify-center">
                  <Crown className="w-5 h-5 text-cms-primary-foreground" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-cms-text-primary">Golden</div>
                  <div className="text-sm text-cms-text-secondary">Luxury & Elegance</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-cms-primary mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-cms-text-muted" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cms-input pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-cms-primary mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-cms-text-muted" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="cms-input pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-cms-text-muted hover:text-cms-text-primary"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full cms-button-primary"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Sign In
          </Button>
        </form>

        {/* Demo Mode Notice */}
        <div className="mt-6 p-4 bg-cms-surface-elevated border border-cms-border rounded-lg">
          <div className="flex items-center gap-2 text-cms-primary text-sm font-medium">
            🎭 Demo Mode Active
          </div>
          <p className="text-xs text-cms-text-muted mt-1">
            Any email and password combination will work
          </p>
        </div>
      </Card>
    </div>
  );
};