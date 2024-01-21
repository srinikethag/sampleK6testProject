import http from "k6/http";
import { check, group } from "k6";

export default function() {
    
    let res="";

    const userData = {            
        username: "test_" + Date.now(),
        password: "secret_"+ Date.now(),
        email: `test_${Date.now()}@gmail.com`,
        first_name: "test",
        last_name: Date.now(),
    }

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const password = "test123";
    group('Register user', () => {
        res = http.post(
            'https://test-api.k6.io/user/register/',
            JSON.stringify(userData), 
            params
            );
    })

    group('login using token', () => {
        const params = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        res = http.post(
            'https://test-api.k6.io/auth/token/login/',
            JSON.stringify({
                username: userData.username,
                password: userData.password
            }), 
            params);

        const token = res.json().access;
        console.log(token);

    })
}