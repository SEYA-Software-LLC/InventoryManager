import { Box, Button, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import {base_url} from "../constants";

function LoginScreen() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    let body = {
      _id: username,
      password: password
    }

    if (username === "" || password === "") return;

    await axios.post(`${base_url}/users/login`, body, {}).then((resp) => {
      if (resp.data.result.companyId.error === "User does not exist") return;

      let companyId = resp.data.result.companyId;
      console.log(companyId);
      navigate('/dash', {state: {companyId: companyId}})
    })
  }

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)}/>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleLogin}>Submit</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginScreen