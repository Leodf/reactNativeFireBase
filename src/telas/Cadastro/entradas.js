export const entradas = [
  {
    id: "1",
    name: "email",
    label: "E-mail",
    messageError: "Digite um e-mail válido",
    secureTextEntry: false,
    pattern:
      "^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+).(.[a-z]{2,3})$",
  },
  {
    id: "2",
    name: "senha",
    label: "Senha",
    messageError: "Digite uma senha válida",
    secureTextEntry: true,
    pattern: ".{6,}",
  },
  {
    id: "3",
    name: "confirmaSenha",
    label: "Confirmar Senha",
    messageError: "As senhas não conferem",
    secureTextEntry: true,
  },
];
