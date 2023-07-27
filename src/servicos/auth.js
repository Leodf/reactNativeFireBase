import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

function errorsFirebase(error) {
  let message = "";
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      message = "Email em uso";
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      message = "Email inválido";
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      message = "A senha precisa de no minimo 6 caracteres";
      break;
    default:
      message = "Erro desconhecido";
  }
  return message;
}

export async function cadastrar(email, senha) {
  const result = await createUserWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      return "sucesso";
    })
    .catch((error) => {
      return errorsFirebase(error);
    });
  return result;
}

export async function login(email, senha) {
  const result = await signInWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      return "sucesso";
    })
    .catch((error) => {
      return "erro";
    });
  return result;
}
