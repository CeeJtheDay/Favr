import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { StylesProvider } from '@material-ui/core'

const App = () => (
  <BrowserRouter>
  <StylesProvider injectFirst>
    {/* <ThemeProvider theme={theme}> */}
      <MainRouter/>
    {/* </ThemeProvider> */}
  </StylesProvider>
  </BrowserRouter>
)

export default hot(module)(App)
