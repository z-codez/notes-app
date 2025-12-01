// A performant container that applies safe area insets as padding

import { useMemo } from "react"; // for memoizing styles
import { View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";


export function SafeAreaContainer({ children, style }: { children: React.ReactNode, style: object }) {
    const insets = useSafeAreaInsets();
    const safeAreaStyles = useMemo(() => {
        return {    
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            flex: 1,
        }
    }, [insets]);

    return (
        <View
            style={[safeAreaStyles, style]}
        >{children}</View>
    )
}