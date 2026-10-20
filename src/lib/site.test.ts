describe("site URL helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("builds absolute URLs at a domain root", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://aracpolywrap.com");
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "");
    const { absoluteUrl, assetUrl, withBasePath } = await import("./site");

    expect(absoluteUrl("/")).toBe("https://aracpolywrap.com/");
    expect(absoluteUrl("/catalogue")).toBe("https://aracpolywrap.com/catalogue");
    expect(assetUrl("/_next/static/media/logo.png")).toBe(
      "https://aracpolywrap.com/_next/static/media/logo.png",
    );
    expect(withBasePath("/icon.svg")).toBe("/icon.svg");
  });

  it("keeps the sub-path of a GitHub Pages project site", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://mdraiyanalam.github.io/aracpolywrap");
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/aracpolywrap");
    const { absoluteUrl, assetUrl, withBasePath } = await import("./site");

    expect(absoluteUrl("/")).toBe("https://mdraiyanalam.github.io/aracpolywrap/");
    expect(absoluteUrl("/catalogue")).toBe("https://mdraiyanalam.github.io/aracpolywrap/catalogue");
    expect(absoluteUrl("/#products")).toBe("https://mdraiyanalam.github.io/aracpolywrap/#products");
    // Static image imports already include the base path.
    expect(assetUrl("/aracpolywrap/_next/static/media/logo.png")).toBe(
      "https://mdraiyanalam.github.io/aracpolywrap/_next/static/media/logo.png",
    );
    expect(withBasePath("/icon.svg")).toBe("/aracpolywrap/icon.svg");
  });

  it("uses trailing slashes for page URLs in the static export", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://mdraiyanalam.github.io/aracpolywrap");
    vi.stubEnv("NEXT_PUBLIC_BASE_PATH", "/aracpolywrap");
    vi.stubEnv("NEXT_PUBLIC_STATIC_EXPORT", "true");
    const { absoluteUrl, pagePath } = await import("./site");

    expect(absoluteUrl("/catalogue")).toBe(
      "https://mdraiyanalam.github.io/aracpolywrap/catalogue/",
    );
    expect(absoluteUrl("/sitemap.xml")).toBe(
      "https://mdraiyanalam.github.io/aracpolywrap/sitemap.xml",
    );
    expect(absoluteUrl("/#products")).toBe("https://mdraiyanalam.github.io/aracpolywrap/#products");
    expect(pagePath("/")).toBe("/aracpolywrap/");
    expect(pagePath("/catalogue")).toBe("/aracpolywrap/catalogue/");
  });
});
