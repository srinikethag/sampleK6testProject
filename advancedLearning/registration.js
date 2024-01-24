import { SharedArray } from 'k6/data';
import http from 'k6/http';
import { check, group } from "k6";

const credentialsFile = './credentials.json';

const userCredentials = new SharedArray('users with credentials', ()=>{
    return JSON.parse(open(credentialsFile)).users;
})

export default function(){

    group('Register user', () => {

        const params = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        userCredentials.forEach((item)=>{
            console.log(item);
            let res = http.post(
                'https://test-api.k6.io/user/register/',
                JSON.stringify(item), 
                params
                );
            check(res, {
                'status code is 201': (r) => r.status === 201,
                })
        });


    });
}