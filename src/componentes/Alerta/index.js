import { Snackbar } from "react-native-paper";

export function Alerta({ message, error = false, setError }) {
  return (
    <Snackbar
      visible={error}
      onDismiss={() => setError(false)}
      duration={1500}
      action={{
        label: "OK",
        onPress: () => setError(false),
      }}
    >
      {message}
    </Snackbar>
  );
}
