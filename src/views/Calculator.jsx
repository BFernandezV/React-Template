import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import axios from "axios";
import warningImg from "../img/warning.png";
import greatImg from "../img/great.png";
import CircularProgress from "@mui/material/CircularProgress";
import backArrow from "../img/back.png";
import { Link } from "react-router-dom";
import "./../css/calculator.css";

// eslint-disable-next-line react/prop-types
const Result = ({ textResult, subtitleResult, imgSource }) => {
  return (
    <Container maxWidth="false" className="p-0 d-flex flex-column align-items-center gap-1">
      <Typography className="fw-bold" variant="h3" gutterBottom color="white.main">
        {textResult}
      </Typography>
      <img src={imgSource} />
      <Typography
        className="fw-light text-center"
        variant="subtitle1"
        gutterBottom
        color="white.main"
        width="60%"
      >
        {subtitleResult}
      </Typography>
    </Container>
  );
};

const calculator = () => {
  const [complete, setComplete] = useState(false);
  const [foods, setFoods] = useState([
    { id: 1, label: "Pan1" },
    { id: 2, label: "Pan2" },
    { id: 3, label: "Pan3" },
    { id: 4, label: "Pan4" },
    { id: 5, label: "Pan5" },
    { id: 6, label: "Pan6" },
    { id: 7, label: "Pan7" },
  ]);
  let firstTime = false;
  const [componentResult, setComponentResult] = useState(false);
  const [valueResult, setValueResult] = useState("");
  const [weight, setWeight] = useState(null);
  const [amount, setAmount] = useState(null);
  const [food, setFood] = useState("")
  const [validateWeight, setValidateWeight] = useState(false)
  const [validateAmount, setValidateAmount] = useState(false)
  const [validateFood, setValidateFood] = useState(false)

  function getDataFoods() {
    return axios.get('http://fabrica.inf.udec.cl:5001/alimentos')
      .then((response) => setFoods(response.data))
  }


  useEffect(() => {
    if (!firstTime) {
      getDataFoods()
      firstTime = true
    }
    if (!complete) {
      setComponentResult(
        <Typography className="fw-bold" variant="subtitle2" gutterBottom color="secondary.dark">
          Completa los campos requeridos
        </Typography>
      );
    } else {
      valueResult === "Contaminado"
        ? setComponentResult(
          <Result
            textResult="¡CUIDADO!"
            subtitleResult="La concentración de contaminante encontrada en tu alimento es peligrosa"
            imgSource={warningImg}
          ></Result>
        )
        : setComponentResult(
          <Result
            textResult="¡GENIAL!"
            subtitleResult="La concentración de contaminante encontrada en tu alimento no es peligrosa"
            imgSource={greatImg}
          ></Result>
        );
    }
  }, [complete]);

  const validateFields = function () {
    if (weight === null) setValidateWeight(true);
    if (food === "") setValidateFood(true);
    if (amount === null) setValidateAmount(true);
    return weight === null || food === "" || amount === null;
  };

  const calculateContamination = function () {
    if (validateFields()) return;
    console.log("CALCULANDO...");

    setComponentResult(<CircularProgress />);
    setComplete(false);
    axios
      .post("http://fabrica.inf.udec.cl:5001/calculadora", { weight: weight, amount: amount, food: food })
      .then(function (response) {
        // handle success
        console.log(response.data);
        setComplete(true);
        response.data === "Dañino para la salud"
          ? setValueResult("Contaminado")
          : setValueResult("No Contaminado");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  return (
    <Container maxWidth="false" className="vh-100 overflow-hidden p-0">
      <Container maxWidth="xl" className="my-5 m-0 px-5">
        <Link to="/">
          <img
            href="/"
            src={backArrow}
            className="img-fluid img-arrow"
            style={{ width: "40px", height: "40px" }}
          ></img>
        </Link>
      </Container>
      <Grid container spacing={2} className="vh-100 d-flex">
        <Grid xs={6}>
          <Container maxWidth="xs" style={{ marginStart: "100px" }}>
            <Typography variant="h4" align="center" gutterBottom className="fw-semibold">
              Calculadora
            </Typography>
            <Stack spacing={2}>
              <Container className="d-flex flex-column gap-3">
                <Container className="d-flex align-items-center gap-2 p-0">
                  <div
                    className="p-2 rounded-circle"
                    style={{ width: 35, height: 35, backgroundColor: "#FF724A" }}
                  >
                    <Typography
                      className="text-white"
                      align="center"
                      variant="subtitle2"
                      gutterBottom
                    >
                      1
                    </Typography>
                  </div>

                  <Typography className="fw-bold" variant="subtitle2" gutterBottom>
                    Peso
                  </Typography>
                </Container>
                <TextField
                  id="outlined-start-adornment"
                  fullWidth
                  type="number"
                  variant="filled"
                  error={validateWeight}
                  hiddenLabel
                  onChange={evento => {
                    setWeight(evento.target.value !== "" ? parseFloat(evento.target.value) : null);
                    setValidateWeight(false);
                  }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                  }}
                  helperText=""
                />
              </Container>
              <Container className="d-flex flex-column gap-3">
                <Container className="d-flex align-items-center gap-2 p-0">
                  <div
                    className="p-2 rounded-circle"
                    style={{ width: 35, height: 35, backgroundColor: "#FF724A" }}
                  >
                    <Typography
                      className="text-white"
                      align="center"
                      variant="subtitle2"
                      gutterBottom
                    >
                      2
                    </Typography>
                  </div>

                  <Typography className="fw-bold" variant="subtitle2" gutterBottom>
                    Alimento
                  </Typography>
                </Container>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={foods}
                  fullWidth
                  onChange={evento => {
                    setFood(evento.target.textContent);
                    setValidateFood(false);
                  }}
                  renderInput={params => (
                    <TextField
                      fullWidth
                      {...params}
                      label="Alimentos"
                      variant="filled"
                      error={validateFood}
                      helperText=""
                    />
                  )}
                />
              </Container>
              <Container className="d-flex flex-column gap-3">
                <Container className="d-flex align-items-center gap-2 p-0">
                  <div
                    className="p-2 rounded-circle"
                    style={{ width: 35, height: 35, backgroundColor: "#FF724A" }}
                  >
                    <Typography
                      className="text-white"
                      align="center"
                      variant="subtitle2"
                      gutterBottom
                    >
                      3
                    </Typography>
                  </div>

                  <Typography className="fw-bold" variant="subtitle2" gutterBottom>
                    Cantidad consumida
                  </Typography>
                </Container>
                <TextField
                  id="outlined-start-adornment"
                  fullWidth
                  type="number"
                  variant="filled"
                  hiddenLabel
                  error={validateAmount}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">g/día</InputAdornment>,
                  }}
                  onChange={evento => {
                    setAmount(evento.target.value !== "" ? parseFloat(evento.target.value) : null);
                    setValidateAmount(false);
                  }}
                />
              </Container>
              <Button
                variant="outlined"
                className="w-25 mx-auto"
                color="primary"
                onClick={() => calculateContamination()}
              >
                Calcular
              </Button>
            </Stack>
          </Container>
        </Grid>
        <Grid xs={6}>
          <Container
            className="p-0 d-flex justify-content-center align-items-center"
            style={{
              height: "70vh",
              borderRadius: "250px 0px 0px 250px",
              backgroundColor: `${valueResult === ""
                  ? "#d9d9d9"
                  : valueResult === "Contaminado"
                    ? "#FF7C7C"
                    : "#82E0AA"
                }`,
            }}
          >
            {componentResult}
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default calculator;
