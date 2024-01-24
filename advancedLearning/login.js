import { SharedArray } from 'k6/data';
import http from 'k6/http';
import { check, group } from "k6";
import {randomItem} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const credentialsFile = './credentials.json';

const userCredentials = new SharedArray('users with credentials', ()=>{
    return JSON.parse(open(credentialsFile)).users;
})

export const options = {
    vus: 1,
    duration: '30s',
    ext: {
        loadimpact: {
            projectID: 3656005
        }
    }
}

export default function(){

    group('login using token', () => {
        const params = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let res = http.post(
            'https://test-api.k6.io/auth/token/login/',
            JSON.stringify(randomItem(userCredentials)), 
            params);

        const token = res.json().access;
        console.log(token);

    })
}