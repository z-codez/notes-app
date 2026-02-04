export function subtitleGenerator(text: string) {
    
    if (text.length > 25) {
        return text.slice(0, 25) + '...';
    } else {
        return text;
    }
}