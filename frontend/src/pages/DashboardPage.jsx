import DashboardCards from '../components/DashboardCards';
import LeadsTable from '../components/LeadsTable';

export default function DashboardPage() {
  return (
    <div className='container mt-4'>
      <h2>Dashboard</h2>
      <DashboardCards />
      <hr />
      <LeadsTable />
    </div>
  );
}
