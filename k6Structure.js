import http from "k6/http";
import { sleep } from "k6";

export const options = {
    vus: 1,
    duration: '2s'
};

console.log('-- Init stage --');

export function setup() {
    console.log('-- Setup stage --');
    const data = {foo: 'bar'};
    sleep(3);
    return data;
}

export default function(data) {
    console.log('-- VU stage --');
    console.log(data);
    sleep(1);
}

export function teardown(data) {
    console.log('-- Teardown stage --');
    console.log(data);
    sleep(3);
}