import { describe, expect, it } from "vitest";
import { enlaceFiltro, normalizarFiltro } from "./filtro";

describe("normalizarFiltro", () => {
  it.each(["todas", "pendientes", "hechas"] as const)("acepta %s", (filtro) => {
    expect(normalizarFiltro(filtro)).toBe(filtro);
  });

  it.each([undefined, "", "otra", "HECHAS"])("convierte %s en todas", (valor) => {
    expect(normalizarFiltro(valor)).toBe("todas");
  });

  it("convierte un valor repetido en todas", () => {
    expect(normalizarFiltro(["hechas", "pendientes"])).toBe("todas");
  });
});

describe("enlaceFiltro", () => {
  it("deja la URL limpia para todas", () => {
    expect(enlaceFiltro("todas")).toBe("/tareas");
  });

  it("pone el filtro en la URL", () => {
    expect(enlaceFiltro("hechas")).toBe("/tareas?filtro=hechas");
  });
});
