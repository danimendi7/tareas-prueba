import { describe, expect, it } from "vitest";
import { mensajeErrorRegistro, validarCredenciales } from "./validacion";

describe("validarCredenciales", () => {
  it("acepta un email válido y una contraseña de 8 caracteres", () => {
    expect(validarCredenciales("ana@example.com", "12345678")).toBeNull();
  });

  it("rechaza un email mal formado", () => {
    expect(validarCredenciales("ana@example", "12345678")).toMatch(/email/i);
  });

  it("rechaza una contraseña de menos de 8 caracteres", () => {
    expect(validarCredenciales("ana@example.com", "1234567")).toMatch(/8 caracteres/);
  });
});

describe("mensajeErrorRegistro", () => {
  it("explica en español que la cuenta ya existe", () => {
    expect(mensajeErrorRegistro("user_already_exists")).toMatch(/Ya existe/);
  });

  it("usa un mensaje genérico para códigos desconocidos", () => {
    expect(mensajeErrorRegistro("otro")).toMatch(/No se ha podido/);
  });
});
