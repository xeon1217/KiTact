import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import SearchIcon from '@material-ui/icons/Search'
import PersonIcon from '@material-ui/icons/Person'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import AssignmentIcon from '@material-ui/icons/Assignment'
import { BrowserRouter as Router } from 'react-router-dom'
import { Navbar } from 'react-bootstrap'
import Button from '@material-ui/core/Button'
import Permit from '../shared/Permit'
import { history } from '../redux/configStore'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'
import { Cookies } from 'react-cookie'

const drawerWidth = 180

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    position: 'relative',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  right: {
    marginLeft: 'auto',
  },
  button: {
    display: 'inline-block',
    margin: '0.5rem',
  },
  title: {
    position: 'relative',
  },
}))

const cookies = new Cookies()

export default function Header() {
  const dispatch = useDispatch()
  const is_login = !(cookies.get('is_login') === undefined)
  console.log(is_login)
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleLogout = () => {
    setOpen(false)
    dispatch(userActions.logOut())
    history.push('/map')
  }

  const clickLogin = () => {
    setOpen(false)
    history.push('/login')
  }

  const clickSignup = () => {
    setOpen(false)
    history.push('/signup')
  }

  const clickSearch = () => {
    setOpen(false)
    history.push('/map')
  }

  const clickReservation = () => {
    setOpen(false)
    history.push('/reservation')
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color='primary'
        position='fixed'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h4' noWrap className={classes.title}>
            키택트
          </Typography>
          {/* <div className={classes.right}>
            {!is_login ? (
              <div className={classes.button}>
                <Button variant='contained' color='primary' onClick={clickLogin}>
                  로그인
                </Button>
              </div>
            ) : (
              <div className={classes.button}>
                <Button variant='contained' color='primary' onClick={handleLogout}>
                  로그아웃
                </Button>
              </div>
            )}
          </div> */}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <Router>
          <List>
            {!is_login ? (
              <ListItem button key={'로그인'} onClick={clickLogin}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='로그인' />
              </ListItem>
            ) : (
              <ListItem button key={'로그아웃'} onClick={handleLogout}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='로그아웃' />
              </ListItem>
            )}
            {!is_login ? (
              <ListItem button key={'회원가입'} onClick={clickSignup}>
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary='회원가입' />
              </ListItem>
            ) : null}
          </List>
          <Divider />

          <List>
            <ListItem button key={'식당 검색'} onClick={clickSearch}>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary='식당 검색' />
            </ListItem>

            <ListItem button key={'예약'} onClick={clickReservation}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary='예약' />
            </ListItem>

            <ListItem button key={'예약 확인'} onClick={clickReservation}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary='예약 확인' />
            </ListItem>
          </List>
        </Router>
      </Drawer>
    </div>
  )
}
