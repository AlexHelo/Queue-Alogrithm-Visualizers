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
const [open2, setOpen2] = React.useState(false);
const [selectedValue, setSelectedValue] = React.useState(values[1]);


const handleClickOpen = () => {
  setOpen(true);
};

const handleClickOpen2 = () => {
  setOpen2(true);
};

const handleClose = (value) => {
  setOpen(false);
  setSelectedValue(value);
};

const handleClose2 = (value) => {
  setOpen2(false);
  setSelectedValue(value);
};

  

  const [alignment, setAlignment] = React.useState('MM1');
  const [seed, setSeed] = React.useState('');
  const [size, setSize] = React.useState('');
  const [inc, setInc] = React.useState('');
  const [mult, setMult] = React.useState('');
  const [mod, setMod] = React.useState('');
 
  

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSeedChange = (event) => {
    setSeed(parseInt(event.target.value));
  };

  const handleSizeChange = (event) => {
    setSize(parseInt(event.target.value));
  };
  const handleIncChange = (event) => {
    setInc(parseInt(event.target.value));
  };

  const handleMultChange = (event) => {
    setMult(parseInt(event.target.value));
  };
  const handleModChange = (event) => {
    setMod(parseInt(event.target.value));
  };




  function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
      values = []
      valuesDecimal = []
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <table>
        <tr>
      <th>Numero Aleatorio</th>
      <th>Ri</th>
    </tr>
          {values.map((name, i) => <tr><td>{name}</td><td>{valuesDecimal[i]}</td></tr>)}
        {/* {values.map(name => <h1>{name}</h1>)}
        {valuesDecimal.map(name => <h1>{name}</h1>)} */}
        </table>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
  
  
  function SimpleDialogPlus(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
      values = []
      valuesDecimal = []
    };
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <table>
        <tr>
      <th>Numero Aleatorio</th>
      <th>Ri</th>
    </tr>
          {values.map((name, i) => <tr><td>{name}</td><td>{valuesDecimal[i]}</td></tr>)}
        {/* {values.map(name => <h1>{name}</h1>)}
        {valuesDecimal.map(name => <h1>{name}</h1>)} */}
        </table>
  
        <Stack spacing={2} direction="row">
        <Button variant="contained">Chi-Cuadrada</Button>
        <Button  onClick={() => {
    handleClickOpen2();
  }} variant="contained">Kolmogorov-Smirnov</Button>
      </Stack>

      <SimpleDialogSmirnov
        selectedValue={selectedValue}
        open={open2}
        onClose={handleClose2}
      />
      
      </Dialog>
    );
  }
  
  SimpleDialogPlus.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
  
  function SimpleDialogSmirnov(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose2 = () => {
      onClose(selectedValue);
    };
  
    return (
      <Dialog onClose={handleClose2} open={open2}>
        <DialogTitle>Prueba Kolmogorov-Smirnov</DialogTitle>
        <h1>{testResult}</h1>
      </Dialog>
    );
  }
  
  SimpleDialogSmirnov.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
    

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
 
    
    <TextField id="outlined-basic" label="Lambda"  onChange={handleSeedChange} variant="outlined" />
    <TextField id="outlined-basic" label="Mu" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cw" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cs" onChange={handleSizeChange} variant="outlined" />
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
      break;
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
    
    <TextField id="outlined-basic" label="Lambda"  onChange={handleSeedChange} variant="outlined" />
    <TextField id="outlined-basic" label="Mu" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="s" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cw" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cs" onChange={handleSizeChange} variant="outlined" />
    
    </Box>

    
    <Button  onClick={() => {
    handleClickOpen();
  }} variant="contained">Generar</Button>

<SimpleDialogPlus
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />


    
     
     
  </div>);
      break;
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
    
    <TextField id="outlined-basic" label="Lambda"  onChange={handleSeedChange} variant="outlined" />
    <TextField id="outlined-basic" label="Mu" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="s" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="K" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cs" onChange={handleSizeChange} variant="outlined" />
    </Box>


    <Button  onClick={() => {
    handleClickOpen();
  }} variant="contained">Generar</Button>

<SimpleDialogPlus
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
     
     
  </div>);
      break;
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
    
    <TextField id="outlined-basic" label="Lambda"  onChange={handleSeedChange} variant="outlined" />
    <TextField id="outlined-basic" label="Mu" onChange={handleSizeChange} variant="outlined" />
    <TextField id="outlined-basic" label="Cs" onChange={handleSizeChange} variant="outlined" />
    </Box>


    <Button  onClick={() => {
    handleClickOpen();
  }} variant="contained">Generar</Button>

<SimpleDialogPlus
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
     
  </div>);
      break;

  }

}


