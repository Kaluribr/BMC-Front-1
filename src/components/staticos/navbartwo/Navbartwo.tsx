import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function  Navbartwo() {
  return (
    <Box sx={{ padding: 0, margin: 0}}>
      <AppBar position="static" style={{backgroundColor: '#78a493'}}>
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ padding: 0, margin: 0}}>
            
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Contato</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
