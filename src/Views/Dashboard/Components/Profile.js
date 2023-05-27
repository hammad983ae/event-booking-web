import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Edit, Save } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Profile = () => {
  const classes = useStyles();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [profileImage, setProfileImage] = useState('');

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // Perform save operation or update API request here
    // You can update the name, email, and profileImage states
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    // Perform file upload operation here
    // Update the profileImage state with the new image URL or base64 data
  };

  return (
    <Card>
      <CardHeader title="Profile" />
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box display="flex" justifyContent="center">
              <Avatar alt="Profile Picture" src={profileImage} className={classes.avatar} />
            </Box>
            <Box mt={2}>
              {editing ? (
                <TextField
                  type="file"
                  id="profile-image-upload"
                  onChange={handleProfileImageChange}
                  inputProps={{ accept: 'image/*' }}
                />
              ) : (
                <Button component="label" htmlFor="profile-image-upload" startIcon={<Edit />}>
                  Change Picture
                  <input type="file" id="profile-image-upload" hidden />
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="h6" gutterBottom>
              Name
            </Typography>
            {editing ? (
              <TextField fullWidth value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <Typography>{name}</Typography>
            )}
            <Typography variant="h6" gutterBottom>
              Email
            </Typography>
            {editing ? (
              <TextField fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            ) : (
              <Typography>{email}</Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
      <Box display="flex" justifyContent="flex-end" p={2}>
        {editing ? (
          <IconButton color="primary" onClick={handleSave}>
            <Save />
          </IconButton>
        ) : (
          <IconButton color="primary" onClick={handleEdit}>
            <Edit />
          </IconButton>
        )}
      </Box>
    </Card>
  );
};

export default Profile;
