import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormularioCuenta } from "./FormularioCuenta";

describe("FormularioCuenta", () => {
  it("etiqueta los campos y muestra el botón indicado", () => {
    render(
      <FormularioCuenta
        accion={async (previo) => previo}
        textoBoton="Registrarme"
        autocompletado="new-password"
      />,
    );
    expect(screen.getByLabelText("Email")).toBeRequired();
    expect(screen.getByLabelText("Contraseña")).toHaveAttribute("minLength", "8");
    expect(screen.getByRole("button", { name: "Registrarme" })).toBeEnabled();
  });
});
