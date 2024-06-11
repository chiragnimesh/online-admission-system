import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { vi, describe, it, expect } from "vitest";
// import UniversityList from '../path/to/UniversityList'; // Adjust the import as needed
import { getUniversityDetailsByCity } from "../Services/UniversityService";
import { within } from "@testing-library/react";
import UniversityList from "../components/UniversityList";

// Mock the service
vi.mock("../Services/UniversityService", () => ({
  getUniversityDetailsByCity: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ city: "New Delhi" }),
  };
});

describe("UniversityList", () => {
  it("renders universities for the given city and navigates to college details", async () => {
    // Mock data for getUniversityDetailsByCity
    const mockUniversityData = {
      data: [
        {
          universityId: 1,
          name: "University A",
          address: {
            city: "New Delhi",
            state: "Delhi",
            country: "India",
            zipcode: "110001",
          },
        },
        {
          universityId: 2,
          name: "University B",
          address: {
            city: "New Delhi",
            state: "Delhi",
            country: "India",
            zipcode: "110002",
          },
        },
      ],
    };

    getUniversityDetailsByCity.mockResolvedValue(mockUniversityData);

    render(
      <BrowserRouter>
        <UniversityList />
      </BrowserRouter>
    );

    // Ensure the data is fetched and rendered
    await waitFor(() => {
      expect(
        screen.getByText(/Universities in New Delhi/i)
      ).toBeInTheDocument();
      expect(screen.getAllByText(/University A/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/University B/i).length).toBeGreaterThan(0);
    });

    // Test navigation by clicking the link
    const universityCards = screen.getAllByText(/University A/i);
    const universityACard = universityCards[0].closest(".custom-card");
    const collegeLink = within(universityACard).getByText(
      /Colleges under University A/i
    );
    fireEvent.click(collegeLink);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/colleges/1");
    });
  });

  it("renders no university found message when no data is available", async () => {
    // Mock no data for getUniversityDetailsByCity
    getUniversityDetailsByCity.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <UniversityList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/No University Found in New Delhi/i)
      ).toBeInTheDocument();
    });
  });
});
