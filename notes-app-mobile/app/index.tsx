
import { Platform, StyleSheet, ScrollView, View, Dimensions, Pressable, FlatList, useColorScheme } from "react-native";
import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";


// Get device dimensions. I am usings Dimensions API instead of useWindowDimensions hook. This is because the hook
// causes unnecessary re-renders, which is not needed for my current use case.
const {height, width } = Dimensions.get('window');

const notes = [
  { id: '1', title: 'First Note', subtitle: 'This is the first note.', body: 'Body of the first note.'},
  { id: '2', title: 'Second Note', subtitle: 'This is the second note.', body: 'Body of the second note.'},
  { id: '3', title: 'Third Note', subtitle: 'This is the third note.', body: 'Body of the third note.'},
  { id: '4', title: 'Fourth Note', subtitle: 'This is the fourth note.', body: 'Body of the fourth note.'},
]; //TODO: replace Placeholder for actual notes availability logic

export default function HomeScreen() {

  const router = useRouter();

  return (
    <View style = {styles.container}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Notes</ThemedText>
        <HelloWave />
      </View>
      {/* If else statement in JSX is forbidden, I used a ternary operator*/}
      {notes.length > 0 ? (
        <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Pressable onPress={() => router.push({
            // I am passing note details as params to the note screen
            pathname: '/note',
            params: { id: item.id, title: item.title, subtitle: item.subtitle, body: item.body}
          }
            
          )}>
            <View style = {styles.noteContainer}>
              <ThemedText type="subtitle">{item.title}</ThemedText>
              <ThemedText type="default">{item.subtitle}</ThemedText>
          </View>
          </Pressable>
          
        )}
        ></FlatList>
      ) : (
        <View>
          {/* TODO: Style this icon */}
          <IconSymbol
            size={30}
            color={useColorScheme() === 'dark' ? '#fff' : '#000'}
            name="square.and.pencil"
            style={styles.addNoteIcon}
          ></IconSymbol>  
          <ThemedText type="default">No notes available. Tap the + button to add a new note.</ThemedText>
        </View>
        
      )
        
      }
      {/* TODO: ADD ADDNOTEBTN */}
      <Pressable style={styles.addNoteBtn}
      onPress={() => router.push('/new')}>
        <View style={styles.addSymbol}></View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 'auto',
    marginTop: height * 0.1, // Dimensions API to get screen height
  },

  titleContainer: {
    flexDirection: "row",
    // alignItems: "center",
    gap: 20,
  },
  noteContainer: {
    gap: 8,
    marginBottom: 8,
  },

  addNoteBtn: {},
  addSymbol: {},
  addNoteIcon: {},
});

