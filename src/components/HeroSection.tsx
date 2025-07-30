import { Button } from "@/components/ui/button";
import { ArrowLeft, Instagram, MessageCircle, TrendingUp, Users } from "lucide-react";
const HeroSection = () => {
  return <section className="relative bg-gradient-hero py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Main Hero Content */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-esfahan-blue leading-tight">
              پلتفرم تبلیغات دیجیتال
              <span className="block text-esfahan-accent">اصفهان بنر</span>
            </h1>
            
            <p className="text-lg md:text-xl text-esfahan-gray max-w-2xl mx-auto leading-relaxed">
              کسب‌وکارها و ناشران اصفهان را در اینستاگرام و تلگرام به هم متصل می‌کنیم
            </p>

            {/* Platform Icons */}
            <div className="flex items-center justify-center gap-6 my-8">
              <div className="flex items-center gap-2 text-esfahan-gray">
                <Instagram className="h-8 w-8 text-pink-500" />
                <span className="font-medium">اینستاگرام</span>
              </div>
              <div className="h-8 w-px bg-border"></div>
              <div className="flex items-center gap-2 text-esfahan-gray">
                <MessageCircle className="h-8 w-8 text-blue-500" />
                <span className="font-medium">تلگرام</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="hero" size="xl" className="min-w-[200px]">
                شروع تبلیغات در اصفهان
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Button variant="outline-accent" size="xl" className="min-w-[200px]">
                همکاری با ما
              </Button>
            </div>
          </div>

          {/* Stats or Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-esfahan-accent/10 rounded-lg mb-3">
                <Users className="h-6 w-6 text-esfahan-accent" />
              </div>
              <h3 className="font-semibold text-esfahan-blue">ناشران محلی</h3>
              <p className="text-sm text-esfahan-gray">دسترسی به بهترین رسانه‌های اصفهان</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-esfahan-green/10 rounded-lg mb-3">
                <TrendingUp className="h-6 w-6 text-esfahan-green" />
              </div>
              <h3 className="font-semibold text-esfahan-blue">رشد فروش</h3>
              <p className="text-sm text-esfahan-gray">افزایش قابل توجه در فروش کسب‌وکارها</p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-esfahan-blue/10 rounded-lg mb-3">
                <MessageCircle className="h-6 w-6 text-esfahan-blue" />
              </div>
              <h3 className="font-semibold text-esfahan-blue">پشتیبانی ۲۴/۷</h3>
              <p className="text-sm text-esfahan-gray">راهنمایی در تمام مراحل تبلیغات</p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;