const express = require('express');
const { Command } = require('commander');

const program = new Command();

program
    .requiredOption('-h, --host <host>', 'адреса сервера')
    .requiredOption('-p, --port <port>', 'порт сервера')
    .requiredOption('-c, --cache <cache>', 'шлях до директорії для кешу')
    .parse(process.argv);

const options = program.opts();

const app = express();

app.listen(options.port, options.host, () => {
    console.log(`Сервер запущено за адресою http://${options.host}:${options.port}`);
});
