import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // SEO: title, description, canonical
  useEffect(() => {
    document.title = "ثبت نام | اصفهان بنر";
    const desc = "ثبت نام با ایمیل و رمز عبور در اصفهان بنر";
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
    if (!email.includes("@")) {
      toast.error("لطفاً یک ایمیل معتبر وارد کنید.");
      return;
    }
    if (password.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("رمزهای عبور یکسان نیستند.");
      return;
    }

    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data.session && data.user) {
        toast.success("ثبت نام و ورود موفق بود");
        navigate("/");
      } else {
        toast.success("لینک تایید به ایمیل شما ارسال شد. لطفاً ایمیل خود را بررسی کنید.");
      }
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error("ثبت نام ناموفق بود. دوباره تلاش کنید.");
    } finally {
      setIsLoading(false);
    }
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

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">ثبت نام در اصفهان بنر</h1>
            <p className="text-muted-foreground text-sm">ایمیل و رمز عبور خود را وارد کنید</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground text-right block">ایمیل</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-right"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground text-right block">رمز عبور</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="حداقل ۶ کاراکتر"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground text-right block">تکرار رمز عبور</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="تکرار رمز عبور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-right"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 text-white py-3 rounded-xl font-medium"
              disabled={!email || !password || !confirmPassword || isLoading}
            >
              {isLoading ? "در حال ثبت نام..." : "ثبت نام"}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>قبلاً حساب کاربری دارید؟</span>
              <Link to="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                ورود به حساب
              </Link>
            </div>

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

export default Register;