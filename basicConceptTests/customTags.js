import { check, sleep } from 'k6';
import http from 'k6/http';
import {Counter} from 'k6/metrics';

export const options = {
    vus: 1,
    duration: '2s',
    thresholds: {
        http_req_duration: ['p(95)<400'],
        'http_req_duration{page:order}': ['p(95)<400'],
        'http_req_duration{page:checkout}': ['p(95)<1000'],
        'http_errors': ['count==0'],
        'http_errors{page:order}': ['count==0'],
        'http_errors{page:checkout}': ['count==0'],
        'checks{page:order}': ['rate>=0.99'],
        'checks{page:checkout}': ['rate>=0.99']
    }
}

let httpErrors = new Counter('http_errors');

export default function() {
    let res = http.get("https://run.mocky.io/v3/cee457c9-ba33-4585-9d53-c8fccb8f6cb3",
    {
        tags: {
            page: 'order'
        }
    });
    if (res.error){
        httpErrors.add(1, {page: 'order'});
    }

    check(res, {
        'status is 200' : (r) => r.status===200},
        {page: 'order'}
        );


    res = http.get("https://run.mocky.io/v3/64d5d256-4948-44d7-939b-7ced255ddf45?mocky-delay=2000ms",
    {
        tags: {
            page: 'checkout'
        }
    }
    );
    if (res.error){
        httpErrors.add(1, {page: 'checkout'});
    }

    check(res, {
        'status is 201' : (r) => r.status===201},
        {page: 'checkout'}
        );

}