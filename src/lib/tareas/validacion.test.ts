import { describe, expect, it } from "vitest";
import { validarTitulo } from "./validacion";

describe("validarTitulo", () => {
  it("acepta títulos de 1 y de 120 caracteres", () => {
    expect(validarTitulo("a")).toBeNull();
    expect(validarTitulo("a".repeat(120))).toBeNull();
  });

  it("rechaza un título vacío", () => {
    expect(validarTitulo("")).toMatch(/Escribe un título/);
  });

  it("rechaza un título de 121 caracteres", () => {
    expect(validarTitulo("a".repeat(121))).toMatch(/120 caracteres/);
  });
});
