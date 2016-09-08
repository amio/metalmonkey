import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { blueGrey800 } from 'material-ui/styles/colors'

export default getMuiTheme({
  palette: {
    primary1Color: '#EB5A5A',
    textColor: blueGrey800
  },
  appBar: {
    height: 56,
    titleStyle: {
      fontSize: 20
    }
  }
})
