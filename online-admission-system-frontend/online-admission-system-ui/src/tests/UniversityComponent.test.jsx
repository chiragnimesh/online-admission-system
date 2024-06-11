import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, it, expect } from "vitest";
import UniversityComponent from "../components/UniversityComponent";
// import UniversityComponent from '../components/UniversityComponent';

// Mock the useNavigate hook
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("UniversityComponent", () => {
  it('navigates to program schedule apply when "Apply here" button is clicked', async () => {
    render(
      <BrowserRouter>
        <UniversityComponent />
      </BrowserRouter>
    );

    const applyButton = screen.getByText("Apply here");
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/program-schedule-apply");
    });
  });

  it("renders upcoming events correctly", async () => {
    render(
      <BrowserRouter>
        <UniversityComponent />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Jul 14, 2024")).toBeInTheDocument();
      expect(
        screen.getByText("MATLAB Programming for Physical Chemical Sciences")
      ).toBeInTheDocument();
      expect(screen.getByText("Jun 30, 2024")).toBeInTheDocument();
      expect(
        screen.getByText("Yusuf Hamied Chemistry Camp at DTU")
      ).toBeInTheDocument();
      expect(screen.getByText("Jul 28, 2024")).toBeInTheDocument();
      expect(
        screen.getByText("Multivariate Data Analysis using R and Python")
      ).toBeInTheDocument();
      expect(screen.getByText("Jul 27, 2024")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Sufi Culture in the Indus Valley The Making of a Vernacular Cosmopolitan Paradigm"
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Sep 01, 2024")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Fundamental Principles of Indoor Environmental Quality"
        )
      ).toBeInTheDocument();
    });
  });

  test("renders the marquee text correctly", () => {
    render(<UniversityComponent />);
    const marqueeElement = screen.getByText((content, element) => {
      return (
        content.includes("The IKS Calender of 2024 (India of Ages)") &&
        content.includes(
          "NOT an officially published calender of IIT Kharagpur."
        )
      );
    });
    expect(marqueeElement).toBeInTheDocument();
  });
});
