import { Button } from 'react-bootstrap';
import api from '../api';

export default function LeadActions({ lead }) {
  const updateStage = (status) => {
    api
      .post(`/leads/${lead._id}/stage`, { status })
      .then(() => alert(`Stage updated to ${status}`));
  };

  const scheduleVisit = () => {
    const visit = { property: 'Demo Property', date: new Date(), outcome: '' };
    api
      .post(`/leads/${lead._id}/visit`, visit)
      .then(() => alert('Visit scheduled'));
  };

  return (
    <>
      <Button size='sm' variant='info' onClick={() => updateStage('Contacted')}>
        Mark Contacted
      </Button>{' '}
      <Button size='sm' variant='success' onClick={scheduleVisit}>
        Schedule Visit
      </Button>
    </>
  );
}
