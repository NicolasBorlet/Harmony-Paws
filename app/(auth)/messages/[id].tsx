import { i18n } from '@/app/_layout';
import Back from '@/components/back-button';
import { ExtraSmallMedium, NavigationTitle, Small } from '@/components/ui/text';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useCallback, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Composer, GiftedChat, IMessage, InputToolbar, Send } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const userData = {
  avatar: "https://picsum.photos/300",
  name: "Emma Swane",
  status: 1,
}

const messageData = [
  {
    _id: 1,
    text: "Salut ! Comment se passe ta recherche d'appartement ?",
    createdAt: new Date(Date.now() - 3600000 * 24),
    user: {
      _id: 2,
      name: 'Alice Martin',
      avatar: 'https://picsum.photos/300',
    },
    sent: true,
    received: true
  },
  {
    _id: 2,
    text: "Hey ! Ça avance doucement, j'ai visité 3 apparts hier",
    createdAt: new Date(Date.now() - 3600000 * 23),
    user: {
      _id: 1,
      name: 'Moi',
      avatar: 'https://picsum.photos/301',
    },
    sent: true,
    received: true
  },
  {
    _id: 3,
    text: "Super ! T'as eu des coups de cœur ?",
    createdAt: new Date(Date.now() - 3600000 * 23),
    user: {
      _id: 2,
      name: 'Alice Martin',
      avatar: 'https://picsum.photos/300',
    },
    sent: true,
    received: true
  },
  {
    _id: 4,
    text: "Oui, il y en a un dans le 11ème qui est pas mal du tout. Bien plac, lumineux, dans mon budget",
    createdAt: new Date(Date.now() - 3600000 * 22),
    user: {
      _id: 1,
      name: 'Moi',
      avatar: 'https://picsum.photos/301',
    },
    sent: true,
    received: true
  },
  {
    _id: 5,
    text: "T'as des photos à me montrer ?",
    createdAt: new Date(Date.now() - 3600000 * 22),
    user: {
      _id: 2,
      name: 'Alice Martin',
      avatar: 'https://picsum.photos/300',
    },
    sent: true,
    received: true
  },
  {
    _id: 6,
    text: "Je t'envoie ça ! 📸",
    createdAt: new Date(Date.now() - 3600000 * 21),
    user: {
      _id: 1,
      name: 'Moi',
      avatar: 'https://picsum.photos/301',
    },
    sent: true,
    received: true
  },
  {
    _id: 7,
    text: "Voilà les photos du salon et de la chambre",
    createdAt: new Date(Date.now() - 3600000 * 21),
    user: {
      _id: 1,
      name: 'Moi',
      avatar: 'https://picsum.photos/301',
    },
    image: 'https://picsum.photos/400',
    sent: true,
    received: true
  },
  {
    _id: 8,
    text: "Wow, il a l'air vraiment sympa ! T'as bien fait de le visiter celui-là",
    createdAt: new Date(Date.now() - 3600000 * 20),
    user: {
      _id: 2,
      name: 'Alice Martin',
      avatar: 'https://picsum.photos/300',
    },
    sent: true,
    received: true
  },
  {
    _id: 9,
    text: "Oui ! J'ai déposé un dossier, je croise les doigts 🤞",
    createdAt: new Date(Date.now() - 3600000 * 20),
    user: {
      _id: 1,
      name: 'Moi',
      avatar: 'https://picsum.photos/301',
    },
    sent: true,
    received: true
  },
  {
    _id: 10,
    text: "Je croise les doigts pour toi aussi ! Tiens moi au courant",
    createdAt: new Date(Date.now() - 3600000 * 19),
    user: {
      _id: 2,
      name: 'Alice Martin',
      avatar: 'https://picsum.photos/300',
    },
    sent: true,
    received: true
  },
  {
    _id: 11,
    text: "Merci ! Je te dis dès que j'ai des nouvelles 😊",
    createdAt: new Date(Date.now() - 3600000 * 19),
    user: {
      _id: 1,
      name: 'Moi',
      avatar: 'https://picsum.photos/301',
    },
    sent: true,
    received: true
  },
  {
    _id: 12,
    text: "Au fait, si jamais ça marche pas, ma cousine cherche aussi à louer son appart",
    createdAt: new Date(Date.now() - 3600000),
    user: {
      _id: 2,
      name: 'Alice Martin',
      avatar: 'https://picsum.photos/300',
    },
    sent: true,
    received: true
  },
  {
    _id: 13,
    text: "Ah bon ? Il est dans quel quartier ?",
    createdAt: new Date(Date.now() - 3000),
    user: {
      _id: 1,
      name: 'Moi',
      avatar: 'https://picsum.photos/301',
    },
    sent: true,
    received: true
  },
  {
    _id: 14,
    text: "Dans le 10ème, près du canal Saint-Martin",
    createdAt: new Date(Date.now() - 2000),
    user: {
      _id: 2,
      name: 'Alice Martin',
      avatar: 'https://picsum.photos/300',
    },
    sent: true,
    received: true
  },
  {
    _id: 15,
    text: "Cool, je note ! Je te redis pour celui du 11ème d'abord 👍",
    createdAt: new Date(Date.now() - 1000),
    user: {
      _id: 1,
      name: 'Moi',
      avatar: 'https://picsum.photos/301',
    },
    sent: true,
    received: false,
    pending: true
  }
];

