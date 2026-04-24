import { createFileRoute } from "@tanstack/react-router";

import LandingHomePage from "@/components/Landing/app/page";

export const Route = createFileRoute("/home")({
  component: LandingHomePage,
});
