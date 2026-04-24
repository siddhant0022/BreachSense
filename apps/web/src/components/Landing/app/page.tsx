import "../styles/global.css";
import BottomNav from "@/components/Landing/components/BottomNav";
import Navbar from "@/components/Landing/components/Navbar";
import Hero from "@/components/Landing/components/Hero";
import Features from "@/components/Landing/components/Features";
import Footer from "@/components/Landing/components/Footer";
import { motion } from "framer-motion";

export default function LandingHomePage() {
  return (
    <main className="landing-shell relative min-h-svh bg-background text-text-primary">
    <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />

      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="pb-32"
      >
        <Hero />

        <section id="product" className="mx-auto max-w-7xl scroll-mt-28 px-8 py-24">
          <div className="mb-10 max-w-2xl space-y-4">
            <p className="text-xs font-medium tracking-[0.24em] text-primary uppercase">
              Product Core
            </p>
            <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
              A bottom-up command architecture built for live cyber visibility.
            </h2>
            <p className="text-lg text-text-secondary">
              BracheSense keeps telemetry, response logic, and trust controls in a single dark
              interface so every interaction feels like operating a live system instead of browsing
              a marketing page.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Signal Mesh",
                copy: "Streams identities, sessions, endpoints, and anomalies into one ambient control loop.",
              },
              {
                title: "Response Engine",
                copy: "Turns alerts into guided actions, policy automation, and operator-level confidence.",
              },
              {
                title: "Trust Surface",
                copy: "Keeps every decision framed by provenance, access state, and security posture in real time.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="glass rounded-[1.75rem] border border-border/70 p-6 transition hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_0_48px_rgba(59,130,246,0.12)]"
              >
                <p className="mb-3 text-xs tracking-[0.22em] text-primary uppercase">{item.title}</p>
                <p className="text-base leading-7 text-text-secondary">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <Features />

        <section id="solutions" className="mx-auto max-w-7xl scroll-mt-28 px-8 py-24">
          <div className="glass overflow-hidden rounded-[2rem] border border-border/70 p-8 md:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-5">
                <p className="text-xs font-medium tracking-[0.24em] text-primary uppercase">
                  Solutions Matrix
                </p>
                <h2 className="text-3xl font-semibold text-text-primary md:text-4xl">
                  Adaptive coverage for teams that need a live control panel, not a static dashboard.
                </h2>
                <p className="max-w-2xl text-lg text-text-secondary">
                  Deploy the same navigation logic across security operations, identity defense, and
                  compliance workflows while preserving one cinematic interface language.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  "SOC teams coordinating response across threat streams.",
                  "Security leaders visualizing posture, escalation, and operational drift.",
                  "Platform teams exposing trusted docs and rollout paths without breaking immersion.",
                ].map((line) => (
                  <div
                    key={line}
                    className="rounded-[1.5rem] border border-border/70 bg-surface/80 px-5 py-4 text-sm leading-6 text-text-secondary"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </motion.div>

      <BottomNav />
    </main>
  );
}
