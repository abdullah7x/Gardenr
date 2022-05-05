import React, { useState, useCallback, useLayoutEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { auth } from '../firebase2';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase2';

const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const { currentUserId } = route.params;
  const { currentUserData } = route.params;
  const { gardenerEmail } = route.params;
  let chatId;

  useLayoutEffect(() => {
    const q = query(
      collection(db, 'chatrooms'),
      where('user1', '==', auth.currentUser.email),
      where('user2', '==', gardenerEmail)
    );
    getDocs(q)
      .then((snapshot) => {
        chatId = snapshot.docs[0]._key.path.segments[6];
      })
      .then(() => {
        collection(db, 'chatrooms', chatId, 'messages');
        const q2 = query(
          collection(db, 'chatrooms', chatId, 'messages'),
          orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q2, (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
            }))
          )
        );
        return () => {
          unsubscribe();
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    try {
      addDoc(collection(db, 'chatrooms', chatId, 'messages'), {
        _id,
        createdAt,
        text,
        user,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: currentUserData.name,
      }}
    />
  );
};

export default Chat;
