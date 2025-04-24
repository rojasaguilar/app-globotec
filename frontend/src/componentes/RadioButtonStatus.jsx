import React, {useState} from 'react'
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';

const GreenRadio = styled(Radio)(({ theme }) => ({
  color: green[400],
  '&.Mui-checked': {
    color: green[600],
  },
}));

const RedRadio = styled(Radio)(({ theme }) => ({
  color: red[400],
  '&.Mui-checked': {
    color: red[600],
  },
}));

function RadioButtonStatus({value, onChange}) {
  return (
    <div className="block mb-2">
      <FormControlLabel
        value="1"
        control={
          <GreenRadio
            checked={value === "1"}
            onChange={onChange}
            value="1"
          />
        }
        label="Activo"
        sx={{
          '& .MuiFormControlLabel-label': {
            fontSize: '0.875rem',
            fontWeight: 500, 
            color: '#111827', 
          },
        }}
      />
      <FormControlLabel
        value="0"
        control={
          <RedRadio
            checked={value === "0"}
            onChange={onChange}
            value="0"
          />
        }
        label="Inactivo"
        sx={{
          '& .MuiFormControlLabel-label': {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#111827',
          },
        }}
      />
    </div>
  );
}

export default RadioButtonStatus;
