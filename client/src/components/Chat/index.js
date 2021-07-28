import styled, { css } from 'styled-components'

import React, { useState, useEffect, useRef } from 'react'
import { to_Decrypt, to_Encrypt } from '../../aes.js'
import { process } from '../../store/action/index'
import { useDispatch } from 'react-redux'

const scrollbars = ({ size, foregroundColor, backgroundColor }) => css`
  &::-webkit-scrollbar {
    height: ${size};
    width: ${size};
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${foregroundColor};
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: ${backgroundColor};
  }

  // stylesheet for the display in Internet Explorer
  & {
    scrollbar-track-color: ${backgroundColor};
    scrollbar-face-color: ${foregroundColor};
  }
`
const ChatContainer = styled.div`
  display: flex;
  width: 400px;
  padding: 1rem;
  justify-content: space-between;
  height: 600px;
  flex-direction: column;
  background-color: var(--greyColor);
`

const UsernameContainer = styled.div`
  width: 100%;
  text-align: start;

  h2 {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-weight: 300;
    padding-bottom: 1rem;
  }

  span {
    font-size: 0.7rem;
  }
`

const backgroundColor = '#667aff'
const yellowColor = '#ffac41'

const MessagesContainer = styled.div`
  ${scrollbars({ size: '5px', backgroundColor, yellowColor })}
  height: 70%;
  display: flex;
  overflow-y: auto;
  align-content: flex-start;
  width: 100%;
  flex-direction: column;
`

const Message = styled.div`
  padding-left: 0.5rem;
  max-width: 220px;
  margin-left: 0;

  p {
    color: #b4b6be;
    font-size: 1rem;
    font-weight: 300;
    background-color: #250202;
    border-radius: 0px 10px 10px 10px;
    padding: 1rem;
  }

  span {
    color: #b4b6be;
    font-size: 0.6rem;
    padding-left: 0.5rem;
    font-weight: 200;
  }
`

const MessageRight = styled.div`
  display: flex;
  margin-left: auto;
  flex-direction: column;
  padding-right: 0.5rem;
  margin-right: 0;
  max-width: 220px;

  p {
    background-color: var(--redColor);
    text-align: end;
    color: white;
    border-radius: 10px 0px 10px 10px;
  }

  span {
    padding-left: 0rem;
    width: 100%;
    padding-right: 0.5rem;
    text-align: end;
  }
`

const SendContainer = styled.div`
  height: 50px;
  display: flex;
  width: 100%;
`

const Input = styled.input`
  background-color: #404450;
  width: 80%;
  padding-left: 1rem;
  text-decoration: none;
  border-radius: 5px 0px 0px 5px;
  border: none;

  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  background-color: var(--yellowColor);
  width: 20%;
  border-radius: 0px 5px 5px 0px;
  border: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const EndOfMessages = styled.div``

const Chat = ({ username, roomname, socket }) => {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState([])

  const dispatch = useDispatch()

  const dispatchProcess = (encrypt, msg, cipher) => {
    dispatch(process(encrypt, msg, cipher))
  }

  useEffect(() => {
    socket.on('message', (data) => {
      //decrypt the message
      const ans = to_Decrypt(data.text, data.username)
      dispatchProcess(false, ans, data.text)
      console.log(ans)
      let temp = messages
      temp.push({
        userId: data.userId,
        username: data.username,
        text: ans,
      })
      setMessages([...temp])
    })
    // maybe remove dispatchProcess if error.
  }, [socket])

  const sendData = () => {
    if (text !== '') {
      const ans = to_Encrypt(text)
      socket.emit('chat', ans)
      setText('')
    }
  }

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  console.log(messages, 'mess')

  return (
    <ChatContainer>
      <UsernameContainer>
        <h2>
          {username} <span>in {roomname}</span>
        </h2>
      </UsernameContainer>
      <MessagesContainer>
        {messages.map((i) => {
          if (i.username === username) {
            return (
              <Message>
                <p>{i.text}</p>
                <span>{i.username}</span>
              </Message>
            )
          } else {
            return (
              <MessageRight>
                <p>{i.text}</p>
                <span>{i.username}</span>
              </MessageRight>
            )
          }
        })}

        <EndOfMessages ref={messagesEndRef} />
      </MessagesContainer>
      <SendContainer>
        <Input
          placeholder='enter your message'
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendData()
            }
          }}
        />
        <Button onClick={sendData}>Send</Button>
      </SendContainer>
    </ChatContainer>
  )
}

export default Chat
