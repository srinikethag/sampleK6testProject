import http from "k6/http";
import { check } from "k6";

export default function() {

    let res = http.get("https://test-api.k6.io/public/crocodiles");

    const crocodileId = res.json()[0].id;
    const crocodileName = res.json()[0].name;
    console.log(crocodileId)
    res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

    console.log(res.json().name);
    
    check( res, {
        'status is 200': (r) => r.status === 200,
        'Crocodile name is correct': (r) => r.json().name === crocodileName,
        'Content type is correct': (r) => r.headers['Content-Type'] === 'application/json',
        'Allowed headers are correct': (r) => r.headers.Allow === 'GET, HEAD, OPTIONS'
    });
}