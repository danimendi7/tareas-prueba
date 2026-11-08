import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ItemTarea } from "./ItemTarea";

vi.mock("@/lib/tareas/acciones", () => ({ cambiarHecha: vi.fn() }));

describe("ItemTarea", () => {
  it("una tarea pendiente no aparece tachada", () => {
    render(<ItemTarea tarea={{ id: "1", titulo: "Pendiente", hecha: false }} />);
    expect(screen.getByRole("checkbox", { name: "Pendiente" })).not.toBeChecked();
    expect(screen.getByText("Pendiente")).not.toHaveClass("line-through");
  });

  it("una tarea hecha aparece marcada y tachada", () => {
    render(<ItemTarea tarea={{ id: "1", titulo: "Hecha", hecha: true }} />);
    expect(screen.getByRole("checkbox", { name: "Hecha" })).toBeChecked();
    expect(screen.getByText("Hecha")).toHaveClass("line-through");
  });
});
