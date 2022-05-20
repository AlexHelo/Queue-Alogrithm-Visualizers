import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';






var values = []
var valuesDecimal = []
var testResult

var L
var Lq
var W 
var Wq








export default function App() {


const [inputList, setInputList] = React.useState([{ Semilla: "", Multiplicador: "" , Modulo: "" }]);

const handleInputChange = (e, index) => {
  const { name, value } = e.target;
  const list = [...inputList];
  list[index][name] = value;
  setInputList(list);
};
 
// handle click event of the Remove button
const handleRemoveClick = index => {
  const list = [...inputList];
  list.splice(index, 1);
  setInputList(list);
};
 
// handle click event of the Add button
const handleAddClick = () => {
  setInputList([...inputList, { Semilla: "", Multiplicador: "" , Modulo: ""}]);
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


  const [alignment, setAlignment] = React.useState('MM1');
  const [lambda, setLambda] = React.useState('');
  const [mu, setMu] = React.useState('');
  const [cw, setCw] = React.useState('');
  const [cs, setCs] = React.useState('');
  const [S, setS] = React.useState('');
  const [K, setK] = React.useState('');
 
  

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleLambdaChange = (event) => {
    setLambda(parseInt(event.target.value));
  };

  const handleMuChange = (event) => {
    setMu(parseInt(event.target.value));
  };

  const handleCwChange = (event) => {
    setCw(parseInt(event.target.value));
  };

  const handleCsChange = (event) => {
    setCs(parseInt(event.target.value));
  };

  const handleSChange = (event) => {
    setS(parseInt(event.target.value));
  };

  const handleKChange = (event) => {
    setK(parseInt(event.target.value));
  };




  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
      Lq = null
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
       <h1>Resultados</h1>
       <h2>Lq = {Lq}</h2>
       <h2>L = {L}</h2>
       <h2>Wq = {Wq}</h2>
       <h2>W = {W}</h2>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };


  function mm1Calculate(){

    Lq =  Math.pow(lambda,2)/(mu*(mu-lambda))
    L = lambda/(mu-lambda)
    Wq = lambda/(mu*(mu-lambda))
    W = 1/(mu-lambda)
    


  }
  


  switch (alignment) {
    case 'MM1':
    return(<div className="App">

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
  </ToggleButtonGroup>

  <h1>Metodo M/M/1</h1>

    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
 
    
    <TextField id="outlined-basic" label="Lambda"  onChange={handleLambdaChange} variant="outlined" />
    <TextField id="outlined-basic" label="Mu" onChange={handleMuChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cw" onChange={handleCwChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cs" onChange={handleCsChange} variant="outlined" />
    </Box>

    <Button  onClick={() => {
      mm1Calculate();
    handleClickOpen();
  }} variant="contained">Generar</Button>

   <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
  </div>);


      
    case 'MMS':
    return(<div className="App">

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
  </ToggleButtonGroup>

  <h1>Metodo M/M/s</h1>

    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    
    <TextField id="outlined-basic" label="Lambda"  onChange={handleLambdaChange} variant="outlined" />
    <TextField id="outlined-basic" label="Mu" onChange={handleMuChange} variant="outlined" />
    <TextField id="outlined-basic" label="s" onChange={handleSChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cw" onChange={handleCwChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cs" onChange={handleCsChange} variant="outlined" />
    
    </Box>

    
    <Button  onClick={() => {
    handleClickOpen();
  }} variant="contained">Generar</Button>

<SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />


    
     
     
  </div>);


    case 'MMSK':
    return(<div className="App">

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
  </ToggleButtonGroup>

  <h1>Metodo M/M/s/K</h1>

    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    
    <TextField id="outlined-basic" label="Lambda"  onChange={handleLambdaChange} variant="outlined" />
    <TextField id="outlined-basic" label="Mu" onChange={handleMuChange} variant="outlined" />
    <TextField id="outlined-basic" label="s" onChange={handleSChange} variant="outlined" />
    <TextField id="outlined-basic" label="K" onChange={handleKChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cs" onChange={handleCsChange} variant="outlined" />
    </Box>


    <Button  onClick={() => {
    handleClickOpen();
  }} variant="contained">Generar</Button>

<SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
     
     
  </div>);


    case 'MG1':
    return(<div className="App">

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
  </ToggleButtonGroup>

  <h1>Generador M/G/1</h1>

    <Box
    component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    
    <TextField id="outlined-basic" label="Lambda"  onChange={handleLambdaChange} variant="outlined" />
    <TextField id="outlined-basic" label="Mu" onChange={handleMuChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cs" onChange={handleCsChange} variant="outlined" />
    </Box>


    <Button  onClick={() => {
    handleClickOpen();
  }} variant="contained">Generar</Button>

 <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
     
  </div>);
      

  }

}


