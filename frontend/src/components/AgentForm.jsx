import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import api from '../api';

export default function AgentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/admin/agents', { name, email, password });
    alert('Agent created');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <Card className='mb-3'>
      <Card.Body>
        <h5>Create Agent</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type='submit' variant='primary'>
            Create Agent
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
