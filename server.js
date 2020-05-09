const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const util = require('util');
const request = require('request');

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
const outputThumbnail = (name) =>
  path.resolve('public/screenshot', `${name}.png`);

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url).pipe(fs.createWriteStream(path)).on('close', callback);
  });
};

app.post('/download', async (req, res) => {
  const body = req.body;
  const url = body.url;
  let starttime;

  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  if (regex.test(url)) {
    ytdl.getInfo(url, (err, info) => {
      if (err) throw err;
      const videoTitle = info.title;
      const titleClean = videoTitle.replace(/\s+/g, '-').toLowerCase();
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
          download(
            info.player_response.videoDetails.thumbnail.thumbnails[3].url,
            outputThumbnail(titleClean),
            () => {
              console.log('Thumbnail downloaded');
            }
          );
          // take screenshot for thumbnail
          res.status(200).send({ status: 'success' });
        })
        .pipe(fs.createWriteStream(output(info.title)));
    });
  }
});

// List all video downloaded recently

app.get('/latest-download', async (req, res) => {
  const readdirAsync = util.promisify(fs.readdir);
  const statAsync = util.promisify(fs.stat);

  async function readdirChronoSorted(dirpath, order) {
    order = order || 1;
    const files = await readdirAsync(dirpath);
    const stats = await Promise.all(
      files.map((filename) =>
        statAsync(path.join(dirpath, filename)).then((stat) => ({
          filename,
          stat,
        }))
      )
    );
    return stats
      .sort((a, b) => order * (b.stat.mtime.getTime() - a.stat.mtime.getTime()))
      .map((stat) => stat.filename);
  }

  (async () => {
    try {
      const dirpath = path.join('./download');
      const response = await readdirChronoSorted(dirpath);
      res.status(200).send(response);
    } catch (err) {
      console.log(err);
    }
  })();
});

// Lib Genesis

// Youtube Search

// Pomodoro
