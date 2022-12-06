import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import "../css/slider.css";
import Button from "@mui/material/Button";
import ImageBackgroud from "../img/dashboard.png";
import userImage from "../img/user.png";
import alimentos from "../img/alimentos.png";
import persona from "../img/programador.png";
import radioactivo from "../img/radioactivo.png";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CircularProgress from "@mui/material/CircularProgress";
import { LogoutButton } from "../components/Logout";
import { Profile } from "../components/Profile";
const styles = {
  paperContainer: {
    backgroundImage: `url(${ImageBackgroud})`,
    paddingTop: "5%",
    paddingBottom: "5%",
    paddingLeft: "7%",
    paddingRight: "7%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DashboardAdmin = () => {
  const theme = useTheme();

  const names = ["Obtener alimentos", "Obtener contaminantes", "Obtener..."];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const [personName, setPersonName] = React.useState([]);

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <Container maxWidth="false" className="overflow-hidden p-0">
      <Container
        maxWidth="false"
        className=" d-flex justify-content-between"
        style={styles.paperContainer}
      >
        <div className="d-flex flex-column justify-content-center">
          <Profile />
        </div>

        <div className="d-flex flex-column align-items-center justify-content-center">
          <LogoutButton />
        </div>
      </Container>
      <Grid
        container
        spacing={4}
        style={{ padding: "4% 4% 4% 4%" }}
        className="d-flex justify-content-center gap-4"
      >
        <Grid
          item
          xs={7}
          className="shadow d-flex flex-column gap-3"
          style={{ padding: "3% 2% 3% 2%" }}
        >
          <div className="d-flex flex-column mb-3">
            <Typography variant="h6" className="fw-bold">
              Generador de reportes
            </Typography>
            <Typography variant="subtitle1" className="text-secondary mb-3">
              Reportes generados en base a los datos guardados de la encuesta ENCA.
            </Typography>
            <Link to="/reportBuilder" style={{ textDecoration: "none", width: "24%" }}>
              <Button variant="outlined" color="primary">
                Generador de reportes
              </Button>
            </Link>
          </div>

          <div className="d-flex flex-column">
            <Typography variant="h6" className="fw-bold">
              Extracción de datos
            </Typography>
            <Typography variant="subtitle1" className="text-secondary mb-3">
              Selecciona la accion y descarga el excel con los datos que necesitas.
            </Typography>
            <FormControl sx={{ width: 300 }} size="small">
              <InputLabel id="demo-multiple-name-label">Selecciona la acción</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput label="Selecciona la acción" />}
                MenuProps={MenuProps}
              >
                {names.map(name => (
                  <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="mt-4">
              <Button variant="outlined" color="primary">
                Descargar
              </Button>
            </div>
          </div>
        </Grid>
        <Grid
          item
          xs={4}
          className="shadow d-flex flex-column gap-3"
          style={{ padding: "3% 2% 3% 2%" }}
        >
          <Stack spacing={2}>
            <div>
              <Typography variant="h6" className="fw-bold">
                Cantidad de datos
              </Typography>
              <Typography variant="subtitle1" className="text-secondary mb-3">
                Información actualizada de los datos almacenados.
              </Typography>
            </div>
            <div className="d-flex align-items-center gap-4 mb-3">
              <img src={radioactivo} loading="lazy" style={{ width: 80, height: 80 }} />
              <div>
                <Typography variant="h6" className="fw-bold">
                  57
                </Typography>
                <Typography variant="body2" className="text-secondary">
                  Contaminantes
                </Typography>
              </div>
            </div>
            <div className="d-flex align-items-center gap-4 mb-3">
              <img src={alimentos} loading="lazy" style={{ width: 80, height: 80 }} />
              <div>
                <Typography variant="h6" className="fw-bold">
                  53
                </Typography>
                <Typography variant="body2" className="text-secondary">
                  Alimentos
                </Typography>
              </div>
            </div>
            <div className="d-flex align-items-center gap-4">
              <img src={persona} loading="lazy" style={{ width: 80, height: 80 }} />
              <div>
                <Typography variant="h6" className="fw-bold">
                  10,200
                </Typography>
                <Typography variant="body2" className="text-secondary">
                  Usuarios encuestados
                </Typography>
              </div>
            </div>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withAuthenticationRequired(DashboardAdmin, {
  onRedirecting: () => (
    <div className="position-absolute top-50 start-50 translate-middle">
      {" "}
      <CircularProgress />
    </div>
  ),
});
