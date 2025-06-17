import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ChangeChartType, CHART_TYPES } from "./change-chart-type";

describe("ChangeChartType", () => {
  it("renders all chart type buttons", () => {
    const setValue = vi.fn();
    render(<ChangeChartType value="line" setValue={setValue} />);
    CHART_TYPES.forEach((type) => {
      expect(
        screen.getByRole("button", { name: new RegExp(type.label, "i") })
      ).toBeInTheDocument();
    });
  });

  it("highlights the active chart type", () => {
    const setValue = vi.fn();
    render(<ChangeChartType value="bar" setValue={setValue} />);
    const barButton = screen.getByRole("button", { name: /bar/i });
    expect(barButton).toHaveAttribute("aria-pressed", "true");
    // Other buttons should not be pressed
    CHART_TYPES.filter((t) => t.value !== "bar").forEach((type) => {
      const btn = screen.getByRole("button", {
        name: new RegExp(type.label, "i"),
      });
      expect(btn).toHaveAttribute("aria-pressed", "false");
    });
  });

  it("calls setValue with correct type on click", () => {
    const setValue = vi.fn();
    render(<ChangeChartType value="line" setValue={setValue} />);
    const barButton = screen.getByRole("button", { name: /bar/i });
    fireEvent.click(barButton);
    expect(setValue).toHaveBeenCalledWith("bar");
  });
});
