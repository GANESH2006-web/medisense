import React from "react";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-[420px] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 px-6 py-20 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(45, 212, 191, 0.45), transparent 32%), radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.25), transparent 30%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-teal-300">
          MediSense AI
        </p>
        <h1
          id="hero-title"
          className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          Your Health, Empowered by AI
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-200 sm:text-xl">
          Explore symptoms, learn about medical conditions, and discover
          evidence-informed health information with MediSense.
        </p>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300">
          AI-generated information is not a medical diagnosis. Consult a
          qualified healthcare professional for medical advice.
        </p>
      </div>
    </section>
  );
}
