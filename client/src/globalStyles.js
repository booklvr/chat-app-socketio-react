import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --background-color: #667aff;
    --red-color: #ff1ef6;
    --yellow-color: #ffac41;
    --greyColor: #2d343e;
  }

  * {
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    color: white;
    font-family: 'Muli', sans-serif;
  }
`
