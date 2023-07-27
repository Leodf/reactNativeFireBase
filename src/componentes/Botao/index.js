import { Text, TouchableOpacity } from "react-native";
import estilos from "./estilos";

export default function Botao({ onPress, style, children }) {
  return (
    <TouchableOpacity style={style ?? estilos.botao} onPress={onPress}>
      <Text style={estilos.textoBotao}>{children}</Text>
    </TouchableOpacity>
  );
}
