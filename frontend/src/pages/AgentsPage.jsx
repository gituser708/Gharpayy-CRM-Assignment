import AgentTable from '../components/AgentTable';
import AgentForm from '../components/AgentForm';

export default function AgentsPage() {
  return (
    <div className='container mt-4'>
      <h2>Manage Agents</h2>
      <AgentForm />
      <AgentTable />
    </div>
  );
}
