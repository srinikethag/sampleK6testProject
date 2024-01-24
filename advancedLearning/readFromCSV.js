import { SharedArray } from "k6/data";
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

const userCredentials = new SharedArray('users with credentials', ()=>{
    return papaparse.parse(open('./credentials.csv'), {header: true}).data;
})

export default function() {

    userCredentials.forEach((item) => console.log(item.username));

}