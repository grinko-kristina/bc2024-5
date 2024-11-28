const express = require('express');
const { Command } = require('commander');
const path = require('path');
const fs = require('fs');

const program = new Command();

program
    .requiredOption('-h, --host <host>', 'адреса сервера')
    .requiredOption('-p, --port <port>', 'порт сервера')
    .requiredOption('-c, --cache <cache>', 'шлях до директорії для кешу')
    .parse(process.argv);


const options = program.opts();

const app = express();

app.use(express.text());

app.get('/notes/:noteName', (req, res) => {
    const noteName = req.params.noteName;
    const notePath = path.join(options.cache, `${noteName}.txt`);

    if (!fs.existsSync(notePath)) {
        return res.status(404).send('Нотатка не знайдена');
    }

    fs.readFile(notePath, 'utf8', (err, data) => {
        res.send(data);
    });
});
app.put('/notes/:noteName', (req, res) => {
    const noteName = req.params.noteName;
    const notePath = path.join(options.cache, `${noteName}.txt`);
    if (!fs.existsSync(notePath)) {
        return res.status(404).send('Нотатка не знайдена');
    }
    fs.writeFileSync(notePath, req.body);
    res.status(200).send('Ноатка оновлена');
});
app.delete('/notes/:noteName', (req, res) => {
    const noteName = req.params.noteName;
    const notePath = path.join(options.cache, `${noteName}.txt`);
    if (!fs.existsSync(notePath)){
        return res.status(404).send('Нотатка не знайдена');
    }
    fs.unlinkSync(notePath);
    res.status(200).send('Нотатка видалена');
});

app.listen(options.port, options.host, () => {
    console.log(`Сервер запущено за адресою http://${options.host}:${options.port}`);
});
