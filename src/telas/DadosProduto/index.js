import React, { useState } from "react";
import { Alert, View } from "react-native";
import { Alerta } from "../../componentes/Alerta";
import Botao from "../../componentes/Botao";
import { EntradaTexto } from "../../componentes/EntradaTexto";
import {
  atualizarProduto,
  deletarProduto,
  salvarProduto,
} from "../../servicos/firestore";
import estilos from "./estilos";

export default function DadosProduto({ navigation, route }) {
  const [nome, setNome] = useState(route?.params?.nome || "");
  const [preco, setPreco] = useState(route?.params?.preco || "");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  async function salvar() {
    if (nome === "" || preco === "") {
      setMessage("Por favor preencha todos os campos");
      setShowMessage(true);
      return;
    }
    const result = await salvarProduto({
      nome,
      preco,
    });

    if (result === "erro") {
      setMessage("Erro ao criar o produto");
      setShowMessage(true);
    } else {
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
      setMessage("Produto cadastrado");
      setShowMessage(true);
    }
  }

  async function atualizar() {
    const result = await atualizarProduto(route?.params?.id, {
      nome,
      preco,
    });
    if (result === "erro") {
      setMessage("Erro ao atualizar o produto!");
      setShowMessage(true);
    } else {
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
      setMessage("Produto atualizado!");
      setShowMessage(true);
    }
  }

  async function remover() {
    async function deletar() {
      const result = await deletarProduto(route?.params?.id);
      if (result === "erro") {
        setMessage("Erro ao deletar o produto!");
        setShowMessage(true);
      } else {
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
        setMessage("Produto deletado");
        setShowMessage(true);
      }
    }

    Alert.alert("Deletar produto", "Tem certeza que quer deletar?", [
      {
        text: "Sim",
        onPress: () => deletar(),
        style: "default",
      },
      { text: "Não", style: "cancel" },
    ]);
  }

  return (
    <View style={estilos.container}>
      <EntradaTexto
        label="Nome do produto"
        value={nome}
        onChangeText={setNome}
      />
      <EntradaTexto
        label="Preço do produto"
        value={preco}
        onChangeText={setPreco}
      />
      {route?.params ? (
        <View style={estilos.viewBotao}>
          <Botao style={estilos.update} onPress={atualizar}>
            Atualizar
          </Botao>
          <Botao style={estilos.delete} onPress={remover}>
            Deletar
          </Botao>
        </View>
      ) : (
        <Botao onPress={salvar}>Salvar</Botao>
      )}

      <Alerta message={message} error={showMessage} setError={setShowMessage} />
    </View>
  );
}
