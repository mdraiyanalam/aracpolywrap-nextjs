# Asset register

Every image shipped with the site, where it came from and whether we may use it. **Confirm every
licence before launch** (backlog item APW-055).

Originals came from the legacy repository (`src/components/images/`). During migration (APW-005)
each file was converted to sRGB, resized to at most 2400 px (hero) or 1200 px (products) wide,
saved as progressive JPEG at quality 82, and stripped of all metadata. The metadata found **before**
stripping is recorded below.

| File (`src/assets/images/…`)        | Legacy file                     | Size (px)   | Metadata found in original                      | Licence status                                                                          |
| ----------------------------------- | ------------------------------- | ----------- | ----------------------------------------------- | --------------------------------------------------------------------------------------- |
| `brand/logo.png`                    | `navbar/logo.png`               | 184 × 63    | —                                               | Company-owned. **Low resolution; request SVG.**                                         |
| `hero/factory.jpg`                  | `carousel/1.jpg`                | 2400 × 960  | GPS coordinates (removed)                       | Presumed company-owned photo. Confirm.                                                  |
| `hero/stretch-film-rolls.jpg`       | `carousel/2.jpg`                | 2400 × 1600 | CMYK colour profile                             | Unknown. Confirm.                                                                       |
| `hero/shrink-wrapped-bottles.jpg`   | `carousel/3.jpg`                | 1200 × 800  | Artist: _Paul Greenwood_; Canon EOS-1Ds Mark II | **Third-party photo. Licence required.**                                                |
| `hero/agricultural-mulch-field.jpg` | `carousel/4.jpg`                | 700 × 500   | Copyright: _Xinhua News Agency_                 | **Third-party photo. Licence required.** Also too small for a full-width hero; replace. |
| `products/stretch-film.jpg`         | `product/Stretch-Film-Roll.jpg` | 450 × 450   | —                                               | Unknown. Confirm.                                                                       |
| `products/shrink-film.jpg`          | `product/Shrink.jpg`            | 1200 × 746  | Copyright: _amstockphoto_                       | **Stock photo. Licence required.**                                                      |
| `products/fmcg-lamination-film.jpg` | `product/fmcg.jpg`              | 1200 × 812  | CMYK colour profile                             | Unknown. Confirm.                                                                       |
| `products/agricultural-film.jpg`    | `product/Agri.jpg`              | 620 × 644   | —                                               | Unknown. Confirm.                                                                       |
| `products/protection-film.jpg`      | `product/PRO.jpg`               | 625 × 550   | CMYK colour profile                             | Unknown. Confirm.                                                                       |
| `products/custom-films.jpg`         | `product/Untitled-55.jpg`       | 1103 × 792  | CMYK colour profile                             | Unknown. Confirm.                                                                       |

## Adding a new image

1. Export as sRGB JPEG (photos) or PNG/SVG (graphics). Keep photos at most 2400 px wide.
2. Strip metadata (for example `exiftool -all= file.jpg`), especially GPS data.
3. Save under `src/assets/images/<area>/<descriptive-kebab-name>.<ext>` and import it statically,
   so Next.js knows its dimensions and generates a blur placeholder.
4. Add a row to this table with the source and licence.
