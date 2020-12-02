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
  Home as HomeIcon,
  AccountBox as AccountBoxIcon,
  LocalHospital as LocalHospitalIcon,
  AssignmentLate as AssignmentLateIcon,
  Warning as WarningIcon,
  Phone as PhoneIcon,
  Exposure as ExposureIcon,
  MonetizationOn as MonetizationOnIcon,
  Error as ErrorIcon
} from '@material-ui/icons';
import { UnstyledLink } from 'components';

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
    zIndex: 3,
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
    width: theme.spacing(7) + 1,
  },
  drawerScroll: {
    width: theme.spacing(9)
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

const menuItems = [
  {
    text: 'Início',
    icon: <HomeIcon />,
    url: '/'
  },
  {
    text: 'Pessoas',
    icon: <AccountBoxIcon />,
    url: '/pessoas'
  },
  {
    text: 'Boletim Estadual',
    icon: <AssignmentLateIcon />,
    url: '/boletim-estadual'
  },
  {
    text: 'Grupos de Risco',
    icon: <WarningIcon />,
    url: '/grupos-de-risco'
  },
  {
    text: 'Postos',
    icon: <LocalHospitalIcon />,
    url: '/postos'
  },
  {
    text: 'Auxílio Emergencial',
    icon: <MonetizationOnIcon />,
    url: '/auxilios-emergenciais'
  },
  {
    text: 'Telefones',
    icon: <PhoneIcon />,
    url: '/telefones'
  },
  {
    text: 'Pessoas em Risco',
    icon: <ErrorIcon />,
    url: 'pessoas-em-risco'
  },
  {
    text: 'Testes',
    icon: <ExposureIcon />,
    url: '/testes'
  }
];

export default function MiniDrawer(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState(window.innerHeight < 620);

  window.addEventListener('resize', () => {
    setScroll(window.innerHeight < 620);
  })

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
          <UnstyledLink to="/">
            <Typography variant="h6" noWrap>
              Boletim Covid
            </Typography>
          </UnstyledLink>
        </Toolbar>
      </AppBar>
      <Drawer
        onMouseOver={handleDrawerOpen}
        onMouseLeave={handleDrawerClose}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerScroll]: scroll && !open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerScroll]: scroll && !open,
            [classes.drawerClose]: !open
          }),
        }}
      >
        <DrawerTitle>
          <Typography variant="h6">Entidades</Typography>
        </DrawerTitle>
        <Divider />
        <List>
          {menuItems.map(elem => (
            <UnstyledLink key={elem.url} to={elem.url}>
              <ListItem button key={elem.text}>
                <ListItemIcon>{elem.icon}</ListItemIcon>
                <ListItemText primary={elem.text} />
              </ListItem>
            </UnstyledLink>
          ))}
        </List>
      </Drawer>
      <DefaultContainer component="main">
        {props.children}
      </DefaultContainer>
    </>
  );
}
