import React, { useState, useEffect } from "react";
import { Grid, Paper, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { appSelector, appActions } from "../../redux/appRedux";


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { NavLink } from "react-router-dom";


const Dashboard = () => {
  const [clubes, setClubes] = useState(null);

  useEffect(() => {
    getClubes();
  }, [])

  const getClubes = async () => {
    const url = "http://localhost:3000/clubes";
    let infoData = await fetch(url, {
      method: "GET"
    });
    let data = await infoData.json();


    console.log(infoData);
    if (data && data.status === "success") {
      setClubes(data.data);
      console.log(data.data);
    }
  }
  
  

  
  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box>
              <Grid container justifyContent="center" rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

              {
                  clubes && clubes.length > 0 && clubes.map((club) => {
                    return (
                      <Grid item xs={6}>
                        <Card sx={{ maxWidth: 550 }}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image={require('../../assets/images/ClubAtleticoRiojano.jpg')}
                              alt="club riojano"
                            />
                            <CardContent>
                              <Typography gutterBottom variant="h5" component="div">
                                {club.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {club.description}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <NavLink to="/fetch-list" >
                              <Button size="small" color="primary">
                                Localización
                              </Button>
                            </NavLink>
                            <NavLink to="/todo" >
                              <Button size="small" color="primary">
                                Editar
                              </Button>
                            </NavLink>
                          </CardActions>
                        </Card>
                      </Grid>
                    )
                  })
                }
                
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;