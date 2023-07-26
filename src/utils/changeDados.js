export const changeDados = (chave, valor, dados, setDados) => {
  setDados({
    ...dados,
    [chave]: valor,
  });
};
