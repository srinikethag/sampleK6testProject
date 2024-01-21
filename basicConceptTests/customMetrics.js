import { check, sleep } from 'k6';
import http from 'k6/http';
import {Counter, Trend} from 'k6/metrics';

export const options = {
    vus: 1,
    duration: '2s',
    thresholds: {
        http_req_duration: ['p(95)<400'],
        http_req_failed: ['rate<0.01'],
        vus: ['value<9'],
        checks: ['rate>=0.98'],
        my_counter: ['count<=1'],
        response_time_news_page: ['p(95)<400', 'p(99)<450']
    }
}

let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function() {
    let res = http.get("https://test.k6.io");
    myCounter.add(1);
    sleep(2);

    res = http.get("https://test.k6.io/news.php");
    newsPageResponseTrend.add(res.timings.duration);
    sleep(1);



}