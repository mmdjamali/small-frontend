import { describe, expect, test } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import "react";

import PasswordInput from "@/components/password-input";

test("Testing password input for hiding and showing logic of value", () => {
  const { getByTestId } = render(<PasswordInput />);

  const input = getByTestId("password-input");
  const button = getByTestId("password-input-button");

  fireEvent.click(button);

  expect(input.getAttribute("type")).toBe("text");

  fireEvent.click(button);

  expect(input.getAttribute("type")).toBe("password");
});
