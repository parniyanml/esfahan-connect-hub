import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // mobile or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { identifier, password });
  };

  const handleGoogleLogin = () => {
    // Handle Google login
    console.log("Google login requested");
  };

  const handleOtpLogin = () => {
    // Handle OTP login
    console.log("OTP login requested");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl p-8 shadow-soft border">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-background rounded-full opacity-80"></div>
            </div>
          </div>

          {/* Greeting */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              ورود به اصفهان بنر
            </h1>
            <p className="text-muted-foreground text-sm">
              شماره موبایل یا ایمیل
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-foreground text-right block">
                شماره موبایل یا ایمیل
              </Label>
              <Input
                id="identifier"
                type="text"
                placeholder="شماره موبایل یا ایمیل"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="text-right"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground text-right block">
                رمز عبور
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="رمز عبور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-right pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 text-white py-3 rounded-xl font-medium"
              disabled={!identifier || !password}
            >
              ورود
            </Button>
          </form>

          {/* Alternative Login Options */}
          <div className="mt-6 space-y-3">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                className="flex-1 py-3 rounded-xl border-2 hover:bg-accent/50 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">ورود / ثبت نام با گوگل</span>
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                </span>
              </Button>
              <Button
                variant="outline"
                onClick={handleOtpLogin}
                className="flex-1 py-3 rounded-xl border-2 hover:bg-accent/50 transition-colors"
              >
                <span className="text-sm">ورود با رمز یکبار مصرف</span>
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>عضو اصفهان بنر نیستید؟</span>
              <Link 
                to="/register" 
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                ثبت نام در اصفهان بنر
              </Link>
            </div>
            
            <Link 
              to="/forgot-password" 
              className="block text-sm text-primary hover:text-primary/80 transition-colors"
            >
              فراموشی رمز عبور
            </Link>

            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm mt-4"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;