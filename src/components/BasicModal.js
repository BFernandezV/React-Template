import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import THQ from "../img/THQ.png";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button onClick={handleOpen} variant="outlined" size="small" color="primary">
        ¿Cómo se calcula?
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ¿Cómo se calcula?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <img src={THQ} loading="lazy" />
            Fir: Consumo de alimento en g/día. C: Concentración del contaminante Cadmio en el
            alimento en mg/kg de alimento. Rfd: Valor de referencia del contaminante, sujeto a
            distintas fuentes bibliografica. Bwa: Peso de los individuos en Kg.
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
