import { describe, expect, it } from "vitest";
import { destinoRedireccion } from "./redirecciones";

describe("destinoRedireccion", () => {
  it("envía la raíz a /tareas con sesión y a /entrar sin ella", () => {
    expect(destinoRedireccion("/", true)).toBe("/tareas");
    expect(destinoRedireccion("/", false)).toBe("/entrar");
  });

  it("protege /tareas de los visitantes sin sesión", () => {
    expect(destinoRedireccion("/tareas", false)).toBe("/entrar");
    expect(destinoRedireccion("/tareas/algo", false)).toBe("/entrar");
    expect(destinoRedireccion("/tareas", true)).toBeNull();
  });

  it("deja pasar las páginas públicas y rutas con nombre parecido", () => {
    expect(destinoRedireccion("/entrar", false)).toBeNull();
    expect(destinoRedireccion("/registro", false)).toBeNull();
    expect(destinoRedireccion("/tareasx", false)).toBeNull();
  });
});
