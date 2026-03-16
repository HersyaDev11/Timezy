import LandingHeader from "../components/landing/LandingHeader";
import HeroSection from "../components/landing/HeroSection";
import FeatureHighlights from "../components/landing/FeatureHighlights";
import Statistics from "../components/landing/Statistics";
import CTASection from "../components/landing/Cta";
import TestimonialSection from "../components/landing/Testimoni";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
    return (
        <div className="dark:bg-[#0f172a]">
            <LandingHeader />

            {/* Main Section */}
            <main className="px-4 mx-auto w-full">
                <HeroSection />
                <Statistics />
                <FeatureHighlights />
                <CTASection />
                <TestimonialSection />
            </main>
            <Footer />
        </div>
    );
}
