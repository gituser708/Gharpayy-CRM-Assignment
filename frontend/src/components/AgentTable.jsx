import { useEffect, useState } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import api from '../api';

export default function AgentTable() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    api.get('/admin/agents').then((res) => setAgents(res.data));
  }, []);

  const deleteAgent = async (id) => {
    await api.delete(`/admin/agents/${id}`);
    setAgents(agents.filter((a) => a._id !== id));
  };

  return (
    <Card>
      <Card.Body>
        <h5>Agents</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent) => (
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
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
