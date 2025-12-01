import { TextInput, TextInputProps } from "react-native";
import { useThemeColor } from "@/hooks/use-theme-color";
import { use } from "react";

export type ThemedInputProps = TextInputProps & {
    lightColor?: string,
    darkColor?: string,
    type?: 'default' | 'title',
};

export function ThemedInput({
    style,
    lightColor,
    darkColor,
    type = 'default',
    ...rest
}: ThemedInputProps) {

    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    return (
        <TextInput 
            style={[
                { color },
                type === 'default' ? styles.default : undefined,
                type === 'title' ? styles.title : undefined,
                style
            ]}
            {...rest}
        ></TextInput>
    );
};

const styles = {
    default: {
        fontSize: 16,
        lineHeight: 24,
    },
    title: {
        fontSize: 32,
    },
}

// Note: placeHolderColor is not a valid style property for TextInput.