import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BotaoProduto } from "../../componentes/BotaoProduto";
import Cabecalho from "../../componentes/Cabecalho";
import Produto from "../../componentes/Produtos";
import { auth } from "../../config/firebase";
import {
  pegarProdutos,
  pegarProdutosEmTempoReal,
} from "../../servicos/firestore";
import estilos from "./estilos";

export default function Principal({ navigation }) {
  const usuario = auth.currentUser;

  const [produtos, setProdutos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  async function carregarDadosProdutos() {
    setRefreshing(true);
    const result = await pegarProdutos();
    setProdutos(result);
    setRefreshing(false);
  }

  useEffect(() => {
    //   carregarDadosProdutos();
    pegarProdutosEmTempoReal(setProdutos);
  }, []);

  function deslogar() {
    auth.signOut();
    navigation.replace("Login");
  }

  return (
    <View style={estilos.container}>
      <Cabecalho logout={deslogar} />
      <Text style={estilos.texto}>Usuário: {usuario.email}</Text>
      <ScrollView
        style={{ width: "100%" }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={carregarDadosProdutos}
          />
        }
      >
        {produtos?.map((produto) => {
          return (
            <TouchableOpacity
              key={produto.id}
              onPress={() => navigation.navigate("DadosProduto", produto)}
            >
              <Produto nome={produto.nome} preco={produto.preco} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <BotaoProduto onPress={() => navigation.navigate("DadosProduto")} />
    </View>
  );
}
