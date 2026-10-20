import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class names with a single space", () => {
    expect(cn("a", "b", "c")).toBe("a b c");
  });

  it("drops falsy values", () => {
    const isActive = false;
    expect(cn("base", isActive && "active", null, undefined, "")).toBe("base");
  });
});
