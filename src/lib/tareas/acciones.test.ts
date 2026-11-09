import { afterEach, describe, expect, it, vi } from "vitest";
import { editarTitulo } from "./acciones";

const { eq, update } = vi.hoisted(() => {
  const eq = vi.fn();
  return { eq, update: vi.fn(() => ({ eq })) };
});

vi.mock("next/cache", () => ({ revalidatePath: vi.fn() }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({
  crearClienteServidor: async () => ({
    auth: { getClaims: async () => ({ data: { claims: { sub: "usuario" } } }) },
    from: () => ({ update }),
  }),
}));

describe("editarTitulo", () => {
  afterEach(() => vi.clearAllMocks());

  it("guarda el título sin los espacios sobrantes", async () => {
    eq.mockResolvedValue({ error: null });
    await expect(editarTitulo("1", "  Nuevo  ")).resolves.toEqual({ error: null });
    expect(update).toHaveBeenCalledWith({ titulo: "Nuevo" });
    expect(eq).toHaveBeenCalledWith("id", "1");
  });

  it.each([
    ["vacío", "   "],
    ["de 121 caracteres", "a".repeat(121)],
  ])("no guarda un título %s y devuelve un aviso", async (_caso, valor) => {
    const resultado = await editarTitulo("1", valor);
    expect(resultado.error).toEqual(expect.any(String));
    expect(update).not.toHaveBeenCalled();
  });

  it("avisa si falla la base de datos", async () => {
    eq.mockResolvedValue({ error: { message: "fallo" } });
    const resultado = await editarTitulo("1", "Nuevo");
    expect(resultado.error).toBe("No se ha podido actualizar la tarea. Inténtalo de nuevo.");
  });
});
