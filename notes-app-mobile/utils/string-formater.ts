export function subtitleGenerator(text: string) {
    
    if (text.length > 30) {
        return text.slice(0, 30) + '...';
    } else {
        return text;
    }
}