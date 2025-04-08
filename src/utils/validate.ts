export function sanitizeSearchQuery(input: string): string {
  let sanitized = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  sanitized = sanitized.replace(/[^a-zA-Z0-9\s-]/g, ""); // apenas letras, números, espaços e hífen
  sanitized = sanitized.replace(/\s{2,}/g, " ");
  sanitized = sanitized.replace(/-{2,}/g, "-");
  sanitized = sanitized.trim();
  sanitized = sanitized.replace(/^[-]+|[-]+$/g, "");

  // Converte para lowercase para facilitar verificação de palavras perigosas
  const check = sanitized.toLowerCase();

  const dangerousWords = [
    "drop",
    "delete",
    "truncate",
    "alter",
    "update",
    "insert",
    "create",
    "table"
  ];
  for (const word of dangerousWords) {
    if (check.includes(word)) {
      throw new Error("Filtro contém palavras proibidas.");
    }
  }

  if (!sanitized || sanitized.length === 0) {
    throw new Error("Filtro de busca inválido.");
  }

  return sanitized.slice(0, 100);
}
