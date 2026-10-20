import { CircleCheck } from "lucide-react";
import Image from "next/image";
import { BrandRule } from "@/components/ui/brand-rule";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { products } from "@/content/products";
import { sectionCopy } from "@/content/sections";
import type { Product } from "@/content/types";
import { cn } from "@/lib/cn";

/** Long, sentence-style features read better in one column. */
const SHORT_FEATURE_MAX_LENGTH = 60;

/**
 * Product range on a decorated timeline: a vertical spine with numbered nodes and
 * horizontal connectors; items alternate sides on large screens.
 */
export function ProductsSection() {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading id="products-heading" {...sectionCopy.products} />

        <nav aria-label="Product shortcuts" className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {products.map((product) => (
              <li key={product.slug}>
                <a
                  href={`#${product.slug}`}
                  className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm ring-1 ring-brand-100 transition hover:bg-brand-700 hover:text-white"
                >
                  {product.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ol className="relative mt-16 lg:mt-20">
          <span
            aria-hidden="true"
            className="absolute inset-y-0 left-6 w-0.5 -translate-x-1/2 bg-linear-to-b from-brand-100 via-brand-700 to-brand-100 lg:left-1/2"
          />
          {products.map((product, index) => (
            <ProductItem key={product.slug} product={product} index={index} />
          ))}
        </ol>
      </Container>
    </section>
  );
}

function ProductItem({ product, index }: { product: Product; index: number }) {
  const reversed = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const shortFeatures = product.features.every((f) => f.length <= SHORT_FEATURE_MAX_LENGTH);

  return (
    <li
      id={product.slug}
      aria-labelledby={`${product.slug}-heading`}
      className="relative grid scroll-mt-28 items-center gap-8 pb-20 pl-16 last:pb-0 lg:grid-cols-2 lg:gap-32 lg:pl-0"
    >
      {/* Timeline node and horizontal connector */}
      <span
        aria-hidden="true"
        className="absolute top-0 left-6 z-10 grid size-12 -translate-x-1/2 place-items-center rounded-full border-4 border-slate-50 bg-brand-700 font-display text-sm font-bold text-white shadow-lg ring-2 ring-accent-500 lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2"
      >
        {number}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 hidden h-0.5 w-32 -translate-x-1/2 bg-linear-to-r from-accent-500 via-brand-700 to-accent-500 lg:block"
      />

      <div className={cn("relative", reversed && "lg:order-2")}>
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 translate-y-4 rounded-2xl",
            reversed ? "-translate-x-4 bg-accent-100" : "translate-x-4 bg-brand-100",
          )}
        />
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 80vw, 100vw"
            placeholder="blur"
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      <div className={cn(reversed && "lg:order-1")}>
        <p className="text-sm font-semibold tracking-[0.2em] text-accent-600 uppercase">
          Product {number}
        </p>
        <h3 id={`${product.slug}-heading`} className="mt-2 text-2xl font-extrabold sm:text-3xl">
          {product.name}
        </h3>
        <BrandRule />
        <p className="mt-5 text-lg leading-relaxed text-slate-700">{product.summary}</p>
        {product.details?.map((paragraph) => (
          <p key={paragraph} className="mt-4 leading-relaxed text-slate-700">
            {paragraph}
          </p>
        ))}
        {product.featuresHeading ? (
          <p className="mt-6 font-semibold text-brand-900">{product.featuresHeading}</p>
        ) : null}
        <ul
          className={cn(
            "mt-4 grid gap-x-6 gap-y-3",
            shortFeatures && "sm:grid-cols-2",
            !product.featuresHeading && "mt-6",
          )}
        >
          {product.features.map((feature) => (
            <li key={feature} className="flex gap-3">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-600" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
