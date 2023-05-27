import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Rating, TextField, Button, Input, Box, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { styled } from '@mui/system';
import { ArrowUpward } from '@mui/icons-material';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease-in-out',
    boxShadow: theme.shadows[6],
  },
}));

const DashboardCards = () => {
  const activeServices = 10;
  const priceRange = '$100 - $500';
  const escrowAmount = '$1,000';
  const rating = 4.5;

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [serviceName, setServiceName] = useState('');
  const [price, setPrice] = useState('');
  const [escrow, setEscrow] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    try {
      const storageRef = ref(storage, 'images/' + file.name);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      setSelectedImageUrl(downloadURL);
    } catch (error) {
      console.log('Error uploading image:', error);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        // User not logged in, handle the error or show a message
        return;
      }

      // Add the service data to the 'services' collection
      const newServiceRef = await addDoc(collection(db, 'services'), {
        userId: user.uid, // Save the user ID
        serviceName,
        price,
        escrow,
        imageUrl: selectedImageUrl,
      });
      console.log('New service document ID:', newServiceRef.id);

      // Add the service data to the user-specific document in the 'users' collection
      const userServicesRef = doc(db, 'users', user.uid);
      await setDoc(
        userServicesRef,
        {
          [newServiceRef.id]: {
            serviceName,
            price,
            escrow,
            imageUrl: selectedImageUrl,
          },
        },
        { merge: true }
      );
      console.log('User service document updated');

      // Show success notification
      setSnackbarMessage('Service added successfully!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding service document:', error);

      // Show error notification
      setSnackbarMessage('Error adding service. Please try again.');
      setSnackbarOpen(true);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" component="div">
              Tab 1 - Active Services
            </Typography>
            <Typography variant="h4">{activeServices}</Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" component="div">
              Price Range
            </Typography>
            <Typography variant="h4">{priceRange}</Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" component="div">
              Escrow
            </Typography>
            <Typography variant="h4">{escrowAmount}</Typography>
          </CardContent>
        </StyledCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" component="div">
              Ratings
            </Typography>
            <Rating value={rating} precision={0.5} readOnly />
          </CardContent>
        </StyledCard>
      </Grid>

      {/* Add New Services Form */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="div">
              Add New Service
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Service Name"
                  fullWidth
                  margin="normal"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                />
                <TextField
                  label="Price"
                  fullWidth
                  margin="normal"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
                <TextField
                  label="Escrow"
                  fullWidth
                  margin="normal"
                  value={escrow}
                  onChange={(e) => setEscrow(e.target.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
                <Button variant="contained" color="primary" onClick={handleFormSubmit}>
                  Submit
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                  flexDirection="column"
                  textAlign="center"
                >
                  <label htmlFor="image-upload">
                    <IconButton color="primary" aria-label="upload image" component="span">
                      <ArrowUpward fontSize="large" />
                    </IconButton>
                  </label>
                  <Typography variant="subtitle1" gutterBottom>
                    Upload Image Here
                  </Typography>
                  <Box border={1} p={2} borderRadius={4} borderColor="grey.400" bgcolor="grey.100">
                    {selectedImage ? (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Uploaded"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                      />
                    ) : (
                      <Box
                        bgcolor="white"
                        borderRadius={4}
                        boxShadow={1}
                        p={2}
                        minHeight={200}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography variant="subtitle2" color="textSecondary">
                          Image Preview
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                  />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Snackbar */}
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <Alert severity={snackbarMessage.includes('Error') ? 'error' : 'success'} onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default DashboardCards;
