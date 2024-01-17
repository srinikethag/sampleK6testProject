import { group,check } from "k6";
import http from "k6/http";


export const options = {
    vus: 1,
    duration: '2s',
    thresholds: {
        http_req_duration: ['p(95)<400'],
        'group_duration{group:::MainPage}': ['p(95)<400'],
        'group_duration{group:::MainPage::StaticAssets}': ['p(95)<400']
    }
}

export default function() {

    group('MainPage', function() {
        let res = http.get('https://test.k6.io');
        check(res, {
            'status is 200' : (r) => r.status === 200
        });

        group('StaticAssets', () => {
            http.get('https://test.k6.io/static/js/prisms.js');
            http.get('https://test.k6.io/static/favicon.ico');
        })

    });

    group('NewsPage', function() {
        let res = http.get('https://test.k6.io/news.php');
        check(res, {
            'status is 200' : (r) => r.status === 200
        });
    })
}