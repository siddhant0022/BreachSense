import "../styles/global.css";
import Navbar from "@/components/Landing/components/Navbar";
import Hero from "@/components/Landing/components/Hero";
import Features from "@/components/Landing/components/Features";
import Footer from "@/components/Landing/components/Footer";

export default function LandingHomePage() {
  return (
    <main className="landing-shell relative min-h-svh bg-background text-text-primary">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />

      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
