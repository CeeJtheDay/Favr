import React, { useState } from 'react'
import Paper from 'material-ui/Paper'
import List, { ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import Typography from 'material-ui/Typography'
import ArrowForward from 'material-ui-icons/ArrowForward'
import Person from 'material-ui-icons/Person'
import { Link } from 'react-router-dom'
import { createMuiTheme } from 'material-ui/styles';




const Users = () => {

  const theme = createMuiTheme();
  const classes = {
    root: theme.mixins.gutters({
      padding: theme.spacing.unit,
      margin: theme.spacing.unit * 5
    }),
    title: {
      margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px`,
      color: theme.palette.openTitle
    }
  };
  const [state, setState] = useState({
    users: []
  });

  // componentDidMount() {
  //   list().then((data) => {
  //     if (data.error) {
  //       console.log(data.error)
  //     } else {
  //       this.setState({ users: data })
  //     }
  //   })
  // }

  return (
    <Paper style={classes.root} elevation={4}>
      <Typography type="title" style={classes.title}>
        All Users
        </Typography>
      <List dense>
        {this.state.users.map((item, i) => {
          return <Link to={"/user/" + item._id} key={i}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton>
                  <ArrowForward />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
        })
        }
      </List>
    </Paper>
  )
}



export default Users;
