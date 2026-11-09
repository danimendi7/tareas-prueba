import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { FiltroTareas } from "./FiltroTareas";

describe("FiltroTareas", () => {
  afterEach(cleanup);

  it("marca como actual solo el filtro activo", () => {
    render(<FiltroTareas actual="pendientes" />);
    expect(screen.getByRole("link", { name: "Pendientes" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Todas" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: "Hechas" })).not.toHaveAttribute("aria-current");
  });

  it("enlaza cada filtro con su URL", () => {
    render(<FiltroTareas actual="todas" />);
    expect(screen.getByRole("link", { name: "Todas" })).toHaveAttribute("href", "/tareas");
    expect(screen.getByRole("link", { name: "Hechas" })).toHaveAttribute("href", "/tareas?filtro=hechas");
  });
});
