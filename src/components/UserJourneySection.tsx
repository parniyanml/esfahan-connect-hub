import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Megaphone, Radio, CheckCircle, DollarSign, Target, BarChart3 } from "lucide-react";
const UserJourneySection = () => {
  return <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-esfahan-blue mb-4">
            شما کدام هستید؟
          </h2>
          <p className="text-lg text-esfahan-gray max-w-2xl mx-auto">
            بسته به نوع فعالیت شما، مسیر مناسب خود را انتخاب کنید
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Advertiser Card */}
          <Card className="shadow-medium hover:shadow-large transition-all duration-300 border-2 hover:border-esfahan-accent/20">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-esfahan-accent/10 rounded-xl mb-4 mx-auto">
                <Megaphone className="h-8 w-8 text-esfahan-accent" />
              </div>
              <CardTitle className="text-2xl font-bold text-esfahan-blue">تبلیغ دهنده هستید؟</CardTitle>
              <CardDescription className="text-base text-esfahan-gray">
                کمپین تبلیغاتی خود را در بهترین کانال‌های محلی اصفهان راه‌اندازی کنید
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-esfahan-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-esfahan-blue">رزرو آسان</h4>
                    <p className="text-sm text-esfahan-gray">فرآیند ساده و سریع سفارش‌گیری</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-esfahan-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-esfahan-blue">قیمت شفاف</h4>
                    <p className="text-sm text-esfahan-gray">تعرفه‌های مشخص و بدون هزینه پنهان</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-esfahan-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-esfahan-blue">دسترسی به اصفهان خبر</h4>
                    <p className="text-sm text-esfahan-gray">تبلیغ در پرمخاطب‌ترین کانال خبری اصفهان</p>
                  </div>
                </div>
              </div>

              <Button variant="hero" size="lg" className="w-full">
                شروع تبلیغات
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>

          {/* Publisher Card */}
          <Card className="shadow-medium hover:shadow-large transition-all duration-300 border-2 hover:border-esfahan-green/20">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-esfahan-green/10 rounded-xl mb-4 mx-auto">
                <Radio className="h-8 w-8 text-esfahan-green" />
              </div>
              <CardTitle className="text-2xl font-bold text-esfahan-blue">صاحب رسانه هستید؟</CardTitle>
              <CardDescription className="text-base text-esfahan-gray">
                کانال خود را لیست کنید و از تبلیغات کسب‌وکارهای محلی درآمد کسب کنید
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-esfahan-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-esfahan-blue">کسب درآمد آسان</h4>
                    <p className="text-sm text-esfahan-gray">تبدیل فالوورها به درآمد پایدار</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <BarChart3 className="h-5 w-5 text-esfahan-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-esfahan-blue">مدیریت سفارشات</h4>
                    <p className="text-sm text-esfahan-gray">پنل کاربری حرفه‌ای برای مدیریت تبلیغات</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-esfahan-green mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-esfahan-blue">دسترسی به مشتریان</h4>
                    <p className="text-sm text-esfahan-gray">اتصال مستقیم با کسب‌وکارهای محلی</p>
                  </div>
                </div>
              </div>

              <Button variant="success" size="lg" className="w-full">
                ثبت کانال
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default UserJourneySection;