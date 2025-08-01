import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle OTP request logic here
    console.log("Requesting OTP for:", mobileNumber);
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
              به اصفهان بنر خوش آمدید
            </h1>
            <p className="text-muted-foreground text-sm">
              برای ثبت نام شماره موبایل خود را وارد نمایید
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="mobile" className="text-foreground text-right block">
                شماره موبایل
              </Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="09123456789"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="text-right"
                dir="ltr"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-primary hover:opacity-90 text-white py-3 rounded-xl font-medium"
              disabled={!mobileNumber}
            >
              دریافت رمز یکبار مصرف
            </Button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm"
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