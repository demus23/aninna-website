import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import SocialProofBar from "../components/sections/SocialProofBar";
import ProblemSection from "../components/sections/ProblemSection";
import BenefitsSection from "../components/sections/BenefitsSection";
import ReviewsSection from "../components/sections/ReviewsSection";
import ProductGallerySection from "../components/sections/ProductGallerySection";
import UsageSection from "../components/sections/UsageSection";
import IngredientsSection from "../components/sections/IngredientsSection";
import FAQSection from "../components/sections/FAQSection";
import CTASection from "../components/sections/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f5ef] text-[#2b211d]">
      <Navigation />
      <HeroSection />
      <SocialProofBar />
      <ProblemSection />
      <BenefitsSection />
      <ReviewsSection />
      <ProductGallerySection />
      <UsageSection />
      <IngredientsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}