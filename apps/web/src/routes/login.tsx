import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import SignInForm from "@/components/sign-in-form";
import SignUpForm from "@/components/sign-up-form";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md transition-all duration-300 ease-in-out">
        
        <div className="relative">
          {/* Sign In */}
          <div
            className={`transition-all duration-300 ${
              isSignIn ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5 absolute"
            }`}
          >
            <SignInForm onSwitchToSignUp={() => setIsSignIn(false)} />
          </div>

          {/* Sign Up */}
          <div
            className={`transition-all duration-300 ${
              !isSignIn ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5 absolute"
            }`}
          >
            <SignUpForm onSwitchToSignIn={() => setIsSignIn(true)} />
          </div>
        </div>

      </div>
    </div>
  );
}