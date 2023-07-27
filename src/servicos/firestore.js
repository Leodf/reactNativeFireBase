import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

export async function salvarProduto(data) {
  try {
    await addDoc(collection(db, "produtos"), data);
    return "ok";
  } catch (error) {
    console.log("Erro add produto", error);
    return "erro";
  }
}

export async function pegarProdutos() {
  try {
    const querySnapshot = await getDocs(collection(db, "produtos"));
    let produtos = [];
    querySnapshot.forEach((doc) => {
      let produto = { id: doc.id, ...doc.data() };
      produtos.push(produto);
    });
    return produtos;
  } catch (error) {
    console.log("Erro ao pegar produtos", error);
    return [];
  }
}

export async function pegarProdutosEmTempoReal(setProdutos) {
  try {
    const ref = query(collection(db, "produtos"));
    onSnapshot(ref, (querySnapshot) => {
      const produtos = [];
      querySnapshot.forEach((doc) => {
        let produto = { id: doc.id, ...doc.data() };
        produtos.push(produto);
      });
      setProdutos(produtos);
    });
  } catch (error) {
    console.log("Erro ao pegar produtos", error);
    return [];
  }
}

export async function atualizarProduto(produtoId, data) {
  try {
    const produtoRef = doc(db, "produtos", produtoId);
    await updateDoc(produtoRef, data);
    return "ok";
  } catch (error) {
    console.log("Erro ao atualizar o produto", error);
    return "erro";
  }
}

export async function deletarProduto(produtoId) {
  try {
    const produtoRef = doc(db, "produtos", produtoId);
    await deleteDoc(produtoRef);
    return "ok";
  } catch (error) {
    console.log("Erro ao deletar o produto", error);
    return "erro";
  }
}
