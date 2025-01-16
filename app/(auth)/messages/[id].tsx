import Back from '@/components/back-button'
import { NavigationTitle, Small } from '@/components/ui/text'
import { Colors } from '@/constants/Colors'
import { sendMessage, useConversationMessages } from '@/lib/api/message'
import { user$ } from '@/lib/observables/session-observable'
import { AntDesign, Feather } from '@expo/vector-icons'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useGlobalSearchParams, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Composer,
  GiftedChat,
  InputToolbar,
  Send
} from 'react-native-gifted-chat'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function MessageDetail() {
  const { id } = useLocalSearchParams();
  const { title } = useGlobalSearchParams();
  const userData = user$.get();
  
  const insets = useSafeAreaInsets()
  const { data: messages, isLoading, error } = useConversationMessages(id as string);

  const [inputText, setInputText] = useState('')

  const queryClient = useQueryClient()
  
  const sendMessageMutation = useMutation({
    mutationFn: (content: string) => 
      sendMessage(id as string, content, userData?.id || ''),
    onSuccess: (newMessage) => {
      // Mise à jour du cache
      queryClient.setQueryData(['messages', id], (oldMessages: any) => 
        [...(oldMessages || []), newMessage]
      )
      setInputText('')
    },
  })

  const onSend = (messages = []) => {
    const [message] = messages
    if (message.text.trim()) {
      sendMessageMutation.mutate(message.text)
    }
  }

  const renderInputToolbar = (props: any) => (
    <InputToolbar
      {...props}
      containerStyle={{
        ...styles.inputContainer,
        paddingBottom: insets.bottom,
      }}
      primaryStyle={styles.inputPrimary}
    />
  )

  const renderComposer = (props: any) => (
    <View style={styles.composerContainer}>
      <View style={styles.plusButton}>
        <AntDesign name='plus' size={20} color='#8B8B8B' />
      </View>
      <Composer
        {...props}
        textInputStyle={styles.composer}
        placeholder='Message'
      />
      {props.text.trim() ? (
        <Send {...props} containerStyle={styles.sendContainer}>
          <View style={styles.sendButton}>
            <Feather name='send' size={24} color='white' />
          </View>
        </Send>
      ) : null}
    </View>
  )

  const renderBubble = (props: any) => {
    const isUser = props.currentMessage.user._id === userData.id
    return (
      <View
        style={{
          backgroundColor: isUser ? Colors.light.primary : 'white',
          borderRadius: 10,
          borderWidth: isUser ? 0 : 1,
          borderColor: Colors.light.secondary,
          padding: 12,
          maxWidth: '80%',
        }}
      >
        <Small color={isUser ? 'white' : Colors.light.secondary}>
          {props.currentMessage.text}
        </Small>
      </View>
    )
  }

  useEffect(() => {
    console.log('messages', messages)
    console.log('id', id)
    console.log('title', title)
  }, [messages])

  return (
    // <KeyboardAvoidingView
    //     style={styles.container}
    //     behavior="padding"
    // >
    <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}>
      <View
        style={{
          gap: 24,
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: 20,
          paddingBottom: 12,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(102, 51, 153, 0.1)',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <Back position='relative' left='0' />
            <View style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <NavigationTitle color='#000'>{title}</NavigationTitle>
            </View>
          </View>
        </View>
      </View>
      <GiftedChat
        inverted={false}
        messages={messages}
        onSend={onSend}
        user={{ _id: userData.id, name: userData.first_name }}
        scrollToBottom={true}
        bottomOffset={0}
        timeFormat='HH:mm'
        dateFormat='DD/MM/YYYY'
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderBubble={renderBubble}
        messagesContainerStyle={{
          paddingHorizontal: 12,
        }}
        minInputToolbarHeight={70}
        listViewProps={{
          showsVerticalScrollIndicator: false,
          keyboardDismissMode: 'on-drag',
          keyboardShouldPersistTaps: 'handled',
        }}
        text={inputText}
        onInputTextChanged={text => setInputText(text)}
        alwaysShowSend={false}
      />
    </View>
    // </KeyboardAvoidingView>
  )
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
})
