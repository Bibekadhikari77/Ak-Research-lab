import { beforeEach, describe, expect, it, vi } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithQueryClient } from "@/test/test-utils";
import { UsersView } from "./users-view";

const mockUsers = [
  { id: 1, name: "Leanne Graham", email: "leanne@example.com" },
  { id: 2, name: "Ervin Howell", email: "ervin@example.com" },
];

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = input.toString();
      const method = init?.method ?? "GET";

      if (method === "GET" && url.endsWith("/users")) {
        return new Response(JSON.stringify(mockUsers), { status: 200 });
      }

      if (method === "DELETE") {
        return new Response(null, { status: 200 });
      }

      throw new Error(`Unhandled request in test: ${method} ${url}`);
    }),
  );
});

describe("UsersView", () => {
  it("renders users fetched with useQuery", async () => {
    renderWithQueryClient(<UsersView />);

    expect(await screen.findByText("Leanne Graham")).toBeInTheDocument();
    expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
  });

  it("removes a user from the list after the delete mutation succeeds", async () => {
    const user = userEvent.setup();
    renderWithQueryClient(<UsersView />);

    await screen.findByText("Leanne Graham");
    await user.click(screen.getAllByRole("button", { name: "Delete" })[0]);

    await waitFor(() =>
      expect(screen.queryByText("Leanne Graham")).not.toBeInTheDocument(),
    );
    expect(screen.getByText("Ervin Howell")).toBeInTheDocument();
  });
});
