import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useUserAuth } from '../../Context/UserAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import DashboardCards from './Components/Dash';
import Servi from './Components/Servie';
import Profile from './Components/Profile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: '240px',
    flexShrink: 0,
  },
  drawerPaper: {
    width: '240px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '64px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  logoText: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  signOut: {
    marginTop: 'auto',
  },
}));

const Dashboard = () => (
  <div>
    <DashboardCards />
  </div>
);

const Services = () => (
  <div>
    <Servi />
  </div>
);

const Sidebar = () => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const { logOut } = useUserAuth();
  const Navigate = useNavigate();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        // Navigate to the home page
        Navigate('/');
      })
      .catch((error) => {
        console.log('Sign-out error', error);
      });
  };

  const handleTabClick = (index) => {
    setSelectedTab(index);
  };

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Box className={classes.logo}>
          <Typography variant="h6" className={classes.logoText}>
            My Logo
          </Typography>
        </Box>
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem button onClick={() => handleTabClick(0)} selected={selectedTab === 0}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => handleTabClick(1)} selected={selectedTab === 1}>
              <ListItemIcon>
                <WorkIcon />
              </ListItemIcon>
              <ListItemText primary="Services" />
            </ListItem>
            <ListItem button onClick={() => handleTabClick(2)} selected={selectedTab === 2}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </Box>
        <List className={classes.signOut}>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <button onClick={handleSignOut}>Sign Out</button>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {selectedTab === 0 && <Dashboard />}
        {selectedTab === 1 && <Services />}
        {selectedTab === 2 && <Profile />}
      </main>
    </div>
  );
};

export default Sidebar;
