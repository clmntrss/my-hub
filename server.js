const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

// Youtube Downloader
const fs = require('fs');
const readline = require('readline');
const ytdl = require('ytdl-core');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function (req, res) {
  console.log('pong');
  return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Server up');
});

// Youtube Downloader

const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
const output = (name) => path.resolve('download', `${name}.mp4`);

app.post('/download', async (req, res) => {
  const body = req.body;
  const url = body.url;
  const video = ytdl(url);
  let starttime;

  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  if (regex.test(url)) {
    ytdl.getInfo(url, (err, info) => {
      if (err) throw err;
      ytdl(url, {
        format: 'mp4',
      })
        .once('response', () => {
          starttime = Date.now();
        })
        .on('progress', (chunkLength, downloaded, total) => {
          const percent = downloaded / total;
          const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
          const estimatedDownloadTime =
            downloadedMinutes / percent - downloadedMinutes;
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
          process.stdout.write(
            `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
              total /
              1024 /
              1024
            ).toFixed(2)}MB)\n`
          );
          process.stdout.write(
            `running for: ${downloadedMinutes.toFixed(2)}minutes`
          );
          process.stdout.write(
            `, estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
          );
          readline.moveCursor(process.stdout, 0, -1);
        })
        .on('end', () => {
          process.stdout.write('\n\n');
          res.status(200).send('Dl end');
        })
        .pipe(fs.createWriteStream(output(info.title)));
    });
  }
});

// List all video downloaded

app.get('/downloaded-video', async (req, res) => {
  const videoFolder = './download';
  var data = [];
  fs.readdir(videoFolder, (err, files) => {
    files.forEach((file) => {
      console.log(file);
      data.push(file);
    });
    res.send(data);
  });
});

// Lib Genesis

// Youtube Search

// Pomodoro
