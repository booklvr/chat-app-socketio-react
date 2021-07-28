import styled from 'styled-components'

import React from 'react'
import { useSelector } from 'react-redux'

const ProcessContainer = styled.div`
  align-items: center;
  min-height: 500px;
  padding: 2rem;
  width: 450px;
  flex-direction: column;
  display: flex;
  margin-right: 12rem;
  justify-content: space-evenly;
`

const ProcessH5 = styled.h5`
  font-weight: 400;
  margin-bottom: 5rem;
  color: rgb(4, 238, 4);
  span {
    color: yellow;
  }
`

const IncomingContainer = styled.div`
  width: 100%;
  margin-bottom: 15rem;
  overflow: auto;
  text-overflow: auto;
`

const CryptContainer = styled.div`
  width: 100%;
  overflow: auto;
  height: 100%;
`

const H4 = styled.h4`
  font-weight: 400;
  color: rgb(4, 238, 4);
`

const P = styled.p`
  font-size: 1rem;
  padding: 1.2rem;
  margin-top: 0.5rem;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);
  text-overflow: auto;
`

const Process = () => {
  const state = useSelector((state) => state.ProcessReducer)

  return (
    <ProcessContainer>
      <ProcessH5>
        Secret Key : <span>"uI2ooxtwHeI6q69PS98fx9SWVGbpQohO"</span>
      </ProcessH5>
      <IncomingContainer>
        <H4>Incoming Data</H4>
        <P>{state.cypher}</P>
      </IncomingContainer>
      <CryptContainer>
        <H4>Decypted Data</H4>
        <P>{state.text}</P>
      </CryptContainer>
    </ProcessContainer>
  )
}

export default Process
