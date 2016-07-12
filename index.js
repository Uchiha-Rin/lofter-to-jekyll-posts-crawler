const Crawler = require("node-webcrawler");
const toMarkdown = require('html-md');
const fs = require('fs')

const links = [];
const postLinkRegex = '/http:\/\/dudulism\.linesh\.tw\/post\/[a-z0-9]{8}_[a-z0-9]{7}/';

const lofterCrawler = new Crawler({
    maxConnections : 10,
    callback : function (error, result, $) {
        const postHtmlContent = $('div.ctc').html();
        const title = $('title').text();
        const fileName = title.substring(0, title.length - 9).replace('_', '-').replace(' - ', '-').replace('.', '-') + '.md';
        const postMarkdown = toMarkdown(postHtmlContent);
        console.log('Writing file: posts/' + fileName);
        fs.writeFileSync("posts/" + fileName, postMarkdown);
    }
});

lofterCrawler.queue([ 'http://dudulism.linesh.tw/post/1d7a1323_ba61374',
  'http://dudulism.linesh.tw/post/1d7a1323_ba6131e',
  'http://dudulism.linesh.tw/post/1d7a1323_b5f7637',
  'http://dudulism.linesh.tw/post/1d7a1323_ba6125b',
  'http://dudulism.linesh.tw/post/1d7a1323_b8bc593',
  'http://dudulism.linesh.tw/post/1d7a1323_b75e4a8',
  'http://dudulism.linesh.tw/post/1d7a1323_b75e465',
  'http://dudulism.linesh.tw/post/1d7a1323_b37ce05',
  'http://dudulism.linesh.tw/post/1d7a1323_b37cd34',
  'http://dudulism.linesh.tw/post/1d7a1323_b2f49f8',
  'http://dudulism.linesh.tw/post/1d7a1323_b29e61e',
  'http://dudulism.linesh.tw/post/1d7a1323_b24e4c5',
  'http://dudulism.linesh.tw/post/1d7a1323_b001b8e',
  'http://dudulism.linesh.tw/post/1d7a1323_af7ad0c',
  'http://dudulism.linesh.tw/post/1d7a1323_ab34ef4',
  'http://dudulism.linesh.tw/post/1d7a1323_aa6f848',
  'http://dudulism.linesh.tw/post/1d7a1323_a656bbe',
  'http://dudulism.linesh.tw/post/1d7a1323_a4b25a1',
  'http://dudulism.linesh.tw/post/1d7a1323_a2c0ea3',
  'http://dudulism.linesh.tw/post/1d7a1323_9fc524b',
  'http://dudulism.linesh.tw/post/1d7a1323_9decc93',
  'http://dudulism.linesh.tw/post/1d7a1323_9ceda0b',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dc1',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dc2',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dc3',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dc4',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dc5',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dc6',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dc7',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dc9',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dca',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dcb',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dcc',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dcd',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dce',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dcf',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dd0',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dd1',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dd2',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dd3',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dd4',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dd5',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dd6',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dd7',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dd8',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dd9',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dda',
  'http://dudulism.linesh.tw/post/1d7a1323_8944ddb',
  'http://dudulism.linesh.tw/post/1d7a1323_8944ddc',
  'http://dudulism.linesh.tw/post/1d7a1323_8944ddd',
  'http://dudulism.linesh.tw/post/1d7a1323_8944dde',
  'http://dudulism.linesh.tw/post/1d7a1323_8944ddf',
  'http://dudulism.linesh.tw/post/1d7a1323_8944de0',
  'http://dudulism.linesh.tw/post/1d7a1323_8944de1',
  'http://dudulism.linesh.tw/post/1d7a1323_8944de2' ])
// These links are crawled someone how by the following scripts:

const crawledPages = [];
new Crawler({
    maxConnections : 10,
    callback : function (error, result, $) {
        $('a').each(function(index, link) {
            let toQueueUrl = $(link).attr('href');

            if (toQueueUrl.includes('?page=') && !crawledPages.includes(toQueueUrl)) {
                crawledPages.push(toQueueUrl);
                lofterCrawler.queue(['http://dudulism.linesh.tw/' + toQueueUrl]);
                return ;
            }

            if (/http:\/\/dudulism\.linesh\.tw\/post\/[a-z0-9]{8}_[a-z0-9]{7}/.test(toQueueUrl)) {
                if (links.indexOf(toQueueUrl) === -1) {
                    links.push(toQueueUrl);
                }
            }
        })
    }
});
