import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChartLoading } from "./chart-loading";

// Mock the Loading component to avoid dependency on its implementation
vi.mock("@/components/loading/loading", () => ({
  Loading: (props: { type: string; width: string; height: number }) => (
    <div data-testid="loading" {...props} />
  ),
}));

describe("ChartLoading", () => {
  it("renders a container div", () => {
    render(<ChartLoading />);
    const container = document.querySelector(
      "div.space-y-6.w-full.h-96.mx-auto.p-0"
    );
    expect(container).toBeInTheDocument();
  });

  it("renders exactly 7 Loading components with correct props", () => {
    render(<ChartLoading />);
    const loadings = screen.getAllByTestId("loading");
    expect(loadings).toHaveLength(7);
    loadings.forEach((loading) => {
      expect(loading).toHaveAttribute("type", "rect");
      expect(loading).toHaveAttribute("width", "100%");
      expect(loading).toHaveAttribute("height", "32");
    });
  });
});
