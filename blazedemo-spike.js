import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    spike_test: {
      executor: 'ramping-arrival-rate',

      startRate: 0,

      stages: [
        { target: 250, duration: '5s' },  
        { target: 250, duration: '15s' },
        { target: 5, duration: '5s' },
        { target: 0, duration: '5s' },
      ],

      timeUnit: '1s',
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
    'Home carregada': (r) => r.status === 200,
  });

  res = http.post('https://www.blazedemo.com/reserve.php', {
    fromPort: 'Boston',
    toPort: 'London',
  });

  check(res, {
    'Voos carregados': (r) => r.status === 200,
  });

  res = http.post('https://www.blazedemo.com/purchase.php', {
    flight: '43',
    price: '472.56',
    airline: 'Virgin America',
    fromPort: 'Boston',
    toPort: 'London',
  });

  check(res, {
    'Compra carregada': (r) => r.status === 200,
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
    'Compra ok': (r) => r.status === 200,
  });

  sleep(1);
}
