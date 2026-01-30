import { useEffect, useRef, useState } from "react";
import { 
  StyleSheet,
  View,
  Dimensions,
  Pressable, 
  FlatList, 
  useColorScheme } from "react-native";
import { HelloWave } from "@/components/hello-wave";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter} from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { SafeAreaContainer } from "@/components/safe-area-container";
//import { fetch } from "@react-native-community/netinfo";
import { useNotesStorageDelete, useNotesStorageGetAll } from "@/hooks/notes/use-notes-storage";
//import { useNotesGetAll } from "@/hooks/notes/use-notes-api";

// Get device dimensions. I am usings Dimensions API instead of useWindowDimensions hook. This is because the hook
// causes unnecessary re-renders, which is not needed for my current use case.
const {height, width } = Dimensions.get('window');


export default function HomeScreen() {

  // let doesInternetWork = null;

  // fetch().then((state: any) => {
  //   if (state.isInternetReachable) doesInternetWork = true;
  // });

  // if (doesInternetWork) {}
  //const {notes, loading, error} = useNotesGetAll();

  const {notes, loading , error} = useNotesStorageGetAll();

  const router = useRouter();

  const [pressed, setPressed] =  useState<boolean>(false);

  const [longPressed, setLongPressed] = useState<boolean>(false);
  const [deletePressed, setDeletePressed] = useState<boolean>(false);


  // Event handling for addNewButton
  // Hook: useEffect hook for side effects(navigation)
  const [newNoteBtnPressed, setNewNoteBtnPressed] = useState<boolean>(false);

  useEffect(() => {
    if (newNoteBtnPressed) {
      router.push('/new');
      setNewNoteBtnPressed(false);
    }
  }, [newNoteBtnPressed, router]);

  // Event handling for noteContainer
  const [noteContainerPressed, setNoteContainerPressed] = useState<boolean>(false);

  // Hook: useRef is used to store state that is not needed for rendering.
  // It does not trigger a re-render
  const currentItemIdRef = useRef< number>(0);

  useNotesStorageDelete(currentItemIdRef.current, deletePressed);

  useEffect(()=> {
    if (noteContainerPressed) {
      router.push({pathname: '/new', params: {id: currentItemIdRef.current}});
      setNoteContainerPressed(false);
      currentItemIdRef.current = 0; // TODO: test first
    }
  }, [noteContainerPressed, router]);

  const showFlatList = notes.length > 0; // TODO: Use Memo or use Effect ?
  const colorScheme = useColorScheme();


  // TODO: Add a loading spinner. Should be a component
  // If Data is still loading. This is a loading screen
  if(loading) {
    return (
      <SafeAreaContainer
      style = {[styles.container]}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Welcome to Notes</ThemedText>
          <HelloWave />
        </View>
        <View style={[styles.flatListOrDefault, {alignItems: "center", justifyContent: "center", gap: 20}]}>
          <ThemedText type="defaultSemiBold">Loading...</ThemedText>
        </View>
      </SafeAreaContainer>
    );
  }

  // If there is an error, this is an error screen.
  // Should be a component
  if (error) {
    return (
      <SafeAreaContainer
      style = {[styles.container]}>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Welcome to Notes</ThemedText>
          <HelloWave />
        </View>
        <View style={[styles.flatListOrDefault, {alignItems: "center", justifyContent: "center", gap: 20}]}>
          <ThemedText type="defaultSemiBold">Error: {error}</ThemedText>
        </View>
      </SafeAreaContainer>
    );
  }


  
  return (
    <SafeAreaContainer
    style = {[styles.container]}>
      <View style={styles.titleContainer}>
        <ThemedText type="title">Welcome to Notes</ThemedText>
        <HelloWave />
      </View>
      {/* If else statement in JSX is forbidden, I used a ternary operator*/}
      {showFlatList ? (
        <FlatList style={styles.flatListOrDefault}
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        //keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Pressable 
            onPress={() =>{
              setNoteContainerPressed(true);
              currentItemIdRef.current = item.id;
              }
            }
            onLongPress={() => {
              currentItemIdRef.current = item.id;
              setLongPressed(true);
            }}
          >
            <ThemedView style = {styles.noteContainer}>
              <ThemedText type="subtitle">{item.title}</ThemedText>
              <ThemedText type='defaultSemiBold'>I need a subtitle generator</ThemedText>
              <Pressable
              onPress={() => {
                setDeletePressed(true);
                //currentItemIdRef.current = 0; // Reset the currentItemId because the note is deleted
              }}
              onPressOut={() => { // reset the state
                currentItemIdRef.current = 0;
                setDeletePressed(false);
                setLongPressed(false);
              }}
              // TODO: delete is not showing completely in ANDROID
              style={[{display: longPressed ? 'flex' : 'none'}, styles.deleteButton]}>
                <ThemedText type="delete">delete</ThemedText> 
              </Pressable>
          </ThemedView>
          </Pressable>
          
        )}
        ></FlatList> 
      ) : (
        <View style={[styles.flatListOrDefault, styles.default]}>
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
      onPress={() => setNewNoteBtnPressed(true)}>
        <View style={styles.addSymbol}>
          <View style={styles.afterAddSymbol}></View>
        </View>
      </Pressable>
    </SafeAreaContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: width * 0.05, // Dynamic horizontal margin based on device width
    marginVertical: 20,
    gap: 30,
    justifyContent: "space-between",
  },

  titleContainer: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 10,
  },

  flatListOrDefault: {
    flex: 1, // Dynamic height based on device height',
  },

  default: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20
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

  deleteButton: {
    position: "absolute",
    top: 57,
    right: 10,
  },

  addNoteBtn: {
    backgroundColor: '#eba834',
    width: 60,
    height: 60,
    borderRadius: 50,
    alignSelf: 'flex-end',
    // TODO: adjust position dynamically based on device dimensions
    //marginRight: 10,
    //marginBottom: 15,

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

