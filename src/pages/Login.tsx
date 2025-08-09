import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // mobile or email
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // SEO: title, description, canonical
  useEffect(() => {
    document.title = "ورود | اصفهان بنر";
    const desc = "ورود به اصفهان بنر با ایمیل و رمز عبور";
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = desc;
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) navigate("/");
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) navigate("/");
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const id = identifier.trim();
      if (!id) {
        toast.error("لطفاً ایمیل خود را وارد کنید.");
        return;
      }
      if (!id.includes("@")) {
        toast.info("فعلاً فقط ورود با ایمیل/رمز عبور فعال است.");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: id,
        password,
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("با موفقیت وارد شدید");
        navigate("/");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error("ورود ناموفق بود. دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoogleLogin = () => {
    toast.info("Google login will be available soon.");
  };

  const handleOtpLogin = () => {
    toast.info("OTP login will be available soon.");
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
              disabled={!identifier || !password || isLoading}
            >
              {isLoading ? "در حال ورود..." : "ورود"}
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
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
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