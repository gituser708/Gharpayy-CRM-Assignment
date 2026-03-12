import { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import api from '../api';

export default function DashboardCards() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    visits: 0,
    bookings: 0,
  });

  useEffect(() => {
    api.get('/leads/dashboard').then((res) => setStats(res.data));
  }, []);

  return (
    <Row className='mb-4'>
      <Col>
        <Card className='shadow-sm'>
          <Card.Body className='text-center fw-bold'>
            Total Leads: {stats.totalLeads}
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className='shadow-sm'>
          <Card.Body className='text-center fw-bold'>
            Visits Scheduled: {stats.visits}
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card className='shadow-sm'>
          <Card.Body className='text-center fw-bold'>
            Bookings: {stats.bookings}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
