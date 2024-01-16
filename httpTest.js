import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '2s',
    thresholds: {
        http_req_duration: ['p(95)<400'],
        http_req_failed: ['rate<0.01'],
        vus: ['value<9'],
        checks: ['rate>=0.98']
    }
}

export default function() {
    const res = http.get("https://test.k6.io");

    // check the response code
    // check the correct page is loaded
    check(res, {
        'status is 200': (r) => r.status === 200,
        'homepage is loaded': (r) => r.body.includes('Collection of simple web-pages suitable for load testing.')
    })

}