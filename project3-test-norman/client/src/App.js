import React from 'react'
import MainRouter from './MainRouter'
import {BrowserRouter} from 'react-router-dom'
// import { StylesProvider } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import {createMuiTheme} from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
// import { blueGrey, lightGreen } from 'material-ui/colors'
// import { hot } from 'react-hot-loader'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: red,
    secondary: {
      main: red[100],
    },
  },
});

const App = () => (
  <BrowserRouter>
  {/* <StylesProvider injectFirst> */}
    <ThemeProvider theme={theme}>
      <MainRouter/>
    </ThemeProvider>
  {/* </StylesProvider> */}
  </BrowserRouter>
)

// export default hot(module)(App)
export default App;
