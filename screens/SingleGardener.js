import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Picker,
} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../firebase2';
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

const SingleGardener = ({ route }) => {
  const { gardener } = route.params;
  const LeftContent = (props) => <Avatar.Icon {...props} icon="flower" />;

  const currentUser = auth.currentUser.email;

  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserData, setCurrentUserData] = useState({});
  const [gardenerId, setGardenerId] = useState(null);
  const [gardenerData, setGardenerData] = useState({});
  const [chatData, setChatData] = useState({});
  const [chatId, setChatId] = useState(null);

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

  return (
    <ScrollView>
      <View>
        <Card>
          <Card.Title
            title={gardener.email}
            subtitle="distance from you"
            left={LeftContent}
          />
          <Card.Content>
            <Title>{gardener.location}</Title>
            <Paragraph></Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri: 'https://thumbs.dreamstime.com/b/sunken-garden-10630510.jpg',
            }}
          />
          <Card.Actions>
            <TouchableOpacity
              onPress={handleMessage}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Message</Text>
            </TouchableOpacity>
          </Card.Actions>
        </Card>
      </View>
    </ScrollView>
  );
};

export default SingleGardener;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: 'green',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: 'green',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: 'green',
    fontWeight: '700',
    fontSize: 16,
  },
});
