import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";

export function useSafeAreaStyles() {
  const insets = useSafeAreaInsets();

  return StyleSheet.create({
    safeAreaPadding: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      flex: 1,
    },
  });
}