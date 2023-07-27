import React, { useState } from "react";
import { View } from "react-native";
import { Alerta } from "../../componentes/Alerta";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { cadastrar } from "../../servicos/auth";
import { changeDados } from "../../utils/changeDados";
import { isEmptyEntry } from "../../utils/isEmptyEntry";
import { entradas } from "./entradas";
import estilos from "./estilos";

export default function Cadastro({ navigation }) {
  const [dados, setDados] = useState({
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  const [statusError, setStatusError] = useState("");
  const [messageError, setMessageError] = useState("");

  function isPasswordNotEqual() {
    return dados.senha !== dados.confirmaSenha;
  }

  async function realizarCadastro() {
    if (isEmptyEntry(dados, setDados)) return;
    if (isPasswordNotEqual()) {
      setStatusError(true);
      setMessageError("As senhas não conferem");
      return;
    }
    const result = await cadastrar(dados.email, dados.senha);
    if (result !== "sucesso") {
      setStatusError(true);
      setMessageError(result);
    }
  }

  return (
    <View style={estilos.container}>
      {entradas?.map((entrada) => {
        return (
          <EntradaTexto
            key={entrada.id}
            {...entrada}
            value={dados[entrada.name]}
            onChangeText={(valor) =>
              changeDados(entrada.name, valor, dados, setDados)
            }
            error={
              entrada.name !== "confirmaSenha"
                ? false
                : isPasswordNotEqual() && dados.confirmaSenha != ""
            }
          />
        );
      })}
      <Alerta
        message={messageError}
        error={statusError}
        setError={setStatusError}
      />
      <Botao onPress={() => realizarCadastro()}>CADASTRAR</Botao>
    </View>
  );
}
