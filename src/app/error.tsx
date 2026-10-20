"use client";

import { Container } from "@/components/ui/container";

/** Route-level error boundary. Production errors only expose a digest, never the message. */
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  const digest = error instanceof Error && "digest" in error ? String(error.digest) : undefined;

  return (
    <Container className="grid min-h-[60vh] place-items-center py-24 text-center">
      <div className="max-w-xl">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Something went wrong</h1>
        <p className="mt-4 text-lg text-slate-600">
          Please try again. If the problem continues, contact us by phone or e-mail.
        </p>
        {digest ? <p className="mt-2 text-sm text-slate-500">Reference: {digest}</p> : null}
        <button
          type="button"
          onClick={() => retry()}
          className="mt-8 rounded-full bg-accent-600 px-6 py-3 font-semibold text-white hover:bg-accent-700"
        >
          Try again
        </button>
      </div>
    </Container>
  );
}
