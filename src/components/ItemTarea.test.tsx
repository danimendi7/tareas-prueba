import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ItemTarea } from "./ItemTarea";

vi.mock("@/lib/tareas/acciones", () => ({
  borrarTarea: vi.fn(),
  cambiarHecha: vi.fn(),
  editarTitulo: vi.fn(),
}));

describe("ItemTarea", () => {
  afterEach(cleanup);

  it("una tarea pendiente no aparece tachada", () => {
    render(<ItemTarea tarea={{ id: "1", titulo: "Pendiente", hecha: false }} />);
    expect(screen.getByRole("checkbox", { name: "Pendiente" })).not.toBeChecked();
    expect(screen.getByText("Pendiente")).not.toHaveClass("line-through");
  });

  it("el botón de borrar indica a qué tarea afecta", () => {
    render(<ItemTarea tarea={{ id: "1", titulo: "Limpiar", hecha: false }} />);
    expect(screen.getByRole("button", { name: "Borrar Limpiar" })).toBeEnabled();
  });

  it("una tarea hecha aparece marcada y tachada", () => {
    render(<ItemTarea tarea={{ id: "1", titulo: "Hecha", hecha: true }} />);
    expect(screen.getByRole("checkbox", { name: "Hecha" })).toBeChecked();
    expect(screen.getByText("Hecha")).toHaveClass("line-through");
  });

  it("Editar abre el formulario y al cancelar devuelve el foco al botón", () => {
    render(<ItemTarea tarea={{ id: "1", titulo: "Editable", hecha: false }} />);
    fireEvent.click(screen.getByRole("button", { name: "Editar Editable" }));
    expect(screen.getByLabelText("Nuevo título de Editable")).toHaveFocus();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(screen.getByRole("button", { name: "Editar Editable" })).toHaveFocus();
  });
});
