const { createClient } = require('redis');

const client = createClient();

async function main () {
    client.on('error', err => console.log('Redis Client Error', err));
    await client.connect();
}

main()

module.exports = client