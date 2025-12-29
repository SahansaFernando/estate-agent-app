import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PropertyDetails from "./PropertyDetails";

test("renders property details page", () => {
  render(
    <MemoryRouter initialEntries={["/property/prop1"]}>
      <Routes>
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText(/property overview/i)).toBeInTheDocument();
});
