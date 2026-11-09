export const FILTROS = ["todas", "pendientes", "hechas"] as const;

export type Filtro = (typeof FILTROS)[number];

// El valor llega de la URL: cualquier cosa que no sea un filtro conocido equivale a "todas".
export function normalizarFiltro(valor: string | string[] | undefined): Filtro {
  return FILTROS.find((filtro) => filtro === valor) ?? "todas";
}

export function enlaceFiltro(filtro: Filtro): string {
  return filtro === "todas" ? "/tareas" : `/tareas?filtro=${filtro}`;
}
