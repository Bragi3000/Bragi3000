# Bragi 3000

![bragi-icon](public/bragi-icon.png)

## Description

On parties' people want to hear their favorite songs. The idea behind **Bragi 3000** is to give each person a chance to
hear their favorite song. This is achieved by letting people battle with each other for their song to be added to the
party playlist/queue. These battles should be simple and fun and the winner's song gets added. One example for such a
game is tic tac toe and could be changed to a different game. The song of the loser will be discarded and be temporarily
be banned from being added to the playlist/queue.

## Finished Features

- Visually appealing landing Page
- Firebase and Spotify authentication
- Song controller ( shows current playing song on spotify and can pause/resume it )
- Song selector ( allows users to search and select a song they want to battle for )
- MiniGame ( tic tac toe as a way to battle for which song gets added )
- Spotify playlist/queue Component
- MiniGame song handling
  - Adding winning song to playlist/queue
  - Banning lost song from being added until *party reset*
  - Save winning and losing song to state
- Components for winner and loser song from state
- Wiring component functionality (e.g. song selector reset when a game is won)
- State / Persistence separation
- Better API error handling
- Styling

### Possible Improvements

- Firebase reset user password
- Current song progress bar (in Song controller)
- Different spotify authentication mechanism (currently *Implicit Grant Flow* , alternative is *Authorization Code Flow
  with PKCE extension*)

## Folder Structure

This project uses a specific structure to everything has a (semi-)logical place to be put. This structure contains the
following folders:

| Folder            | Description                                                          |
|-------------------|----------------------------------------------------------------------|
| `/build`          | Will contain the build output of Bragi 3000 after a production build |
| `/public`         | Contains the base HTML and general assets                            |
| `/src`            | Scripts and required imports, sub-divided into categories            |
| `/src/Assets`     | Assets used by the scripts, such as images, audio, etc.              |
| `/src/Components` | Components with presenter and views grouped together in folders      |
| `/src/Config`     | Configuration files (example files should be copied and filled in)   |
| `/src/Constants`  | Constants for different components                                   |
| `/src/Pages`      | Components for each of the pages of the application                  |
| `/src/Services`   | Functions for communicating with services through their API          |
| `/src/Store`      | Scripts relating to the application state (and its persistence)      |
| `/src/Utils`      | Generic utility scripts to be used by other parts of the app         |

Documentation is included inside files to provide more information about their functionality.

## Commands

The following commands can be run to perform tasks within the project:

| Command         | Description                    |
| --------------- | ------------------------------ |
| `npm run start` | Starts app in development mode |
| `npm run build` | Builds the app for production  |
| `npm run lint`  | Runs ESLint on the project     |
