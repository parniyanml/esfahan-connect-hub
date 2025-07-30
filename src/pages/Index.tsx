import HeroSection from "@/components/HeroSection";
import UserJourneySection from "@/components/UserJourneySection";
import FeaturedPublisherSection from "@/components/FeaturedPublisherSection";
import WhyEsfahanBannerSection from "@/components/WhyEsfahanBannerSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-primary" dir="rtl">
      <main>
        <HeroSection />
        <UserJourneySection />
        <FeaturedPublisherSection />
        <WhyEsfahanBannerSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
