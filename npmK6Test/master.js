import { execSync } from "child_process";

export function main(){
    console.log(process.env.SECRET_VALUE);
    runk6Tests();
}

function runk6Tests() {
    try {
        execSync('k6 run ./npmK6Test/smokeTest.js');
    } catch (e) {
        console.log('error ', e);
    }
}

main()