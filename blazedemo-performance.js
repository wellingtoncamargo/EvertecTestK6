import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    spike_rps: {
      executor: 'constant-arrival-rate',
      rate: 250,
      timeUnit: '1s',
      duration: '1m',            
      preAllocatedVUs: 100,      
      maxVUs: 400,               
    },
  },

  thresholds: {
    http_req_duration: ['p(90)<2000'],
    http_req_failed: ['rate<0.01'],   
  },
};

export default function () {
  let res = http.get('https://www.blazedemo.com');
  check(res, {
    'Home page carregada': (r) => r.status === 200,
  });

  res = http.post('https://www.blazedemo.com/reserve.php', {
    fromPort: 'Boston',
    toPort: 'London',
  });

  check(res, {
    'Página de voos carregada': (r) => r.status === 200,
  });

  res = http.post('https://www.blazedemo.com/purchase.php', {
    flight: '43', 
    price: '472.56',
    airline: 'Virgin America',
    fromPort: 'Boston',
    toPort: 'London',
  });

  check(res, {
    'Página de compra carregada': (r) => r.status === 200,
  });

  res = http.post('https://www.blazedemo.com/confirmation.php', {
    inputName: 'QA Tester',
    address: '123 Street',
    city: 'Test City',
    state: 'Test State',
    zipCode: '12345',
    cardType: 'visa',
    creditCardNumber: '12345678901234',
    creditCardMonth: '11',
    creditCardYear: '2025',
    nameOnCard: 'QA Tester',
  });

  check(res, {
    'Compra finalizada com sucesso': (r) => r.status === 200,
  });

  sleep(1);
}