export default function MessageDetail() {
  const insets = useSafeAreaInsets();

  const [messages, setMessages] = useState<IMessage[]>(messageData);
  const [inputText, setInputText] = useState('');

  const onSend = useCallback((newMessages: IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );
    setInputText('');
  }, []);

  const renderInputToolbar = (props: any) => (
    <InputToolbar
      {...props}
      containerStyle={{ ...styles.inputContainer, paddingBottom: insets.bottom }}
      primaryStyle={styles.inputPrimary}
    />
  );

  const renderComposer = (props: any) => (
    <View style={styles.composerContainer}>
      <View style={styles.plusButton}>
        <AntDesign name="plus" size={20} color="#8B8B8B" />
      </View>
      <Composer
        {...props}
        textInputStyle={styles.composer}
        placeholder="Message"
      />
      {props.text.trim() ? (
        <Send {...props} containerStyle={styles.sendContainer}>
          <View style={styles.sendButton}>
            <Feather name="send" size={24} color="white" />
          </View>
        </Send>
      ) : null}
    </View>
  );

  const renderBubble = (props: any) => {
    const isUser = props.currentMessage.user._id === 1;
    return (
      <View
        style={{
          backgroundColor: isUser ? '#F7A400' : 'white',
          borderRadius: 10,
          borderWidth: isUser ? 0 : 1,
          borderColor: '#663399',
          padding: 12,
          maxWidth: '80%',
        }}
      >
        <Small color={isUser ? 'white' : '#663399'}>
          {props.currentMessage.text}
        </Small>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
      <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}>
        <View style={{ gap: 24, display: "flex", flexDirection: "column", paddingHorizontal: 20, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: "rgba(102, 51, 153, 0.1)" }}>
          <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Back position="relative" left="0" />
            <View style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <NavigationTitle color="#000">{userData.name}</NavigationTitle>
              <ExtraSmallMedium color="#1ED325">{userData.status === 0 ? `${i18n.t('disconnect')}` : `${i18n.t('online')}` }</ExtraSmallMedium>
            </View>
          </View>
          <Image source={{ uri: userData.avatar }} style={{ width: 60, height: 60, borderRadius: 100 }} />
        </View>
      </View>
      <GiftedChat
        // inverted={false}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: 1 }}
        scrollToBottom={true}
        bottomOffset={insets.bottom}
        timeFormat='HH:mm'
        dateFormat='DD/MM/YYYY'
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderBubble={renderBubble}
        messagesContainerStyle={{
          paddingHorizontal: 12
        }}
        minInputToolbarHeight={70}
        listViewProps={{
          showsVerticalScrollIndicator: false,
          keyboardDismissMode: 'on-drag',
          keyboardShouldPersistTaps: 'handled'
        }}
        text={inputText}
        onInputTextChanged={text => setInputText(text)}
        alwaysShowSend={false}

      />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  inputContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  inputPrimary: {
    alignItems: 'center',
  },
  composerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 10,
  },
  composer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B9B9B9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxHeight: 100,
    minHeight: 48,
  },
  plusButton: {
    width: 48,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#B9B9B9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#F7A400',
    justifyContent: 'center',
    alignItems: 'center',
  },
});