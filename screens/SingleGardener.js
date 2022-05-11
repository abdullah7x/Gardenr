import { StyleSheet, Text, View, Image } from 'react-native';

import { TouchableOpacity } from 'react-native';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase2';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { ActivityIndicator, Colors } from 'react-native-paper';

const SingleGardener = ({ route }) => {
  const { gardener } = route.params;

  const auth = getAuth();
  const currentUser = auth.currentUser.email;

  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserData, setCurrentUserData] = useState({});
  const [gardenerId, setGardenerId] = useState(null);
  const [gardenerData, setGardenerData] = useState({});
  const [chatData, setChatData] = useState({});
  const [chatId, setChatId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    // get chatdata
    const chatRef = query(
      collection(db, 'chatrooms'),
      where('user1', '==', currentUser),
      where('user2', '==', gardener.email)
    );

    getDocs(chatRef).then((snapshot) => {
      if (snapshot.docs[0]) {
        setChatData(snapshot.docs[0].data());
        setChatId(chatData.id);
      }
    });

    // get user id
    const userRef = query(
      collection(db, 'clients'),
      where('email', '==', currentUser)
    );

    getDocs(userRef).then((snapshot) => {
      setCurrentUserId(snapshot.docs[0]._key.path.segments[6]);
      setCurrentUserData(snapshot.docs[0].data());
    });

    // get gardener id

    const gardenerRef = query(
      collection(db, 'gardeners'),
      where('email', '==', gardener.email)
    );

    getDocs(gardenerRef).then((snapshot) => {
      setGardenerId(snapshot.docs[0]._key.path.segments[6]);
      setGardenerData(snapshot.docs[0].data());
      setLoading(false);
    });
  }, []);

  const handleMessage = async () => {
    // add gardener to clients friends
    const clientsRef = doc(db, 'clients', currentUserId);
    if (
      currentUserData.friends?.length &&
      !currentUserData.friends.includes(gardener.email)
    ) {
      updateDoc(clientsRef, {
        friends: [gardener.email, ...currentUserData.friends],
      });
    } else if (!currentUserData.friends?.includes(gardener.email)) {
      updateDoc(clientsRef, {
        friends: [gardener.email],
      });
    }

    // add client to gardeners friends

    const gardenerRef2 = doc(db, 'gardeners', gardenerId);
    if (
      gardenerData.friends?.length &&
      !gardenerData.friends.includes(currentUserData.email)
    ) {
      updateDoc(gardenerRef2, {
        friends: [currentUserData.email, ...gardenerData.friends],
      });
    } else if (!gardenerData.friends?.includes(currentUserData.email)) {
      updateDoc(gardenerRef2, {
        friends: [currentUserData.email],
      });
    }

    if (!chatData.chatId && chatId === null) {
      addDoc(collection(db, 'chatrooms'), {
        user1: currentUser,
        user2: gardener.email,
      }).then((snapshot) => {
        setChatId(snapshot.id);
        updateDoc(doc(db, 'chatrooms', snapshot.id), {
          chatId: snapshot.id,
        }).then(() => {
          navigation.navigate('Chat', {
            currentUserId,
            currentUserData,
            gardenerEmail: gardener.email,
            chatId: snapshot.id,
          });
        });
      });
    } else {
      navigation.navigate('Chat', {
        currentUserId,
        currentUserData,
        gardenerEmail: gardener.email,
        chatId,
      });
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={Colors.green200} />
      </View>
    );
  } else {
    console.log(gardenerData.selectedJobs);
    const gardenerJobsArr = gardenerData.selectedJobs.map((job) => {
      return job.item;
    });
    const gardenerJobs = gardenerJobsArr.join(', ');
    console.log(gardenerJobs);
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Text
            style={{
              fontWeight: '700',
              fontSize: 30,

              letterSpacing: 4,
            }}
          >
            {gardenerData.companyName}
          </Text>
        </View>
        <View style={styles.image}>
          <Image source={require('../assets/cover-logo.png')} />
        </View>
        <View style={styles.middleTop}>
          <Text style={styles.subtitleText}>Company Details</Text>
          <Text style={styles.middleText}>Owner: {gardenerData.name}</Text>
          <Text style={styles.middleText}>Available for: {gardenerJobs}</Text>
          <Text style={styles.middleText}>
            Post Code: {gardenerData.postCode}
          </Text>
          <Text style={styles.middleText}>Phone: {gardenerData.phoneNo}</Text>
          <Text style={styles.middleText}>Email: {gardenerData.email}</Text>
        </View>

        <View style={styles.bottom}>
          <TouchableOpacity onPress={handleMessage} style={styles.msgButton}>
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 20 }}>
              Message
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default SingleGardener;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 1,
    margin: 0,
  },
  top: {
    flex: 0.1,
    backgroundColor: 'white',
    borderBottomWidth: 5,

    borderRadius: 80,
    borderColor: '#008002',

    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 0.25,
  },
  middleTop: {
    flex: 0.45,

    justifyContent: 'center',

    borderTopWidth: 5,
    borderRadius: 80,
    borderColor: '#008002',
    marginRight: 20,
    marginLeft: 20,
  },
  middleBottom: {
    flex: 0.2,

    justifyContent: 'center',
    marginRight: 20,
    marginLeft: 20,
  },
  middleText: {
    fontWeight: '200',
    fontSize: 22,

    marginTop: 8,
  },

  subtitleText: {
    fontWeight: '500',
    fontSize: 28,

    textDecorationStyle: 'solid',
    marginBottom: 10,
    marginTop: 10,
  },
  msgButton: {
    backgroundColor: 'green',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bottom: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    marginBottom: 30,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10,
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
