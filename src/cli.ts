#!/usr/bin/env node
import https from 'https';

const API_URL = 'https://forbocai-api.vercel.app';

const args = process.argv.slice(2);
const command = args[0];
const subcommand = args[1];

if (command === 'api' && subcommand === 'status') {
    console.log(`> Checking API Status (${API_URL})...`);

    https.get(API_URL, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            try {
                if (res.statusCode !== 200) {
                    console.error(`> Error: Server returned ${res.statusCode} (Likely Vercel Auth Protected)`);
                    process.exit(1);
                }
                const json = JSON.parse(data);
                console.log(`> Status: \x1b[32m${json.status.toUpperCase()}\x1b[0m`);
                console.log(`> Message: ${json.message}`);
                console.log(`> Version: ${json.version}`);
            } catch (e) {
                console.error("> Error: Invalid JSON response from server.");
                console.log(data.substring(0, 100) + "...");
            }
        });
    }).on('error', (e) => {
        console.error(`> Error: ${e.message}`);
    });
} else {
    console.log("Usage: forbocai api status");
}
