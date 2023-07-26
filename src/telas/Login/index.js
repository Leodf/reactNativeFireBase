import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";
import loadingAnimate from "../../../assets/loadingAnimate.gif";
import { Alerta } from "../../componentes/Alerta";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import { auth } from "../../config/firebase";
import { login } from "../../servicos/requisicoesFirebase";
import { changeDados } from "../../utils/changeDados";
import { isEmptyEntry } from "../../utils/isEmptyEntry";
import { entradas } from "./entradas";
import estilos from "./estilos";

export default function Login({ navigation }) {
  const [dados, setDados] = useState({
    email: "",
    senha: "",
  });
  const [statusError, setStatusError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stateUser = auth.onAuthStateChanged((usuario) => {
      if (usuario) {
        navigation.replace("Principal");
      }
      setLoading(false);
    });
    return () => stateUser();
  }, []);

  async function makeLogin() {
    if (isEmptyEntry(dados, setDados)) return;

    const result = await login(dados.email, dados.senha);
    if (result === "erro") {
      setStatusError(true);
      setMessageError("Email ou senha não conferem");
      return;
    }
    navigation.replace("Principal");
  }

  if (loading) {
    return (
      <View style={estilos.containerAnimacao}>
        <Image source={loadingAnimate} style={estilos.imagem} />
      </View>
    );
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
          />
        );
      })}
      <Alerta
        message={messageError}
        error={statusError}
        setError={setStatusError}
      />
      <Botao onPress={() => makeLogin()}>LOGAR</Botao>
      <Botao
        onPress={() => {
          navigation.navigate("Cadastro");
        }}
      >
        CADASTRAR USUÁRIO
      </Botao>
    </View>
  );
}
