import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ServiceTypes from "@/components/home/ServiceTypes";
import FeaturedListings from "@/components/home/FeaturedListings";
import MapSection from "@/components/home/MapSection";
import SellerCTA from "@/components/home/SellerCTA";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServiceTypes />
      <FeaturedListings />
      <MapSection />
      <SellerCTA />
      <WhyUs />
    </>
  );
}
