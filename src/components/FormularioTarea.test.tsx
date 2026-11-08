import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FormularioTarea } from "./FormularioTarea";

vi.mock("@/lib/tareas/acciones", () => ({ crearTarea: vi.fn() }));

describe("FormularioTarea", () => {
  it("etiqueta el campo y limita el título a 120 caracteres", () => {
    render(<FormularioTarea />);
    expect(screen.getByLabelText("Nueva tarea")).toHaveAttribute("maxLength", "120");
    expect(screen.getByRole("button", { name: "Añadir" })).toBeEnabled();
  });
});
