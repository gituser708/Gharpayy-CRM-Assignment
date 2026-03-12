import { useEffect, useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import api from '../api';

export default function AgentTable() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    api.get('/admin/agents').then((res) => setAgents(res.data));
  }, []);

  const deleteAgent = async (id) => {
    try {
      await api.delete(`/admin/agents/${id}`);
      setAgents(agents.filter((a) => a._id !== id));
      alert('Agent deleted');
    } catch (err) {
      alert('Error deleting agent');
      console.error(err);
    }
  };

  return (
    <Card className='shadow-sm'>
      <Card.Body>
        <h5 className='mb-3'>Agents</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.length > 0 ? (
              agents.map((agent) => (
                <tr key={agent._id}>
                  <td>{agent.name}</td>
                  <td>{agent.email}</td>
                  <td>
                    <Button
                      size='sm'
                      variant='danger'
                      onClick={() => deleteAgent(agent._id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='3' className='text-center'>
                  No agents available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
