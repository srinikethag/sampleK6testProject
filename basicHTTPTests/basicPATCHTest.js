import http from "k6/http";
import { check, group } from "k6";

export default function() {
    
    let res="";
    let token="";

    const userData = {            
        username: "test_" + Date.now(),
        password: "secret_"+ Date.now(),
        email: `test_${Date.now()}@gmail.com`,
        first_name: "test",
        last_name: Date.now()
    }

    const crocData = {
        name: "Mosale",
        sex: "M",
        date_of_birth: "1900-10-28"
    }

    console.log(userData);

    let params = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    group('Register user', () => {
        res = http.post(
            'https://test-api.k6.io/user/register/',
            JSON.stringify(userData), 
            params
            );
    })

    group('create crocodiles', () => {
        let params = {
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
        
        token = res.json().access;

        params = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        }

        res = http.post(
            'https://test-api.k6.io/my/crocodiles/',
            JSON.stringify(crocData), 
            params);
        
        check(res, {
            "response is 201": (r) => r.status === 201 
        });

        res = http.get("https://test-api.k6.io/my/crocodiles/", params);

        const id = res.json()[0].id;

        res = http.get(`https://test-api.k6.io/my/crocodiles/${id}`, params);

        check(res, {
            'status code is 200': (r) => r.status === 200,
            'fetched correct croc': (r) => r.json().id === id
        })
    })

    group('update existing crocodile by patch', function() {

        params = {
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        }

        res = http.get("https://test-api.k6.io/my/crocodiles/", params);

        const id = res.json()[0].id;

        res = http.patch(
            `https://test-api.k6.io/my/crocodiles/${id}/`,
            JSON.stringify({
                name: 'dodda mosale'
            }),
            params);
        
        console.log(res.json())
        
        res = http.get(`https://test-api.k6.io/my/crocodiles/${id}/`, params);
        
        console.log(res.json())
        check(res, {
            'status code is 200': (r) => r.status === 200,
            'fetched correct croc': (r) => r.json().id === id,
            'name is correct': (r) => r.json().name === 'dodda mosale'
        })


    })
}