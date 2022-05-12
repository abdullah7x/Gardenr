# Gardenr

## Background

Tom's blurb

## Cloning the repo

In order to clone the repo you will firstly need to fork it to your GitHub. You can then copy the clone link in the forked repo, type git clone in your terminal and then paste the clone link in like this:

```
git clone <clone link from forked repo>
```

## Creating a Firebase project

In order to run this app, you will need to create a Firebase project and a Cloud Firestore database to go along with it. Follow the instructions in the following documentation to get started: https://firebase.google.com/docs/firestore/quickstart

Thereafter, create a file called firebase2.js in the root of the project and include your SDK setup and configuration inside it. You will need to import both Firebase and Cloud Firestore into this file like so:

```
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
```

Further, initialise an instance of Cloud Firestore and Firebase with references to each like so:

```
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
```

You will also need to set up the Maps API to get the map functionality working. The following documentation gives instructions on how to set up a Google Cloud project in the Cloud Console and then use your API key: https://developers.google.com/maps/documentation/javascript/cloud-setup. Create a variable called geoKey which refers to your project's geokey and export that too. If the final line of your document looks like this, you're in good shape:

```
export { db, geoKey, app };
```

## Installing dependencies

In the making of this project the following dependencies were used:

- Firebase
- Lodash
- Expo
- Axios
- React
- React-native
  - react-native-geocoding
  - react-native-gifted-chat
  - react-native-maps
  - react-native-paper

Simply run the following command in your terminal to ensure the necessary dependencies are added:

```
npm i
```

## Expo Go and Node.js

In order to view the app on a mobile phone, the device it was created with in mind, you will need to download the Expo Go app. Due to certain compatibility issues between Node.js and Expo, `V16` is the maximum version of Node that is supported. To ensure you do not encounter any problems, run the following code in your terminal:

```
nvm i 16.0.0
```

You can then run the following in your terminal if you wish to open the app on your phone:

```
expo start
```

This will bring up a QR code which, after scanning with your phone, should open Gardenr using the Expo Go app
