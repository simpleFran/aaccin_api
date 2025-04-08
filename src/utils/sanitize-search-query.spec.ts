import { describe, it, expect } from "vitest";
import { sanitizeSearchQuery } from "./validate";

describe("sanitizeSearchQuery", () => {
  it("permite palavras com hífen entre elas", () => {
    expect(sanitizeSearchQuery("Engenheiro-Agrônomo")).toBe(
      "Engenheiro-Agronomo"
    );
  });

  it("remove hífens duplos e espaços extras", () => {
    expect(sanitizeSearchQuery("coordenador--geral")).toBe("coordenador-geral");
  });

  it("remove hífen do começo e fim", () => {
    expect(sanitizeSearchQuery("-milho-")).toBe("milho");
  });

  it("lança erro com palavras perigosas", () => {
    expect(() => sanitizeSearchQuery("DROP TABLE")).toThrow(
      "Filtro contém palavras proibidas."
    );
    expect(() => sanitizeSearchQuery("--DELETE FROM contacts")).toThrow(
      "Filtro contém palavras proibidas."
    );
  });

  it("lança erro para entradas inválidas", () => {
    expect(() => sanitizeSearchQuery("!!!")).toThrow(
      "Filtro de busca inválido."
    );
  });
});
