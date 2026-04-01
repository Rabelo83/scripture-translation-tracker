import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: "oklch(0.12 0.02 260)" }}
    >
      <div className="w-full max-w-lg mx-4 text-center">
        <div className="flex justify-center mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: "oklch(0.18 0.03 260)", border: "1px solid oklch(0.25 0.03 260)" }}
          >
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "var(--font-display)", color: "oklch(0.82 0.12 80)" }}
            >
              404
            </span>
          </div>
        </div>

        <h1
          className="text-4xl sm:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-display)", color: "oklch(0.95 0.02 80)" }}
        >
          Page Not Found
        </h1>

        <p className="text-base mb-10 leading-relaxed" style={{ color: "oklch(0.55 0.02 260)" }}>
          This page doesn't exist. It may have been moved or deleted.
        </p>

        <Button
          onClick={() => setLocation("/")}
          className="px-8 py-3 rounded-lg text-sm font-mono tracking-wider uppercase transition-all duration-200"
          style={{
            background: "oklch(0.82 0.12 80)",
            color: "oklch(0.12 0.02 260)",
          }}
        >
          <Home className="w-4 h-4 mr-2" />
          Go Home
        </Button>
      </div>
    </div>
  );
}
