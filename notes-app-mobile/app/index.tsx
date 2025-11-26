import { useEffect, useState } from "react";
import { Platform, StyleSheet, ScrollView, View, Dimensions, Pressable, FlatList, useColorScheme } from "react-native";
import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useSafeAreaStyles } from "@/hooks/use-safe-area-insets";

// Get device dimensions. I am usings Dimensions API instead of useWindowDimensions hook. This is because the hook
// causes unnecessary re-renders, which is not needed for my current use case.
const {height, width } = Dimensions.get('window');

const notes = [
  { id: '1', title: 'First Note', subtitle: 'This is the first note.', body: 'Body of the first note.'},
  { id: '2', title: 'Second Note', subtitle: 'This is the second note.', body: 'Body of the second note.'},
  { id: '3', title: 'Third Note', subtitle: 'This is the third note.', body: 'Body of the third note.'},
  { id: '4', title: 'Fourth Note', subtitle: 'This is the fourth note.', body: 'Body of the fourth note.'},
  { id: '5', title: 'Fifth Note', subtitle: 'This is the fifth note.', body: 'Body of the fifth note.'},
  { id: '6', title: 'Sixth Note', subtitle: 'This is the sixth note.', body: 'Body of the sixth note.'},
]; //TODO: replace Placeholder for actual notes availability logic

export default function HomeScreen() {

  const safeAreaStyles = useSafeAreaStyles().safeAreaPadding;

  const router = useRouter();

  const [pressed, setPressed] =  useState(false);

  const showFlatList = true; // TODO: replace with actual logic to determine if notes are available;

  const colorScheme = useColorScheme();

  return (
    <View
    style = {[safeAreaStyles, styles.container]}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Notes</ThemedText>
        <HelloWave />
      </View>
      {/* If else statement in JSX is forbidden, I used a ternary operator*/}
      {notes.length > 0 && showFlatList ? (
        <FlatList style={styles.flatListOrDefault}
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Pressable onPress={() => router.push({
            // I am passing note details as params to the note screen
            pathname: '/note',
            params: { id: item.id, title: item.title, subtitle: item.subtitle, body: item.body}
          }
            
          )}>
            <ThemedView style = {styles.noteContainer}>
              <ThemedText type="subtitle">{item.title}</ThemedText>
              <ThemedText type='defaultSemiBold'>{item.subtitle}</ThemedText>
          </ThemedView>
          </Pressable>
          
        )}
        ></FlatList>
      ) : (
        <View style={[styles.flatListOrDefault, {alignItems: "center", justifyContent: "center", gap: 20}]}>
          <IconSymbol
            size={90}
            color={colorScheme === 'dark' ? '#fff' : '#000'}
            name="square.and.pencil"
            style={styles.addNoteIcon}
          ></IconSymbol>  
          <ThemedText type="default">No notes available. Tap the + button below to add a new note.</ThemedText>
        </View>
        
      )
        
      }
      <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      // Conditional styling based on pressed state.
      style={[styles.addNoteBtn, pressed && styles.addNoteBtnPressed]}
      onPress={() => router.push('/new')}>
        <View style={styles.addSymbol}>
          <View style={styles.afterAddSymbol}></View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: width * 0.05, // Dynamic horizontal margin based on device width
    marginVertical: 20,
    gap: 30,
  },

  titleContainer: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
  },

  flatListOrDefault: {
    flex: 2, // Dynamic height based on device height',
  },
  noteContainer: {
    //fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto',
    gap: 10,
    marginBottom: 8,
    padding: 15,
    borderRadius: 8,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },

  addNoteBtn: {
    backgroundColor: '#eba834',
    width: 60,
    height: 60,
    borderRadius: 50,
    alignSelf: 'flex-end',
    // TODO: adjust position dynamically based on device dimensions
    marginRight: 10,
    marginBottom: 15,

    // 3d shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8, // for Android
  },
  // Pressed state for add note button
  addNoteBtnPressed: {
    backgroundColor: '#d18b2c',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // for Android

  },
  addSymbol: {
    backgroundColor: '#fff',
    height: 30,
    width: 3,
    position: 'relative',
    top: 14,
    left: 28,

  },
  afterAddSymbol: {
    backgroundColor: '#fff',
    height: 3,
    width: 30,
    position: 'absolute',
    top: 13.5,
    left: -13.5,
  },
  addNoteIcon: {},
});

