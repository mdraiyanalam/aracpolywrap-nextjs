import { Quote } from "lucide-react";
import { CircularMeter } from "@/components/ui/circular-meter";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { sectionCopy } from "@/content/sections";
import { serviceLevels, serviceLevelsAreSamples, testimonials } from "@/content/testimonials";

function SampleBadge({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900 ring-1 ring-amber-300">
      {children}
    </span>
  );
}

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative overflow-hidden bg-brand-50 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading id="testimonials-heading" {...sectionCopy.testimonials} />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-brand-100 sm:p-10">
            <h3 className="text-center text-xl font-bold">Our service levels</h3>
            {serviceLevelsAreSamples ? (
              <p className="mt-3 text-center">
                <SampleBadge>Illustrative figures — awaiting confirmation</SampleBadge>
              </p>
            ) : null}
            <div className="mt-8 grid grid-cols-1 gap-10 min-[400px]:grid-cols-2">
              {serviceLevels.map((level) => (
                <CircularMeter key={level.label} {...level} />
              ))}
            </div>
          </div>

          <ul className="space-y-6">
            {testimonials.map((testimonial) => (
              <li key={testimonial.quote}>
                <figure className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-brand-100">
                  <Quote
                    aria-hidden="true"
                    className="absolute top-6 right-6 size-10 text-accent-100"
                  />
                  {testimonial.sample ? <SampleBadge>Sample testimonial</SampleBadge> : null}
                  <blockquote className="mt-4 text-lg leading-relaxed text-slate-800">
                    <p>“{testimonial.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-accent-500" />
                    <span>
                      <span className="block font-semibold text-brand-900">{testimonial.role}</span>
                      <span className="block text-sm text-slate-600">
                        {testimonial.organisation}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
