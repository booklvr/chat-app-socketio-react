import styled from 'styled-components'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const HomepageContainer = styled.div`
  width: 500px;
  height: 500px;
  padding: 2rem;
  background-color: #2d343e;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  border-radius: 5px;
`

const HomeH1 = styled.h1``

const Input = styled.input`
  height: 50px;
  width: 80%;
  background-color: #404450;
  border: none;
  padding-left: 1rem;
  border-radius: 5px;

  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  width: 100px;
  border: none;
  background-color: #ffac41;
  border-radius: 5px;
  color: black;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const Home = ({ socket }) => {
  const [username, setUsername] = useState('')
  const [roomname, setRoomname] = useState('')

  //activates joinRoom function defined on the backend.
  const sendData = () => {
    if (username !== '' && roomname !== '') {
      socket.emit('joinRoom', { username, roomname })
      //if empty error message pops up and returns to the same page
    } else {
      alert('username and roomname are a must!')
      window.location.reload()
    }
  }

  return (
    <HomepageContainer>
      <HomeH1>Welcome to ChatApp</HomeH1>
      <Input
        placeholder='Input your name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        placeholder='Input your room'
        value={roomname}
        onChange={(e) => setRoomname(e.target.value)}
      />
      <Link to={`/chat/${roomname}/${username}`}>
        <Button onClick={sendData}>Join</Button>
      </Link>
    </HomepageContainer>
  )
}

export default Home
