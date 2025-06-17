import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FeedbackButton } from "./feedback-button";
import { vi, describe, it, expect } from "vitest";

// Mock scrollIntoView to avoid errors in jsdom
globalThis.HTMLElement.prototype.scrollIntoView = vi.fn();

describe("FeedbackButton", () => {
  it("renders with default label", () => {
    render(<FeedbackButton />);
    expect(
      screen.getByRole("button", { name: /send feedback/i })
    ).toBeInTheDocument();
  });

  it("renders with bug label when type='bug'", () => {
    render(<FeedbackButton type="bug" />);
    expect(
      screen.getByRole("button", { name: /report a bug/i })
    ).toBeInTheDocument();
  });

  it("opens the sheet and displays textarea", () => {
    render(<FeedbackButton />);
    fireEvent.click(screen.getByRole("button", { name: /send feedback/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your feedback/i)).toBeInTheDocument();
  });

  it("allows typing and submitting feedback", async () => {
    render(<FeedbackButton />);
    fireEvent.click(screen.getByRole("button", { name: /send feedback/i }));

    const textarea = screen.getByPlaceholderText(/your feedback/i);
    fireEvent.change(textarea, { target: { value: "Great app!" } });

    const submitButton = screen.getByRole("button", { name: /send feedback/i });
    fireEvent.click(submitButton);

    // Button should show thank you after submit
    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();

    // Sheet should close after timeout
    await waitFor(
      () => {
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      },
      { timeout: 1500 }
    );
  });

  it("can be cancelled", () => {
    render(<FeedbackButton />);
    fireEvent.click(screen.getByRole("button", { name: /send feedback/i }));
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
