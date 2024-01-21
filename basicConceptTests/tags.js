import { check, sleep } from 'k6';
import http from 'k6/http';

export const options = {
    vus: 1,
    duration: '2s',
    thresholds: {
        http_req_duration: ['p(95)<400'],
        'http_req_duration{status:200}': ['p(95)<400'],
        'http_req_duration{status:201}': ['p(95)<1000']
    }
}

export default function() {
    let res = http.get("https://run.mocky.io/v3/cee457c9-ba33-4585-9d53-c8fccb8f6cb3");

    res = http.get("https://run.mocky.io/v3/64d5d256-4948-44d7-939b-7ced255ddf45?mocky-delay=2000ms");

}