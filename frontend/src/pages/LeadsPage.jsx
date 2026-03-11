import { Container } from 'react-bootstrap';
import LeadsTable from '../components/LeadsTable';

export default function LeadsPage() {
  return (
    <Container className='mt-4'>
      <h2>All Leads</h2>
      <LeadsTable />
    </Container>
  );
}
