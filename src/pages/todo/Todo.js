import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  CardHeader,
  Typography,
  CardActions,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Todo = () => {
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


  const deleteClube = async (id) => {
    const confirmation = window.confirm(`¿Estás seguro de que deseas eliminar este club?`);
    if (confirmation) {
      const url = `http://localhost:3000/clubes/${id}`;
      const response = await fetch(url, {
        method: "DELETE"
      });
      const data = await response.json();

      if (data && data.status === "success") {
        getClubes();
      }
    }
  };


  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
        </Grid>
        <Grid item md={12} xs={12}>
          <Card>
            <CardHeader title="Editar Clubes" />
            <CardContent>
              {
                clubes && clubes.length > 0 && clubes.map((item) => {
                  return (
                    <>
                    <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {item.name}
                            <Button size="small" color="primary" 
                            style={{ color: "grey", fontSize: "15px" }}
                            >
                                Editar
                            </Button>
                            <Button size="small" color="primary" 
                            style={{ color: "red", fontSize: "15px" }}
                            onClick={() => deleteClube(item._id)}>
                                Eliminar
                            </Button>
                            
                      </Typography>
                    </CardContent>
                    </>
                  )
                })
              }
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Todo