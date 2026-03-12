import { useNavigate } from 'react-router-dom';
import DashboardCards from '../components/DashboardCards';
import LeadsTable from '../components/LeadsTable';

export default function DashboardPage() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className='container mt-4'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <h2>Dashboard</h2>
        <button className='btn btn-danger' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <DashboardCards />
      <hr />
      <LeadsTable />
    </div>
  );
}
