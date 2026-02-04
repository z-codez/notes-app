# NOTES APP 
 
 A Fullstack mobile project to practice react native and spring.

 The project is divided into the following parts:
 1. React Native App - Offline-first (100% done)
 2. Java / Spring boot backend - For online access and syncing with the local storage


# PART I - OFFLINE-FIRST NOTE APP

## Technologies Used:
1. React Native with Expo
2. SQLite - For local storage 
2. Expo Router
3. TypeScript


## Current features
- Offline-first with SQLite
- Create / Edit / Delete notes
- Error handling
- Dark mode

## Tech Stack
- React Native (Expo)
- Expo Router
- TypeScript
- SQLite
- REST API

## Demo


## Screenshots
### Android
| light | dark |
|-----|---------|
| ![](screenshots/ios.png) | ![](screenshots/android.png) |

## Design Decisions

### Expo Router
- File-based routing simplifies navigation
- Scales well for larger apps

### Offline Strategy
- SQLite as local source of truth
- Background sync with conflict resolution in the future



-----------------------------------------------------

# PART II - JAVA / SPRING BACKEND (10% done)