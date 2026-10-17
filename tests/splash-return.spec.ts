import { test, expect } from "@playwright/test";

for (const width of [1440, 390]) {
  test(`returning from projects stays silent at ${width}px`, async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: 900 });
    await page.addInitScript(() => {
      const originalPlay = HTMLMediaElement.prototype.play;
      HTMLMediaElement.prototype.play = function () {
        if (this.getAttribute("src")?.includes("water-splash")) {
          document.documentElement.dataset.splashPlays = String(Number(document.documentElement.dataset.splashPlays ?? 0) + 1);
        }
        return originalPlay.call(this);
      };
    });
    await page.goto("http://localhost:3000");
    await expect(page.locator("html")).toHaveAttribute("data-portfolio-ready", "true", { timeout: 15000 });
    const hero = page.locator("#hero");
    await expect(hero).toHaveAttribute("data-dive", "true");

    if (width > 700) {
      // Navbar anchor navigation may pass through the waterline, but is not a dive.
      const beforeNavigation = Number(await page.locator("html").getAttribute("data-splash-plays") ?? 0);
      await page.getByRole("link", { name: "Work", exact: true }).click();
      await page.waitForTimeout(1800);
      expect(Number(await page.locator("html").getAttribute("data-splash-plays") ?? 0)).toBe(beforeNavigation);
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    for (const browserBack of [false, true]) {
      const slug = browserBack ? "photography" : "granic";
      await page.locator(`a[href="/work/${slug}"]`).click();
      await expect(page).toHaveURL(new RegExp(`/work/${slug}$`));
      await expect.poll(() => page.evaluate(() => sessionStorage.getItem("portfolio:skip-hero-splash-on-return"))).toBe("true");
      const before = await page.locator("html").getAttribute("data-splash-plays");
      if (browserBack) await page.goBack();
      else if (width < 700) await page.getByRole("link", { name: "Josh Hatchard", exact: true }).click();
      else await page.getByRole("button", { name: "← Back" }).click();
      await expect(page).toHaveURL("http://localhost:3000/");
      await expect(hero).toHaveAttribute("data-dive", "true");
      await page.mouse.move(width / 2, 400);
      await page.mouse.wheel(0, 100);
      await page.waitForTimeout(1200);
      // Delayed layout/scroll restoration can cross the waterline repeatedly.
      for (const top of [0, 4000, 0, 4200]) {
        await page.evaluate(y => window.scrollTo(0, y), top);
        await page.waitForTimeout(250);
        // Real downward input at a temporary hero position must not unlock it.
        await page.mouse.wheel(0, 100);
      }
      await page.setViewportSize({ width, height: 850 });
      await page.evaluate(() => window.dispatchEvent(new Event("hero-splash")));
      expect(await page.locator("html").getAttribute("data-splash-plays")).toBe(before);
      expect(await page.evaluate(() => sessionStorage.getItem("portfolio:skip-hero-splash-on-return"))).toBe("true");
    }

    // A deliberate new dive still plays once after returning to the hero.
    await page.mouse.move(width / 2, 400);
    await page.mouse.wheel(0, -10000);
    await expect(hero).toHaveAttribute("data-dive-progress", "0.0000");
    const before = Number(await page.locator("html").getAttribute("data-splash-plays") ?? 0);
    await page.mouse.move(width / 2, 400);
    await page.mouse.wheel(0, 100);
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem("portfolio:skip-hero-splash-on-return"))).toBeNull();
    await page.mouse.wheel(0, 4000);
    await expect.poll(async () => Number(await page.locator("html").getAttribute("data-splash-plays") ?? 0)).toBe(before + 1);
  });
}
