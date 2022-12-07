import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import backArrow from "../img/back.png";
import FormControl from '@mui/material/FormControl';
import Chip from "@mui/material/Chip";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TableContainer from '@mui/material/TableContainer';
import axios from "axios";
import { Link } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from "@mui/material/CircularProgress";
import { withAuthenticationRequired } from "@auth0/auth0-react";


const columnsContaminants = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
];

const columnsFoods = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
];

import * as XLSX from 'xlsx/xlsx.mjs';


function ReportBuilder() {

  function valuetext(value) {
    return `${value}KG`;
  }


  const [originalRowsContaminants, setOriginalRowsContaminants] = useState({});
  const [originalRowsFoods, setOriginalRowsFoods] = useState({});
  const [rowsContaminants, setRowContaminants] = useState([]);
  const [rowsFoods, setRowFoods] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [checkedWomen, setCheckedWomen] = useState(false);
  const [checkedMen, setCheckedMen] = useState(false);
  const [valueSliderAge, setValueSliderAge] = useState([20, 37]);
  const [valueSliderWeight, setValueSliderWeight] = useState([20, 37]);
  const [selectedContaminants, setSelectedContaminants] = useState([]);
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [searchContaminants, setSearchContaminants] = useState('');
  const [searchFoods, setSearchFoods] = useState('');
  const [disabledButtonFoods, setDisabledButtonFoods] = useState(true);
  const [disabledButtonDownload, setDisabledButtonDownload] = useState(true);
  const [sheetData, setSheetData] = useState({});
  // const [loadingDownload, setLoadingDownload] = useState(false);
  useEffect(() => {
    getDataContaminants();
  }, []);

  useEffect(() => {
    if (selectedContaminants.length > 0)
      setDisabledButtonFoods(false);
    else
      (setDisabledButtonFoods(true));

    if (selectedContaminants.length > 0 && selectedFoods.length > 0)
      setDisabledButtonDownload(false);
    else
      setDisabledButtonDownload(true);
  }, [selectedContaminants, selectedFoods, checkedMen, checkedWomen,]);

  function getDataContaminants() {
    return axios.get('http://fabrica.inf.udec.cl:5001/contaminantes')
      .then((response) => {
        const responseData = response.data;
        const data = responseData.map((element, index) => { return { id: index, name: element }; });
        setOriginalRowsContaminants(data);
        setRowContaminants(data);
      });
  }

  function getDataFoods() {
    let alimentosData = selectedContaminants.map(element => element.name);
    return axios.post('http://fabrica.inf.udec.cl:5001/alimentos',
      { contaminantes: alimentosData }
    )
      .then((response) => {
        setOriginalRowsFoods(response.data.map((element, index) => { return { id: index, name: element }; }));
        setRowFoods(response.data.map((element, index) => { return { id: index, name: element }; }));
      });
  }


  const handleChangeWomen = (event) => {
    setCheckedWomen(event.target.checked);
  };

  const handleChangeMen = (event) => {
    setCheckedMen(event.target.checked);
  };

  const handleChangeAccordion = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChangeSliderAge = (event, newValue) => {
    setValueSliderAge(newValue);
  };
  const handleChangeSliderWeight = (event, newValue) => {
    setValueSliderWeight(newValue);
  };

  const handleSelectedContaminats = (arrayItems) => {
    const selectedIDs = new Set(arrayItems);
    const selectedRowData = rowsContaminants.filter((row) => selectedIDs.has(row.id)
    );

    setSelectedContaminants(Array.from(selectedRowData));
  };
  const handleSelectedFoods = (arrayItems) => {
    const selectedIDs = new Set(arrayItems);
    const selectedRowData = rowsFoods.filter((row) => selectedIDs.has(row.id)
    );

    setSelectedFoods(Array.from(selectedRowData));
  };

  const requestSearchContaminants = (searchedVal) => {
    setSearchContaminants(searchedVal.target.value);
    const filteredRows = originalRowsContaminants.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.target.value.toLowerCase());
    });
    setRowContaminants(Array.from(filteredRows));
  };

  const requestSearchFoods = (searchedVal) => {
    setSearchFoods(searchedVal.target.value);
    const filteredRows = originalRowsFoods.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.target.value.toLowerCase());
    });
    setRowFoods(Array.from(filteredRows));
  };

  const handleData = (dataSheet) => {
    let resultContaminantes = [];
    let resultAlimentos = [];

    console.log(dataSheet)


    for (let contaminant in dataSheet) {
      let arrayExtra = []
      let objectContaCont = { contaminante: contaminant, ...dataSheet[contaminant] }
      delete objectContaCont.alimentos
      resultContaminantes.push(objectContaCont);

      for (let alimento in dataSheet[contaminant].alimentos) {
        let objectContaAli = { alimento: alimento, ...dataSheet[contaminant].alimentos[alimento] }
        arrayExtra.push(objectContaAli)
      }
      resultAlimentos.push(arrayExtra);
      arrayExtra = []
    }

    setSheetData(resultContaminantes)
    handleOnExport(resultContaminantes, resultAlimentos);

  }

  const handleOnExport = (resultContaminantes, resultAlimentos) => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(resultContaminantes);


    XLSX.utils.book_append_sheet(wb, ws, "Datos Contaminantes");

    resultContaminantes.map((conta, index) => {
      let extraWS = []
      extraWS = XLSX.utils.json_to_sheet(resultAlimentos[index])
      XLSX.utils.book_append_sheet(wb, extraWS, conta.contaminante);
    })

    let fecha = new Date().toLocaleDateString()
    XLSX.writeFile(wb, `reporte_${fecha}.xlsx`);

  };

  const handleDownloadButton = () => {
    let gender = "";
    if (checkedWomen && checkedMen)
      gender = "0";
    else if (checkedWomen)
      gender = "2";
    else if (checkedMen)
      gender = "1";
    else
      gender = "0";

    return axios.post('http://fabrica.inf.udec.cl:5001/reporte',
      {
        sexo: gender,
        min_edad: valueSliderAge[0],
        max_edad: valueSliderAge[1],
        min_peso: valueSliderWeight[0],
        max_peso: valueSliderWeight[1],
        min_altura: "0",
        max_altura: "300",
        contaminantes: selectedContaminants.map(element => element.name),
        alimentos: selectedFoods.map(element => element.name)
      }
    )
      .then((response) => {
        handleData(response.data)
      });
  };



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
              <AccordionDetails className="d-flex flex-column align-items-start">
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" className="align-self-end">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-weight-helper-text"
                    endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>}
                    size="small"
                    value={searchContaminants}
                    onChange={(searchVal) => requestSearchContaminants(searchVal)} />
                </FormControl>
                <TableContainer sx={{ maxHeight: 300 }} style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rowsContaminants}
                    columns={columnsContaminants}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(event) => handleSelectedContaminats(event)} />
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
                <div className="d-flex align-items-center justify-content-between">
                  <Button variant="contained" disabled={disabledButtonFoods} onClick={getDataFoods}>Buscar Datos</Button>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <OutlinedInput
                      id="outlined-adornment-weight"
                      aria-describedby="outlined-weight-helper-text"
                      endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>}
                      size="small"
                      value={searchFoods}
                      onChange={(searchVal) => requestSearchFoods(searchVal)} />
                  </FormControl>
                </div>


                <TableContainer sx={{ maxHeight: 300 }} style={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={rowsFoods}
                    columns={columnsFoods}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(event) => handleSelectedFoods(event)} />
                </TableContainer>
              </AccordionDetails>
            </Accordion >
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
                      <FormControlLabel checked={checkedWomen} onChange={handleChangeWomen} control={<Checkbox />} label="Femenino" />
                      <FormControlLabel checked={checkedMen} onChange={handleChangeMen} control={<Checkbox />} label="Masculino" />
                    </FormGroup>
                  </div>
                  <div>
                    <Typography className="mb-2">Rango de edad (Años)</Typography>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={valueSliderAge}
                      onChange={handleChangeSliderAge}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext} />
                  </div>
                  <div>
                    <Typography className="mb-2">Rango de peso (KG)</Typography>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={valueSliderWeight}
                      onChange={handleChangeSliderWeight}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext} />
                  </div>
                </Stack>
              </AccordionDetails>
            </Accordion>
          </Container >
        </Grid >
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
              <div className="d-flex flex-row flex-wrap gap-2">
                {selectedContaminants.length > 0 ? selectedContaminants.map(contaminant => <Chip label={contaminant.name} key={contaminant.id} />
                ) : ""}
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <Typography variant="subtitle1">Selección de alimentos</Typography>
              <div className="d-flex flex-row flex-wrap gap-2">
                {selectedFoods.length !== 0 ? selectedFoods.map(food => <Chip label={food.name} key={food.id} />
                ) : ""}
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <Typography variant="subtitle1">Filtros de población</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                {checkedWomen ? <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: "#ebebeb", width: "32px", height: "32px" }}
                >
                  <FemaleIcon />
                </div> : ""}

                {checkedMen ? <div
                  className="rounded-circle d-flex justify-content-center align-items-center"
                  style={{ backgroundColor: "#ebebeb", width: "32px", height: "32px" }}
                >
                  <MaleIcon />
                </div> : ''}


                <Chip label={`${valueSliderAge[0]} años - ${valueSliderAge[1]} años`} />
                <Chip label={`${valueSliderWeight[0]} KG - ${valueSliderWeight[1]} KG`} />
              </Stack>
            </div>
            <div className="w-100 d-flex justify-content-end">
              <Button variant="contained" disabled={disabledButtonDownload} onClick={handleDownloadButton}>Descargar Reporte</Button>
            </div>
          </Container>
        </Grid>
      </Grid >
    </Container >
  );
}

export default withAuthenticationRequired(ReportBuilder, {
  onRedirecting: () => (
    <div className="position-absolute top-50 start-50 translate-middle">
      {" "}
      <CircularProgress />
    </div>
  ),
});
