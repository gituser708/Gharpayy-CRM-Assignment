import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import api from '../api';

export default function AgentForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/agents', { name, email, password });
      alert('Agent created successfully');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      alert('Error creating agent');
      console.error(err);
    }
  };

  return (
    <Card className='mb-3 shadow-sm'>
      <Card.Body>
        <h5 className='mb-3'>Create Agent</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter agent name'
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter agent email'
            />
          </Form.Group>
          <Form.Group className='mb-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter password'
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
