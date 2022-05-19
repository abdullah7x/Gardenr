# Gardenr

## Background

### Welcome to Gardenr.

Gardenr is a mobile app designed to connect gardening businesses with prospective clients via a simple user interface. With separate sophisticated user journeys, clients are able to find local Gardenrs who have signed up to the app via a simple search function, based on location and job types, which are matched according to highest relevancy. They can then use the messaging feature to chat in real time with their selected Gardenr to organise a job.

Gardenr was created in response to the increasing popularity for gardening in the UK over the past few years – accelerated by the pandemic - with people across the country looking to get outdoors more.

In addition, the app allowed the Node Survivors team to experiment and implement some fascinating frameworks and new tech, from no-SQL backend services (FireStore, Firebase Auth) to real-time messaging (Gifted Chat) to map functionality (Google Maps API and Geocoding Extension) and even designing our own logo and themes.

Check out the video to find out more.

Gardenr was designed and created by:

- Cam Lindsay | https://github.com/CamCode9
- Abdullah Ahmed | https://github.com/abdullah7x
- Kamahl Haider | https://github.com/Kamz1991
- Tom Johnson | https://github.com/tomjohnson1
- Kavi Parmar | https://github.com/Kavi246

## Demo

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
