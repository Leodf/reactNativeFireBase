export function isEmptyEntry(dados, setDados) {
  for (const [chave, valor] of Object.entries(dados)) {
    if (valor === "") {
      setDados({
        ...dados,
        [chave]: null,
      });
      return true;
    }
  }
  return false;
}
