import { writeFileSync } from 'fs';

process.env.NEW_VALUE=10

writeFileSync('.env', `NEW_VALUE=${process.env.NEW_VALUE}`);

export function main(){
  return 10;
}

main();
