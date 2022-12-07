import "../styles/Home.css";
import React from "react";
import { Container, Typography, Button, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { NavLink } from "react-router-dom";
import { LoginButton } from "../components/Login2";
import { LogoutButton } from "../components/Logout";
const Home = () => {
  return (
    <Container maxWidth="false" className="overflow-hidden p-0">
      <Grid container spacing={6} className="vh-100 d-flex align-items-center">
        <Grid xs={6}>
          <Container maxWidth="xs" style={{ marginStart: "100px" }}>
            <div className="d-flex flex-column justify-content-center align-items-start w-100">
              <Typography variant="h6" align="center" gutterBottom className="semibold">
                UNIVERSIDAD DE CONCEPCIÓN
              </Typography>
              <p></p>
              <Typography variant="h3" align="justify" gutterBottom className="fw-bold">
                Toxicología de la alimentación
              </Typography>
              <p></p>
              <Typography variant="h6" align="justify" gutterBottom className="semibold">
                Conocer la toxicidad que contienen los alimentos que consumes puede resultar en una
                práctica positiva.
              </Typography>
              <p></p>

              <div className="containerCenter">
                <Stack direction="row" spacing={2}>
                  <NavLink to="calculator" style={{ textDecoration: "none" }}>
                    <Button variant="outlined" color="primary">
                      Calculadora
                    </Button>
                  </NavLink>
                  <NavLink to="dashboardAdmin" style={{ textDecoration: "none" }}>
                    <Button variant="contained" color="primary">
                      Administrador
                    </Button>
                  </NavLink>
                </Stack>
              </div>
            </div>
          </Container>
        </Grid>
        <Grid xs={6}>
          <Container
            className="p-0 d-flex justify-content-center align-items-center"
            style={{
              height: "70vh",
              borderRadius: "250px 0px 0px 250px",
              backgroundColor: "#d9d9d9",
              backgroundImage: "url(/img/landing.jpeg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "105vh",
              backgroundPosition: "left center",
            }}
          ></Container>
        </Grid>
      </Grid>
      <Container
        maxWidth="false"
        className="vh-30 p-0 m-0 d-flex justify-content-center align-items-center"
        style={{
          height: "30vh",
          backgroundColor: "#FF724A",
          backgroundImage: " url(/img/figuras.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
        }}
      >
        <div style={{ height: "10vh", width: "100vh" }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            className="semibold"
            color="secondary.light"
          >
            ¿Deseas saber más?
          </Typography>
          <div className="containerCenter">
            <Stack direction="row" spacing={2}>
              <NavLink to="info" style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="white">
                  Haz click aquí
                </Button>
              </NavLink>
            </Stack>
          </div>
        </div>
      </Container>
    </Container>
  );
};
export default Home;
