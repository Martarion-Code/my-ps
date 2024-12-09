import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CreatePsPage from "@/app/admin/ps/create/page.jsx"; // Update the path to match your file structure
import { message } from "antd";

// Mock the `fetch` and `message` functions
global.fetch = jest.fn();
jest.mock("antd", () => {
  const antd = jest.requireActual("antd");
  return {
    ...antd,
    message: {
      success: jest.fn(),
      error: jest.fn(),
    },
  };
});

describe("CreatePsPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form correctly", () => {
    render(<CreatePsPage />);
    // expect(screen.getByText("Create PS")).toBeInTheDocument();
    expect(screen.getByLabelText("Kategori")).toBeInTheDocument();
    expect(screen.getByLabelText("Harga")).toBeInTheDocument();
    expect(screen.getByLabelText("Stok")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create/i })).toBeInTheDocument();
  });

  it("shows validation errors when required fields are empty", async () => {
    render(<CreatePsPage />);
    fireEvent.click(screen.getByRole("button", { name: /create/i }));
    expect(await screen.findByText("Please enter the kategori!")).toBeInTheDocument();
    expect(await screen.findByText("Please enter the harga!")).toBeInTheDocument();
    expect(await screen.findByText("Please enter the stok!")).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    render(<CreatePsPage />);
    fireEvent.change(screen.getByLabelText("Kategori"), { target: { value: "Console" } });
    fireEvent.change(screen.getByLabelText("Harga"), { target: { value: 500000 } });
    fireEvent.change(screen.getByLabelText("Stok"), { target: { value: 10 } });

    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    // Ensure the API was called with correct data
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/ps/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kategori: "Console",
          harga: 500000,
          stok: 10,
        }),
      });
    });

    // Ensure success message is displayed
    expect(message.success).toHaveBeenCalledWith("PS created successfully!");
  });

  it("handles form submission failure", async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    render(<CreatePsPage />);
    fireEvent.change(screen.getByLabelText("Kategori"), { target: { value: "Console" } });
    fireEvent.change(screen.getByLabelText("Harga"), { target: { value: 500000 } });
    fireEvent.change(screen.getByLabelText("Stok"), { target: { value: 10 } });

    fireEvent.click(screen.getByRole("button", { name: /create/i }));

    // Ensure the API was called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    // Ensure error message is displayed
    expect(message.error).toHaveBeenCalledWith("Failed to create PS.");
  });
});
