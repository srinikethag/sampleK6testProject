import http from 'k6/http';
import {randomIntBetween, randomString, randomItem} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { sleep, check } from 'k6';

export default function() {
    http.get(`${__ENV.BASE_URL}/public/crocodiles`);
    let res = http.get(`${__ENV.BASE_URL}/public/crocodiles`);
    console.log(randomString(8));
    sleep(randomIntBetween(1,5));
    const crocodileId = randomItem(res.json().map(item=>item.id));
    console.log(crocodileId);
    res = http.get(`${__ENV.BASE_URL}/public/crocodiles/${crocodileId}/`);

    
    check( res, {
        'status is 200': (r) => r.status === 200,
        'Content type is correct': (r) => r.headers['Content-Type'] === 'application/json',
        'Allowed headers are correct': (r) => r.headers.Allow === 'GET, HEAD, OPTIONS'
    });
}