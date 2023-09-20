import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";

export default function Create() {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    axios
      .post("http://localhost:3001/add", { task: task })
      .then(result => {
        location.reload()
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <TextField
        label="Task"
        variant="outlined"
        fullWidth
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAdd} ml={2}>
        Add
      </Button>
    </Box>
  );
}
