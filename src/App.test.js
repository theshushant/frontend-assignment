import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  beforeEach(() => {
    render(<App />);
  });


  it("displays loading spinner initially", () => {
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("displays table after data is fetched", async () => {

    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());

    // Wait for the table to render after fetching data
    await waitFor(() => screen.getByRole('heading', { name: /Highly Funded Kickstarter Projects/i }));


    // Use getByText directly to match headers by their text
    // expect(screen.getByText(/S.No./i)).toBeInTheDocument();
    const percentageFunded = "Percentage Funded";
    expect(screen.getByText(percentageFunded)).toBeInTheDocument();
    expect(screen.getByText(/Amount Pledged/i)).toBeInTheDocument();
  });

  it("displays table after data is fetched", async () => {
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());

    await waitFor(() => screen.getByRole('heading', { name: /Highly Funded Kickstarter Projects/i }));

    // Check if the table headers are rendered using role and name
    expect(screen.getByRole('columnheader', { name: /S\.No\./i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Percentage Funded/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /Amount Pledged/i })).toBeInTheDocument();
  });

  it("disables 'Previous' button on the first page", async () => {
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());

    await waitFor(() => screen.getByRole('heading', { name: /Highly Funded Kickstarter Projects/i }));
    const prevButton = screen.getByTestId("previous-button");
    expect(prevButton).toBeDisabled();
  });

  it("paginates correctly when clicking 'Next' button", async () => {
    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());

    await waitFor(() => screen.getByRole('heading', { name: /Highly Funded Kickstarter Projects/i }));

    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);

    await waitFor(() => expect(screen.getByText(/Page 2/i)).toBeInTheDocument());

    const prevButton = screen.getByTestId("previous-button");
    expect(prevButton).not.toBeDisabled();
  });
});
