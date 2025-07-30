import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Instagram, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-esfahan-blue text-white">
      <div className="container mx-auto px-4 py-16">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-xl">ا</span>
              </div>
              <h3 className="text-2xl font-bold">اصفهان بنر</h3>
            </div>
            <p className="text-blue-200 leading-relaxed">
              پلتفرم تبلیغات دیجیتال محلی اصفهان که کسب‌وکارها و ناشران را در اینستاگرام و تلگرام به هم متصل می‌کند.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-blue-200 hover:text-white hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-blue-200 hover:text-white hover:bg-white/10">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">دسترسی سریع</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-blue-200 hover:text-white transition-colors">
                  صفحه اصلی
                </a>
              </li>
              <li>
                <a href="/how-it-works" className="text-blue-200 hover:text-white transition-colors">
                  نحوه کار
                </a>
              </li>
              <li>
                <a href="/order" className="text-blue-200 hover:text-white transition-colors">
                  رزرو تبلیغ
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-blue-200 hover:text-white transition-colors">
                  تعرفه‌ها
                </a>
              </li>
              <li>
                <a href="/about" className="text-blue-200 hover:text-white transition-colors">
                  درباره ما
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">خدمات</h4>
            <ul className="space-y-2">
              <li>
                <a href="/partnership" className="text-blue-200 hover:text-white transition-colors">
                  همکاری ناشران
                </a>
              </li>
              <li>
                <a href="/portfolio" className="text-blue-200 hover:text-white transition-colors">
                  نمونه کارها
                </a>
              </li>
              <li>
                <a href="/register-channel" className="text-blue-200 hover:text-white transition-colors">
                  ثبت کانال
                </a>
              </li>
              <li>
                <a href="/benefits" className="text-blue-200 hover:text-white transition-colors">
                  مزایای همکاری
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">تماس با ما</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-blue-200">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">۰۳۱-۱۲۳۴۵۶۷۸</span>
              </div>
              <div className="flex items-center gap-3 text-blue-200">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">info@esfahanbanner.ir</span>
              </div>
              <div className="flex items-start gap-3 text-blue-200">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
                <span className="text-sm">اصفهان، خیابان شیخ‌بهایی، مجموعه فناوری</span>
              </div>
            </div>
            
            <Button variant="outline-accent" size="sm" className="text-white border-white hover:bg-white hover:text-esfahan-blue">
              تماس با ما
              <ExternalLink className="mr-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator className="bg-blue-300/20" />

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-blue-200 text-sm">
            © {currentYear} اصفهان بنر. تمامی حقوق محفوظ است.
          </div>
          
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="text-blue-200 hover:text-white transition-colors">
              حریم خصوصی
            </a>
            <a href="/terms" className="text-blue-200 hover:text-white transition-colors">
              شرایط و قوانین
            </a>
            <a href="/support" className="text-blue-200 hover:text-white transition-colors">
              پشتیبانی
            </a>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
            <h5 className="font-semibold mb-2">آماده شروع تبلیغات هستید؟</h5>
            <p className="text-blue-200 text-sm mb-4">همین الان کمپین خود را شروع کنید</p>
            <Button variant="hero" size="sm" className="bg-white text-esfahan-blue hover:bg-blue-50">
              شروع رایگان
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;