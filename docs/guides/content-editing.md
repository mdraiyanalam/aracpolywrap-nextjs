# Content editing guide

This guide is for anyone updating text, contact details, figures or images, including people who
do not normally write code. Every change goes through a pull request, which the Product Owner
reviews.

## Where things live

All content is in **`src/content/`**. Edit the values between quotes; keep the commas and brackets.

| What you want to change                                           | File              |
| ----------------------------------------------------------------- | ----------------- |
| Phone number, e-mail, addresses, map, Facebook link, PDF brochure | `company.ts`      |
| Products: names, descriptions, features, photos                   | `products.ts`     |
| Hero slides: headlines, descriptions, buttons                     | `hero.ts`         |
| Numbers in the blue band (clients, countries, shipments)          | `stats.ts`        |
| Services cards                                                    | `services.ts`     |
| Testimonials and service-level percentages                        | `testimonials.ts` |
| About us text and values                                          | `about.ts`        |
| Section headings and intros                                       | `sections.ts`     |
| Menu items                                                        | `navigation.ts`   |

## Editing on GitHub (no local setup)

1. Open the file on GitHub and click the pencil icon (_Edit this file_).
2. Make the change. Example, replacing the placeholder phone number in `company.ts`:

   ```ts
   phone: {
     display: "+880 2-5503-0000", // how it appears on the page
     href: "tel:+880255030000",   // digits only, with country code, for click-to-call
   },
   ```

   Delete the `// @placeholder …` comment on lines you have replaced with real content.

3. Choose _Create a new branch and start a pull request_, describe the change and submit.
4. CI checks the change. If a check fails, the PR shows what is wrong.

## Replacing sample testimonials

In `testimonials.ts`, for each quote:

1. Replace `quote`, `role` and `organisation` with approved text (get written consent from the
   customer).
2. Remove `sample: true` (this removes the "Sample testimonial" badge).
3. Delete the `// @placeholder` comments.

For the four percentages, enter measured values, set `serviceLevelsAreSamples = false` and
delete the markers.

## Adding or changing a product

Products appear on the home page, in the catalogue, in the footer and in search-engine data, all
from the one entry in `products.ts`:

```ts
{
  slug: "barrier-film",          // used in the link /#barrier-film: lower case, hyphens
  name: "Barrier film",
  image: barrierFilm,            // imported at the top of the file
  imageAlt: "Roll of multi-layer barrier film",   // describe the photo for blind users
  summary: "One or two sentences introducing the product.",
  featuresHeading: "Key features include:",        // optional
  features: ["Oxygen barrier", "Food-contact grade"],
},
```

Photos: see [adding a new image](../content/asset-register.md#adding-a-new-image).

## Before publishing

```bash
npm run content:check
```

This lists any remaining placeholders and must pass before a production release. Update the
[content inventory](../content/content-inventory.md) status when content is approved.

## Writing style

- British English (colour, specialised) and sentence case for headings ("Our products").
- Short sentences; lead with the benefit to the customer.
- Do not publish testimonials, figures or claims that have not been approved and cannot be backed up.
