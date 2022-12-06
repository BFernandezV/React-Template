import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import backArrow from "../img/back.png";
import Chip from "@mui/material/Chip";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Slider from "@mui/material/Slider";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import CircularProgress from "@mui/material/CircularProgress";

const ReportBuilder = () => {
  function valuetext(value) {
    return `${value}KG`;
  }

  const [expanded, setExpanded] = useState(false);

  const handleChangeAccordion = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function createData(id, name, type) {
    return { id, name, type };
  }

  const [valueSliderAge, setValueSliderAge] = React.useState([20, 37]);
  const [valueSliderWeight, setValueSliderWeight] = React.useState([20, 37]);

  const handleChangeSliderAge = (event, newValue) => {
    setValueSliderAge(newValue);
  };
  const handleChangeSliderWeight = (event, newValue) => {
    setValueSliderWeight(newValue);
  };
  const rowsFoods = [
    createData(1, `Alimento1`, `Tipo1`),
    createData(2, `Alimento2`, `Tipo2`),
    createData(3, `Alimento3`, `Tipo3`),
    createData(4, `Alimento4`, `Tipo4`),
    createData(5, `Alimento5`, `Tipo5`),
    createData(6, `Alimento6`, `Tipo6`),
    createData(7, `Alimento7`, `Tipo7`),
    createData(8, `Alimento8`, `Tipo8`),
    createData(9, `Alimento9`, `Tipo9`),
    createData(10, `Alimento10`, `Tipo10`),
    createData(11, `Alimento11`, `Tipo11`),
    createData(12, `Alimento12`, `Tipo12`),
    createData(13, `Alimento13`, `Tipo13`),
  ];
  const rowsContaminantes = [
    createData(1, `Contaminante1`, `Tipo1`),
    createData(2, `Contaminante2`, `Tipo2`),
    createData(3, `Contaminante3`, `Tipo3`),
    createData(4, `Contaminante4`, `Tipo4`),
    createData(5, `Contaminante5`, `Tipo5`),
    createData(6, `Contaminante6`, `Tipo6`),
    createData(7, `Contaminante7`, `Tipo7`),
    createData(8, `Contaminante8`, `Tipo8`),
    createData(9, `Contaminante9`, `Tipo9`),
    createData(10, `Contaminante10`, `Tipo10`),
    createData(11, `Contaminante11`, `Tipo11`),
    createData(12, `Contaminante12`, `Tipo12`),
    createData(13, `Contaminante13`, `Tipo13`),
  ];
  return (
    <Container maxWidth="xxl" className="overflow-hidden p-0">
      <Container maxWidth="false" className="my-5 m-0 px-5">
        <Link to="/dashboardAdmin">
          <img
            href="/"
            src={backArrow}
            className="img-fluid img-arrow"
            style={{ width: "40px", height: "40px" }}
          ></img>
        </Link>
      </Container>

      <Grid container spacing={2} className="d-flex justify-content-between my-5 mx-5 vh-100">
        <Grid xs={6}>
          <Container maxWidth="md" style={{ marginStart: "100px" }}>
            <Typography variant="h4" className="fw-bold mb-3">
              Generador de reportes
            </Typography>
            <Accordion expanded={expanded === "panel1"} onChange={handleChangeAccordion("panel1")}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Contaminantes</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  label="Search"
                  id="outlined-size-small"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TableContainer sx={{ maxHeight: 300 }}>
                  <Table size="small" stickyHeader aria-label="dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Nombre</TableCell>
                        <TableCell align="left">Tipo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowsContaminantes.map(row => (
                        <TableRow
                          hover
                          role="checkbox"
                          key={row.id}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel2"} onChange={handleChangeAccordion("panel2")}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>Alimentos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  label="Search"
                  id="outlined-size-small"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <TableContainer sx={{ maxHeight: 300 }}>
                  <Table size="small" stickyHeader aria-label="dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Nombre</TableCell>
                        <TableCell align="left">Tipo</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rowsFoods.map(row => (
                        <TableRow
                          hover
                          role="checkbox"
                          key={row.id}
                          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.type}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === "panel3"} onChange={handleChangeAccordion("panel3")}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography>Filtros de población</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="top">
                  <div>
                    <Typography className="mb-2">Sexo</Typography>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox />} label="Masculino" />
                      <FormControlLabel control={<Checkbox />} label="Femenino" />
                    </FormGroup>
                  </div>
                  <div>
                    <Typography className="mb-2">Rango de edad (Años)</Typography>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={valueSliderAge}
                      onChange={handleChangeSliderAge}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                    />
                  </div>
                  <div>
                    <Typography className="mb-2">Rango de peso (KG)</Typography>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={valueSliderWeight}
                      onChange={handleChangeSliderWeight}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                    />
                  </div>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Container>
        </Grid>
        <Grid xs={6}>
          <Container
            className="p-0 d-flex flex-column justify-content-center px-4 py-3 align-items-start bg-white border shadow-sm rounded gap-4"
            style={{ marginTop: "56px" }}
          >
            <Typography variant="h5" className="fw-bold">
              Resumen de reporte
            </Typography>
            <div className="d-flex flex-column gap-2">
              <Typography variant="subtitle1">Selección de contaminantes</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip label="Contaminante 1" />
                <Chip label="Contaminante 2" />
                <Chip label="Contaminante 3" />
              </Stack>
            </div>
            <div className="d-flex flex-column gap-2">
              <Typography variant="subtitle1">Selección de alimentos</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Chip label="Alimento 1" />
                <Chip label="Alimento 2" />
                <Chip label="Alimento 3" />
              </Stack>
            </div>
            <div className="d-flex flex-column gap-2">
              <Typography variant="subtitle1">Filtros de población</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: "#ebebeb", width: "32px", height: "32px" }}
                >
                  <FemaleIcon />
                </div>
                <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: "#ebebeb", width: "32px", height: "32px" }}
                >
                  <MaleIcon />
                </div>

                <Chip label="18 - 40 años" />
                <Chip label="70 - 100 KG" />
              </Stack>
            </div>
            <div className="w-100 d-flex justify-content-end">
              <Button variant="contained">Descargar Reporte</Button>
            </div>
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withAuthenticationRequired(ReportBuilder, {
  onRedirecting: () => (
    <div className="position-absolute top-50 start-50 translate-middle">
      {" "}
      <CircularProgress />
    </div>
  ),
});
