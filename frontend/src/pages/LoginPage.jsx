import { useState } from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import api from '../api';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <Container className='mt-5' style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Body>
          <h3 className='mb-3 text-center'>Login</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type='submit' variant='primary' className='w-100'>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
