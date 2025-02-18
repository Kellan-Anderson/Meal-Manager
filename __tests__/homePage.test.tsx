import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react"
import { MarkdownCheckbox, HomepageNav, GetStartedCard } from "~/app/page";

describe("The home page", () => {
  /**
   * We are not testing how the homepage renders the markdown content at this time due to an issue while
   * Rendering next-mdx-remote. We are testing other components within the home page.
   */

  afterEach(() => vi.clearAllMocks())

  describe("The markdown checkbox", () => {
    test("Renders an unchecked checkbox appropriately", () => {
      const contentToTest = <MarkdownCheckbox>[ ] This is an unchecked box</MarkdownCheckbox>;
      render(contentToTest);

      const checkbox = screen.getByRole("checkbox", { checked: false });
      expect(checkbox).toBeDefined();

      const text = screen.getByText("This is an unchecked box");
      expect(text).toBeDefined();
    });

    test("Renders an checked checkbox appropriately", () => {
      const contentToTest = <MarkdownCheckbox>[x] This is a checked box</MarkdownCheckbox>;
      render(contentToTest);

      const checkbox = screen.getByRole("checkbox", { checked: true });
      expect(checkbox).toBeDefined();

      const text = screen.getByText("This is a checked box");
      expect(text).toBeDefined();
    });

    test("Does not render a checkbox when one is not present", () => {
      const contentToTest = <MarkdownCheckbox>There should not be a checkbox here</MarkdownCheckbox>;
      render(contentToTest);

      expect(screen.queryByRole("checkbox")).toBeNull();

      const text = screen.getByText("There should not be a checkbox here");
      expect(text).toBeDefined();
    })
  });

  test("Should render a navbar with a sign in button", async () => {
    render(<HomepageNav />);

    expect(screen.getByRole("navigation")).toBeDefined();
    expect(screen.getByRole("link", { name: "Sign In" })).toBeDefined();
  });

  test("Should render a card asking the user if they want to sign in", () => {
    render(<GetStartedCard />);

    expect(screen.getByRole("heading", { name: "Ready to get started?" })).toBeDefined();
    expect(screen.getByRole("link", { name:"Sign in to get started!" })).toBeDefined();
  })

});