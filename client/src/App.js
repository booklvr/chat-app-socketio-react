import Chat from './components/Chat'
import styled from 'styled-components'
import { GlobalStyle } from './globalStyles'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import io from 'socket.io-client'
import Process from './components/Process'
import Home from './components/Home'

const socket = io.connect('/')

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Right = styled.div`
  flex: 2;
`

const Left = styled.div`
  flex: 1;
`

function AppMain(props) {
  return (
    <>
      <Right>
        <Chat
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        />
      </Right>
      <Left>
        <Process />
      </Left>
    </>
  )
}

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <Switch>
          <Route path='/' exact>
            <Home socket={socket} />
          </Route>
          <Route path='/chat/:roomname/:username' component={AppMain} />
        </Switch>
      </AppContainer>
    </Router>
  )
}

export default App
