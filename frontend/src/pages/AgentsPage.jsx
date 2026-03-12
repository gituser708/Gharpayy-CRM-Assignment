import AgentForm from '../components/AgentForm';
import AgentTable from '../components/AgentTable';

export default function AgentsPage() {
  return (
    <div className='container mt-4'>
      <h2 className='mb-4'>Manage Agents</h2>
      <AgentForm />
      <AgentTable />
    </div>
  );
}
