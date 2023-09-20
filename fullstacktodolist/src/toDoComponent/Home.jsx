import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from 'axios';
import { Container, Typography, Box, Button, Paper, Checkbox } from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function Home() {
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3001/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
  }, []);

  const handleEdit = (id) => {
    axios.put('http://localhost:3001/update/' + id)
      .then(result =>
        location.reload()
      )
      .catch(err => console.log(err))
  }


  const handleDelete = (id) => {

    axios.delete('http://localhost:3001/delete/' + id)
    .then(result =>
      location.reload()
    )
    .catch(err => console.log(err))
  }





  return (
    <Container maxWidth="sm">
      <Typography variant="h2" gutterBottom>
        Todo List
      </Typography>
      <Create />
      {todos.length === 0 ?
        (
          <Box mt={2}>
            <Typography variant="h4">😀 😃 😄 😁 😆 😅 🤓 😎  😂 🤣 🥲 🥹 </Typography>
          </Box>
        ) :
        todos.map(todo => (
          <Paper elevation={3} key={todo._id} style={{ margin: '16px 0' }}>
            <Box display="flex" alignItems="center" padding={2}>
              <Checkbox
                checked={todo.done}
                onClick={() => handleEdit(todo._id)}
                icon={<span role="img" aria-label="sad">😔</span>}
                checkedIcon={<span role="img" aria-label="happy">😁</span>}
              />
              <Typography className={todo.done ? 'line-through' : ''}>
                {todo.task}
              </Typography>
              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                size="small"
                style={{ marginLeft: 'auto' }}
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </Button>
            </Box>
          </Paper>
        ))
      }
    </Container>
  );
}
