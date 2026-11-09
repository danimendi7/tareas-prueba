import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { editarTitulo } from "@/lib/tareas/acciones";
import { FormularioEditarTitulo } from "./FormularioEditarTitulo";

vi.mock("@/lib/tareas/acciones", () => ({ editarTitulo: vi.fn() }));

const accion = vi.mocked(editarTitulo);

function montar() {
  const alCerrar = vi.fn();
  render(<FormularioEditarTitulo id="1" titulo="Comprar pan" alCerrar={alCerrar} />);
  return { alCerrar, campo: screen.getByLabelText("Nuevo título de Comprar pan") };
}

describe("FormularioEditarTitulo", () => {
  afterEach(() => {
    cleanup();
    accion.mockReset();
  });

  it("empieza con el título actual, con el foco y limitado a 120 caracteres", () => {
    const { campo } = montar();
    expect(campo).toHaveValue("Comprar pan");
    expect(campo).toHaveFocus();
    expect(campo).toHaveAttribute("maxLength", "120");
  });

  it("guarda el título nuevo y se cierra", async () => {
    accion.mockResolvedValue({ error: null });
    const { alCerrar, campo } = montar();
    fireEvent.change(campo, { target: { value: "Comprar leche" } });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));
    await waitFor(() => expect(alCerrar).toHaveBeenCalledOnce());
    expect(accion).toHaveBeenCalledWith("1", "Comprar leche");
  });

  it("con un error muestra el aviso, sigue abierto y conserva lo escrito", async () => {
    accion.mockResolvedValue({ error: "Escribe un título para la tarea." });
    const { alCerrar, campo } = montar();
    fireEvent.change(campo, { target: { value: "   " } });
    fireEvent.click(screen.getByRole("button", { name: "Guardar" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Escribe un título para la tarea.");
    expect(alCerrar).not.toHaveBeenCalled();
    expect(campo).toHaveValue("   ");
  });

  it("Cancelar cierra sin guardar", () => {
    const { alCerrar } = montar();
    fireEvent.click(screen.getByRole("button", { name: "Cancelar" }));
    expect(alCerrar).toHaveBeenCalledOnce();
    expect(accion).not.toHaveBeenCalled();
  });

  it("Escape cierra sin guardar", () => {
    const { alCerrar, campo } = montar();
    fireEvent.keyDown(campo, { key: "Escape" });
    expect(alCerrar).toHaveBeenCalledOnce();
    expect(accion).not.toHaveBeenCalled();
  });
});
