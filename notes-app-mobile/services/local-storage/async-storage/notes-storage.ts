import AsyncStorage  from "@react-native-async-storage/async-storage";
import type { Note } from "@/services/api/types/note";


export async function storeNote(note: Note) {

    return await AsyncStorage.setItem(note.id, JSON.stringify(note));
}

export async function getNote(id: string)  {
    const jsonValue = await AsyncStorage.getItem(id);
    return jsonValue != null ? JSON.parse(jsonValue) : null
}
