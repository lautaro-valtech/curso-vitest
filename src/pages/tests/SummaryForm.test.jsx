import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest"
import SummaryForm from "../summary/SummaryForm"

test("Initial conditions", () => {
  render(<SummaryForm />);

  const checkboxElement = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const confirmButtonElement = screen.getByRole("button", { name: /confirm order/i });

  expect(checkboxElement).not.toBeChecked();
  expect(confirmButtonElement).toBeDisabled();
});

test("Checkbox enables confirm button on the first click and disable on the second click", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);

  const checkboxElement = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const confirmButtonElement = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkboxElement);
  expect(confirmButtonElement).toBeEnabled();

  await user.click(checkboxElement);
  expect(confirmButtonElement).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);

  // popover starts out hidden
  const nullPopover = screen.queryByRole("tooltip", { name: /no ice cream will actually be delivered/i });
  expect(nullPopover).not.toBeInTheDocument();

  // popover appears on mouseover of checkbox label
  const termsAndConditionsElement = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditionsElement);
  const popover = screen.getByRole("tooltip", { name: /no ice cream will actually be delivered/i });
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  await user.unhover(termsAndConditionsElement);
  expect(popover).not.toBeInTheDocument();
});