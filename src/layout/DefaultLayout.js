import React from 'react';
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Container
} from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles, styled } from '@material-ui/core/styles';
import {
  House as HouseIcon,
  LocationCity as LocationCityIcon
} from '@material-ui/icons';
import { UnstyledLink } from '../components';

const drawerWidth = 240;

const DrawerTitle = styled('div')(({ theme }) => ({
  minHeight: 64,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between', 
  paddingLeft: theme.spacing(2)
}));

const DefaultContainer = styled(Container)(({ theme }) => ({
  flex: 1,
  paddingLeft: theme.spacing(7),
  paddingTop: 64,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.grey[200]
}))

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawer: {
    position: 'fixed',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap>
            Mini variant drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        onMouseOver={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <DrawerTitle>
          <Typography variant="h6">Entidades</Typography>
        </DrawerTitle>
        <Divider />
        <List>
          {[
            {
              text: 'Estados',
              icon: <LocationCityIcon />,
              url: '/estados'
            },
            {
              text: 'Cidades',
              icon: <HouseIcon />,
              url: '/cidades'
            }
          ].map(elem => (
            <UnstyledLink to={elem.url}>
              <ListItem button key={elem.text}>
                <ListItemIcon>{elem.icon}</ListItemIcon>
                <ListItemText primary={elem.text} />
              </ListItem>
            </UnstyledLink>
          ))}
        </List>
      </Drawer>
      <DefaultContainer component="main" maxWidth="lg">
        {props.children}
      </DefaultContainer>
    </>
  );
}
