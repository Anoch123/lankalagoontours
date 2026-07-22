import Footer from "@/components/common/footer";
import HeroSection from "@/components/ui/hero_section";
import { app_text_constants } from "@/lib/constants/text_const";
import HomeAboutUs from "@/components/ui/home_about_us";
import { Metadata } from "next";
import TourPackages from "@/components/ui/tour_packages";
import PromoBanner from "@/components/ui/home_promo_banner";

export const metadata: Metadata = {
  title: app_text_constants.APP_TITLE,
  description: app_text_constants.APP_DESCRIPTION,
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 app-shell font-sans">
      <HeroSection />
      <div className="flex flex-col flex-1 sm:mt-[50px] mt-[50px] px-4 md:px-8 lg:px-16">
        <HomeAboutUs />
        <TourPackages />
        {/* <PromoBanner /> */}
      </div>
      <Footer />
    </div>
  );
}
