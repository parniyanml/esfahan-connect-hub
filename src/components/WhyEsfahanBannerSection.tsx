import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Clock, 
  MapPin, 
  TrendingUp, 
  Users, 
  CheckCircle 
} from "lucide-react";

const WhyEsfahanBannerSection = () => {
  const features = [
    {
      icon: Shield,
      title: "شفافیت کامل",
      description: "تمام قیمت‌ها و شرایط به صورت واضح و مشخص اعلام می‌شود. بدون هزینه پنهان یا سورپرایز.",
      color: "text-esfahan-blue",
      bgColor: "bg-esfahan-blue/5"
    },
    {
      icon: Clock,
      title: "سرعت و سادگی",
      description: "فرآیند رزرو در کمتر از ۵ دقیقه تکمیل می‌شود. تأیید محتوا و شروع کمپین در کمترین زمان.",
      color: "text-esfahan-accent",
      bgColor: "bg-esfahan-accent/5"
    },
    {
      icon: MapPin,
      title: "محلی و هدفمند",
      description: "تمرکز روی مخاطبان اصفهانی برای بهترین بازدهی. شناخت عمیق از بازار محلی و علایق مردم.",
      color: "text-esfahan-green",
      bgColor: "bg-esfahan-green/5"
    },
    {
      icon: TrendingUp,
      title: "اثربخشی بالا",
      description: "استفاده از کانال‌های پرمخاطب و معتبر برای حداکثر تأثیرگذاری تبلیغات شما.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Users,
      title: "پشتیبانی حرفه‌ای",
      description: "تیم متخصص برای راهنمایی در تمام مراحل، از تولید محتوا تا تحلیل نتایج کمپین.",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: CheckCircle,
      title: "تضمین کیفیت",
      description: "بررسی دقیق محتوا قبل از انتشار و ارائه گزارش کامل از عملکرد تبلیغات.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-esfahan-blue mb-4">
            چرا اصفهان بنر؟
          </h2>
          <p className="text-lg text-esfahan-gray max-w-2xl mx-auto">
            مزایای منحصر به فرد پلتفرم ما که آن را به بهترین انتخاب برای تبلیغات دیجیتال شما تبدیل می‌کند
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-medium transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-xl mb-4 mx-auto`}>
                    <IconComponent className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-esfahan-blue">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-esfahan-gray leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-hero rounded-xl p-8 max-w-2xl mx-auto shadow-medium">
            <h3 className="text-2xl font-bold text-esfahan-blue mb-4">
              آماده شروع هستید؟
            </h3>
            <p className="text-esfahan-gray mb-6">
              همین الان تبلیغات خود را شروع کنید و تفاوت را احساس کنید
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/order" 
                className="inline-flex items-center justify-center px-8 py-3 bg-esfahan-accent text-white rounded-lg font-semibold hover:bg-esfahan-accent/90 transition-colors shadow-medium hover:shadow-large"
              >
                شروع تبلیغات
              </a>
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-esfahan-accent text-esfahan-accent bg-transparent rounded-lg font-semibold hover:bg-esfahan-accent hover:text-white transition-colors"
              >
                مشاوره رایگان
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyEsfahanBannerSection;