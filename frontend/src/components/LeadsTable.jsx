import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import LeadActions from "./LeadActions";
import api from "../api";

export default function LeadsTable() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    api.get("/leads/dashboard").then((res) => {
      setLeads(res.data.leads || []);
    });
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
        {leads.length > 0 ? (
          leads.map((l) => (
            <tr key={l._id}>
              <td>{l.name}</td>
              <td>{l.phone}</td>
              <td>{l.status}</td>
              <td>{l.assignedAgent?.name}</td>
              <td>
                <LeadActions lead={l} />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center">
              No leads available
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}


