import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import api from '../api';
import LeadActions from './LeadActions';

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.get('/leads/dashboard').then((res) => setLeads(res.data));
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Agent</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((l) => (
          <tr key={l._id}>
            <td>{l.name}</td>
            <td>{l.phone}</td>
            <td>{l.status}</td>
            <td>{l.assignedAgent?.name}</td>
            <td>
              <LeadActions lead={l} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
