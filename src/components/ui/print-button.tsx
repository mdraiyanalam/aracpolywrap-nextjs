"use client";

import { Printer } from "lucide-react";

/** Opens the browser print dialog, where visitors can also "Save as PDF". */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-600 px-6 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-accent-700 print:hidden"
    >
      <Printer aria-hidden="true" className="size-5" />
      Print or save as PDF
    </button>
  );
}
