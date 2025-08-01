import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Eye, TrendingUp, MessageCircle, Instagram } from "lucide-react";
const FeaturedPublisherSection = () => {
  return <section className="py-20 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-esfahan-blue mb-4">با بهترین رسانه‌های اصفهان تبلیغ کنید!</h2>
          <p className="text-lg text-esfahan-gray max-w-2xl mx-auto">
            دسترسی مستقیم به پرمخاطب‌ترین ناشران محلی اصفهان
          </p>
        </div>

        {/* Isfahan Khabar Featured Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-large border-2 border-esfahan-accent/20 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">ا</span>
                </div>
                <div className="text-right">
                  <CardTitle className="text-3xl font-bold text-esfahan-blue">
                    اصفهان خبر
                  </CardTitle>
                  <CardDescription className="text-lg text-esfahan-gray">
                    پرمخاطب‌ترین کانال خبری اصفهان
                  </CardDescription>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  <Instagram className="w-4 h-4 ml-1" />
                  اینستاگرام
                </Badge>
                <Badge variant="secondary" className="text-sm">
                  <MessageCircle className="w-4 h-4 ml-1" />
                  تلگرام
                </Badge>
                <Badge variant="outline" className="text-sm border-esfahan-green text-esfahan-green">
                  خبری و اطلاع‌رسانی
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-esfahan-blue/5 rounded-lg">
                  <Users className="h-8 w-8 text-esfahan-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-esfahan-blue">۲۵۰K+</div>
                  <div className="text-sm text-esfahan-gray">فالوور فعال</div>
                </div>
                
                <div className="text-center p-4 bg-esfahan-accent/5 rounded-lg">
                  <Eye className="h-8 w-8 text-esfahan-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-esfahan-accent">۱M+</div>
                  <div className="text-sm text-esfahan-gray">بازدید ماهانه</div>
                </div>
                
                <div className="text-center p-4 bg-esfahan-green/5 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-esfahan-green mx-auto mb-2" />
                  <div className="text-2xl font-bold text-esfahan-green">۹۵٪</div>
                  <div className="text-sm text-esfahan-gray">رضایت مشتریان</div>
                </div>
              </div>

              {/* Services Preview */}
              <div className="bg-muted/50 rounded-lg p-6">
                <h4 className="font-semibold text-esfahan-blue mb-4 text-center">خدمات تبلیغاتی</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-esfahan-blue">استوری</div>
                    <div className="text-sm text-esfahan-gray">از ۱۰۰ هزار تومان</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-esfahan-blue">پست</div>
                    <div className="text-sm text-esfahan-gray">از ۲۰۰ هزار تومان</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-esfahan-blue">ریلز</div>
                    <div className="text-sm text-esfahan-gray">از ۳۵۰ هزار تومان</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold text-esfahan-blue">تلگرام</div>
                    <div className="text-sm text-esfahan-gray">از ۸۰ هزار تومان</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center space-y-4">
                <Button variant="hero" size="xl" className="min-w-[250px]">
                  مشاهده پروفایل و تعرفه‌ها
                  <ArrowLeft className="mr-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-esfahan-gray">
                  رزرو آنلاین • تأیید سریع محتوا • پشتیبانی ۲۴/۷
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Publishers Teaser */}
        <div className="text-center mt-12">
          <p className="text-esfahan-gray mb-4">
            بزودی ناشران بیشتری به پلتفرم اضافه خواهند شد
          </p>
          <Button variant="outline-accent" size="lg">
            مشاهده تمام ناشران
          </Button>
        </div>
      </div>
    </section>;
};
export default FeaturedPublisherSection;