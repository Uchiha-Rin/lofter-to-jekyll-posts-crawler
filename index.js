const Crawler = require("node-webcrawler");
const url = require('url');

const links = [];
const crawledPages = [];
const postLinkRegex = '/http:\/\/dudulism\.linesh\.tw\/post\/[a-z0-9]{8}_[a-z0-9]{7}/';

const lofterCrawler = new Crawler({
    maxConnections : 10,
    callback : function (error, result, $) {
        $('a').each(function(index, alink) {
            // $ is Cheerio by default
            // a lean implementation of core jQuery designed specifically for the server
            let toQueueUrl = $(alink).attr('href');
            console.log('Find: ' + toQueueUrl.toString());

            if (toQueueUrl.includes('?page=') && !crawledPages.includes(toQueueUrl)) {
                crawledPages.push(toQueueUrl);
                lofterCrawler.queue(['http://dudulism.linesh.tw/' + toQueueUrl]);
                return ;
            }

            if (/http:\/\/dudulism\.linesh\.tw\/post\/[a-z0-9]{8}_[a-z0-9]{7}/.test(toQueueUrl)) {
                console.log('Regex true');
                if (links.indexOf(toQueueUrl) === -1) {
                    links.push(toQueueUrl);
                    if (links.length === 55) {
                        console.log('==================');
                        console.log(links);
                    }
                }
            }
        })
    }
});


lofterCrawler.queue(['http://dudulism.linesh.tw'])
