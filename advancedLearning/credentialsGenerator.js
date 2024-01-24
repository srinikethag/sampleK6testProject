const fs = require('fs');
const crypto = require('crypto');

// Default number of users
const defaultNumberOfUsers = 5;

// Write the JSON data to the file
const filePath = `./credentials.json`;

// Parse the command-line arguments
const args = process.argv.slice(2);
const numberOfUsers = parseInt(args.find(arg => arg.startsWith('--users='))?.split('=')[1], 10) || defaultNumberOfUsers;

const jsonData = { "users": [] };

// Check if a command-line argument is provided to append new data
const appendNewData = args.includes('--appendNew');

// If appendNewData is true, read the existing data from the file
if (appendNewData) {
    try {
        const existingData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        jsonData.users = existingData.users;
        console.log('Existing data has been loaded for appending new data.');
    } catch (error) {
        console.error('Error reading existing data. Creating new data instead.');
    }
}

// Generate random usernames and passwords for new data
for (let i = 1; i <= numberOfUsers; i++) {
    const randomData = generateRandomString(8);
    const username = `test_${randomData}`;
    const password = `pass_${generateRandomString(8)}`;
    const email = `test_${randomData}@gmail.com`;
    const first_name = "test";
    const last_name = randomData;
    const user = { "username": username, "password": password, "email": email, "first_name": first_name, "last_name": last_name};
    jsonData.users.push(user);
}

// Convert JSON data to a string
const jsonString = JSON.stringify(jsonData, null, 2);

// Overwrite the existing file with the new data
fs.writeFileSync(filePath, jsonString);
console.log(`JSON data has been written to ${filePath}`);

function generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}
