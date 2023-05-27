import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Backdrop, CircularProgress } from '@mui/material';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../../../firebase';
import Image from '../../../image.jpg';

const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const db = getFirestore();
      const servicesRef = collection(db, 'services');
      const userServicesQuery = query(servicesRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(userServicesQuery);
      const servicesData = [];

      const storage = getStorage();

      querySnapshot.forEach(async (doc) => {
        const service = doc.data();

        try {
          const imageUrl = await getDownloadURL(ref(storage, service.imageUrl));
          servicesData.push({ id: doc.id, ...service, imageUrl });
        } catch (error) {
          console.log('Error fetching image URL:', error);
          // Handle error or use a placeholder image URL
          servicesData.push({ id: doc.id, ...service, imageUrl: 'placeholder-image-url' });
        }
      });

      setServices(servicesData);
      setIsLoading(false);
    };

    fetchServices();
  }, []);

  return (
    <>
      {isLoading ? (
        <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      ) : services.length === 0 ? (
        <Typography variant="body1">No services found. Add services from the dashboard.</Typography>
      ) : (
        <Grid container spacing={2}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card>
                <CardContent>
                  <img src={Image} alt="Service" style={{ width: '100%' }} />
                  <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                    {service.serviceName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Price: {service.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Escrow: {service.escrow}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Services;
