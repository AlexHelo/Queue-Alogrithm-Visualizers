import "./App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import DialogTitle from "@mui/material/DialogTitle";

var values = [];
var valuesDecimal = [];
var testResult;

var L;
var Lq;
var W;
var Wq;
var prob;
var costo;
var Rho;
var isMek = false;
var te;
var Pk;

export default function App() {
  const [inputList, setInputList] = React.useState([
    { Semilla: "", Multiplicador: "", Modulo: "" },
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { Semilla: "", Multiplicador: "", Modulo: "" },
    ]);
  };

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(values[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [alignment, setAlignment] = React.useState("MM1");
  const [lambda, setLambda] = React.useState("");
  const [mu, setMu] = React.useState("");
  const [cw, setCw] = React.useState("");
  const [cs, setCs] = React.useState("");
  const [S, setS] = React.useState("");
  const [K, setK] = React.useState("");
  const [Pn, setPn] = React.useState("");
  const [desviacionE, setDe] = React.useState("");
  const [erlangK, setEk] = React.useState("");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleLambdaChange = (event) => {
    setLambda(parseFloat(event.target.value));
  };

  const handleMuChange = (event) => {
    setMu(parseFloat(event.target.value));
  };

  const handleCwChange = (event) => {
    setCw(parseFloat(event.target.value));
  };

  const handleCsChange = (event) => {
    setCs(parseFloat(event.target.value));
  };

  const handleSChange = (event) => {
    setS(parseFloat(event.target.value));
  };

  const handleKChange = (event) => {
    setK(parseFloat(event.target.value));
  };
  const handlePnChange = (event) => {
    setPn(parseFloat(event.target.value));
  };
  const handleDeChange = (event) => {
    setDe(parseFloat(event.target.value));
  };
  const handleEkChange = (event) => {
    setEk(parseFloat(event.target.value));
  };

  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
      Lq = null;
      L = null;
      Wq = null;
      W = null;
      te = null;
      isMek = false;
      prob = null;
      costo = null;

    };
    if(isMek){
    return (

      <Dialog onClose={handleClose} open={open}>
        <h1>Resultados</h1>
        <h2>Lq = {Lq}</h2>
        <h2>L = {L}</h2>
        <h2>Wq = {Wq} horas</h2>
        <h2>W = {W} horas</h2>
        <h2>Pn = {prob}</h2>
        <h2>Costo = {costo} usd</h2>
        <h2>Tasa Efectiva = {te} clientes por hora</h2>
        <h2>Rho = {Rho}</h2>
        <h2>Pk = {Pk}</h2>

        
      </Dialog>
    );
    }else{
      return (

        <Dialog onClose={handleClose} open={open}>
          <h1>Resultados</h1>
          <h2>Lq = {Lq}</h2>
          <h2>L = {L}</h2>
          <h2>Wq = {Wq} horas</h2>
          <h2>W = {W} horas</h2>
          <h2>Pn = {prob}</h2>
          <h2>Costo = {costo} usd</h2>
          
        </Dialog>
      );

    }
  }

  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };


  //FACTORIAL
  function factorialRecursivo (n) { 
    if (n == 0){ 
      return 1; 
    }
    return n * factorialRecursivo (n-1); 
  }

  //MM1
  function mm1Calculate() {
    Rho = lambda / mu;
    Lq = Math.pow(lambda, 2) / (mu * (mu - lambda));
    L = lambda / (mu - lambda);
    Wq = lambda / (mu * (mu - lambda));
    W = 1 / (mu - lambda);
    prob = (1- Rho) * (Math.pow(Rho, Pn));
    costo = (Lq * cw) + cs;
    
  }
  //mms
  function mmsCalculate() {
    Rho = lambda / (mu * S);
    var lPar = 0;
    var sPar = 0;
    var P0 = 0;
    var lmu = lambda / mu;
    for (let n = 0; n <= S - 1; n++) {
      lPar += Math.pow(lmu , n) / factorialRecursivo(n);
      
    }

    sPar = Math.pow(lmu, S) / factorialRecursivo(S) * (1/(1- Rho));
    P0 = 1/(lPar + sPar);


    Lq = (P0 * (Math.pow(lmu, S) * Rho)) / ((factorialRecursivo(S)) * (Math.pow(1 -Rho, 2)));
    L = Lq + (lmu);
    Wq = Lq/ lambda;
    W = Wq + 1/ mu;

    //Pn
    if(Pn <= S){
      prob = Math.pow(lmu, Pn) / factorialRecursivo(Pn) * P0;
      

    }else{
      prob = Math.pow(lmu, Pn) /(factorialRecursivo(S) * Math.pow(S, Pn-S))* P0;
    }

    costo = (Lq * cw) + (S *cs);

    

  }

  //mmsk
  function mmskCalculate() {
    isMek = true;
    var fPar = 0;
    var lPar = 0;
    var sPar = 0;
    var P0 = 0;
    var PK = 0;
  
    Rho = lambda / (mu * S);
    var lmu = lambda / mu;
    for (let n = S + 1; n <= K; n++) {
      fPar += Math.pow(Rho, n - S);
    }
    for (let p = 0; p <= S; p++) {
      lPar += Math.pow(lmu , p) / factorialRecursivo(p);
      
    }

    sPar = Math.pow(lmu, S) / factorialRecursivo(S);
    
    
    P0 = 1 / (lPar + sPar * fPar);
    

    if(Pn > K){
      prob = 0;

    }else{
      if(Pn <= S){
        prob = Math.pow(lmu, Pn) / factorialRecursivo(Pn) * P0;
        

      }else{
        prob = Math.pow(lmu, Pn) /(factorialRecursivo(S) * Math.pow(S, Pn-S))* P0;
      }
    }
  
    //Lq
    Lq = ((P0 * Math.pow(lmu, S) * Rho) / (factorialRecursivo(S) * Math.pow(1 - Rho, 2))) 
      * (1- Math.pow(Rho, K-S) -(K - S)* (Math.pow(Rho, K-S))*(1 - Rho));

    PK = Math.pow(lmu, K) /(factorialRecursivo(S) * Math.pow(S, K-S));
    Pk = PK;
    console.log(PK);
    var tasaEfectiva = lambda * (1- PK);
    te = tasaEfectiva;
    //Wq
    Wq = Lq / tasaEfectiva;
    //W
    W = Wq + 1 / mu;
    //L
    L = tasaEfectiva * W;

    costo = (Lq * cw) + (S *cs);
  }


  //MG1
  function mg1Calculate() {
    var P0 = 0;
    Rho = lambda / mu;
    
    P0 = 1 - Rho;
    //console.log(desviacionE);
    Lq = (((Math.pow(lambda, 2)) * (Math.pow(desviacionE, 2))) + (Math.pow(Rho, 2))) / (2 * (1 - Rho));
    L = Rho + Lq;
    Wq = (Math.pow(lambda, 2) * Math.pow(desviacionE, 2) + Math.pow(Rho, 2)) / (2 * lambda* (1- Rho));
    W = Wq + (1/ mu);

    prob = Math.pow(Rho, Pn) * P0;

    costo = (Lq * cw) + (cs);
         
  }
  //MEK1
  function mek1Calculate() {
    var P0 = 0;
    Rho = lambda / mu;
    P0 = 1 - Rho;
    Lq = ((1 + erlangK) / (2 * erlangK)) * ((Math.pow(lambda, 2)) / ((mu) * (mu - lambda)));
    Wq = ((1 + erlangK) / (2 * erlangK)) * ((lambda)/ ((mu) *(mu - lambda)));
    W = Wq + (1/ mu);
    L = lambda * W;
    prob = Math.pow(Rho, Pn) * P0;
    costo = (Lq * cw) + (cs);
  
  

  }
  //MD1
  function md1Calculate() {
    var P0 = 0;
    Rho = lambda / mu;
    P0 = 1 - Rho;
    Lq = (Math.pow(Rho, 2)) / ((2 * (1 - Rho)));
    L =  Rho + Lq;
    Wq = (Math.pow(Rho, 2)) / ((2 * lambda * (1 - Rho)));
    W = Wq + (1/ mu);
    console.log(P0);
    prob = Math.pow(Rho, Pn) * P0;
    costo = (Lq * cw) + (cs);

  }


  

  switch (alignment) {
    case "MM1":
      return (
        <div className="App">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="MM1">M/M/1</ToggleButton>
            <ToggleButton value="MMS">M/M/s</ToggleButton>
            <ToggleButton value="MMSK">M/M/s/K</ToggleButton>
            <ToggleButton value="MG1">M/G/1</ToggleButton>
            <ToggleButton value="MEk1">M/Ek/1</ToggleButton>
            <ToggleButton value="MD1">M/D/1</ToggleButton>
          </ToggleButtonGroup>

          <h1>Metodo M/M/1</h1>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Lambda"
              onChange={handleLambdaChange}
              variant="outlined"
          
            />
            <TextField
              id="outlined-basic"
              label="Mu"
              onChange={handleMuChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Pn"
              onChange={handlePnChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cw"
              onChange={handleCwChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cs"
              onChange={handleCsChange}
              variant="outlined"
            />
          </Box>

          <Button
            onClick={() => {
              mm1Calculate();
              handleClickOpen();
            }}
            variant="contained"
          >
            Generar
          </Button>

          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </div>
      );

    case "MMS":
      return (
        <div className="App">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="MM1">M/M/1</ToggleButton>
            <ToggleButton value="MMS">M/M/s</ToggleButton>
            <ToggleButton value="MMSK">M/M/s/K</ToggleButton>
            <ToggleButton value="MG1">M/G/1</ToggleButton>
            <ToggleButton value="MEk1">M/Ek/1</ToggleButton>
            <ToggleButton value="MD1">M/D/1</ToggleButton>
          </ToggleButtonGroup>

          <h1>Metodo M/M/s</h1>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Lambda"
              onChange={handleLambdaChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Mu"
              onChange={handleMuChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="s"
              onChange={handleSChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Pn"
              onChange={handlePnChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cw"
              onChange={handleCwChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cs"
              onChange={handleCsChange}
              variant="outlined"
            />
          </Box>

          <Button
            onClick={() => {
              mmsCalculate();
              handleClickOpen();
            }}
            variant="contained"
          >
            Generar
          </Button>

          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </div>
      );

    case "MMSK":
      return (
        <div className="App">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="MM1">M/M/1</ToggleButton>
            <ToggleButton value="MMS">M/M/s</ToggleButton>
            <ToggleButton value="MMSK">M/M/s/K</ToggleButton>
            <ToggleButton value="MG1">M/G/1</ToggleButton>
            <ToggleButton value="MEk1">M/Ek/1</ToggleButton>
            <ToggleButton value="MD1">M/D/1</ToggleButton>
          </ToggleButtonGroup>

          <h1>Metodo M/M/s/K</h1>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Lambda"
              onChange={handleLambdaChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Mu"
              onChange={handleMuChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="s"
              onChange={handleSChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="K"
              onChange={handleKChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Pn"
              onChange={handlePnChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cw"
              onChange={handleCwChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cs"
              onChange={handleCsChange}
              variant="outlined"
            />
          </Box>

          <Button
            onClick={() => {
              mmskCalculate();
              handleClickOpen();
            }}
            variant="contained"
          >
            Generar
          </Button>

          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </div>
      );

    case "MG1":
      return (
        <div className="App">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="MM1">M/M/1</ToggleButton>
            <ToggleButton value="MMS">M/M/s</ToggleButton>
            <ToggleButton value="MMSK">M/M/s/K</ToggleButton>
            <ToggleButton value="MG1">M/G/1</ToggleButton>
            <ToggleButton value="MEk1">M/Ek/1</ToggleButton>
            <ToggleButton value="MD1">M/D/1</ToggleButton>
          </ToggleButtonGroup>

          <h1>Generador M/G/1</h1>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Lambda"
              onChange={handleLambdaChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Mu"
              onChange={handleMuChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Desviacion Estandar"
              onChange={handleDeChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Pn"
              onChange={handlePnChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cw"
              onChange={handleCwChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cs"
              onChange={handleCsChange}
              variant="outlined"
            />
          </Box>

          <Button
            onClick={() => {
              mg1Calculate();
              handleClickOpen();
            }}
            variant="contained"
          >
            Generar
          </Button>

          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </div>
      );
      case "MEk1":
      return (
        <div className="App">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="MM1">M/M/1</ToggleButton>
            <ToggleButton value="MMS">M/M/s</ToggleButton>
            <ToggleButton value="MMSK">M/M/s/K</ToggleButton>
            <ToggleButton value="MG1">M/G/1</ToggleButton>
            <ToggleButton value="MEk1">M/Ek/1</ToggleButton>
            <ToggleButton value="MD1">M/D/1</ToggleButton>
          </ToggleButtonGroup>

          <h1>Generador M/Ek/1</h1>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Lambda"
              onChange={handleLambdaChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Mu"
              onChange={handleMuChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Erlang K"
              onChange={handleEkChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Pn"
              onChange={handlePnChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cw"
              onChange={handleCwChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cs"
              onChange={handleCsChange}
              variant="outlined"
            />
          </Box>

          <Button
            onClick={() => {
              mek1Calculate();
              handleClickOpen();
            }}
            variant="contained"
          >
            Generar
          </Button>

          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </div>
      );
      case "MD1":
      return (
        <div className="App">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="MM1">M/M/1</ToggleButton>
            <ToggleButton value="MMS">M/M/s</ToggleButton>
            <ToggleButton value="MMSK">M/M/s/K</ToggleButton>
            <ToggleButton value="MG1">M/G/1</ToggleButton>
            <ToggleButton value="MEk1">M/Ek/1</ToggleButton>
            <ToggleButton value="MD1">M/D/1</ToggleButton>
          </ToggleButtonGroup>

          <h1>Generador M/D/1</h1>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              label="Lambda"
              onChange={handleLambdaChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Mu"
              onChange={handleMuChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Pn"
              onChange={handlePnChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cw"
              onChange={handleCwChange}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Cs"
              onChange={handleCsChange}
              variant="outlined"
            />
          </Box>

          <Button
            onClick={() => {
              md1Calculate();
              handleClickOpen();
            }}
            variant="contained"
          >
            Generar
          </Button>

          <SimpleDialog
            selectedValue={selectedValue}
            open={open}
            onClose={handleClose}
          />
        </div>
      );
  }
}
