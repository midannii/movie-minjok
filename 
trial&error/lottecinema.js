'use strict';
const puppeteer = require('puppeteer');
// 단순히 하나의 단어만 크롤링

console.log('hi');
// page load
(async () => {
    const browser = await puppeteer.launch({
      headless:false
    });
    try {
// 웹페이지 열기
    const page = await browser.newPage();
    await page.goto('https://www.lottecinema.co.kr/NLCHS/Ticketing/Schedule');

    const frame = page.mainFrame()._url;
    //console.log(frame);
    //console.log(frame.replace('reserve/show-times/', 'common/showtimes/iframeTheater.aspx'));
    //console.log(frame);
    await page.goto(frame);

    const city_slt = '#reserveCateCinema > div.article.article_cinema > div.inner > div > ul > li:nth-child(2) > a';
    const city = await page.$eval(city_slt , data => {return data.innerText;});
    console.log("city: ")
    console.log(city)
   await page.waitForSelector(city_slt);
   await page.click(city_slt);



   const locate_slt = "#mCSB_48_container > ul > li:nth-child(6) > a"
   const locate = await page.$eval(locate_slt , data => {return data.innerText;});
   console.log("locate: ")
   console.log(locate)

   await page.waitForSelector(locate_slt);
   await page.click(locate_slt);


   const name_slt = "#mCSB_132_container > div:nth-child(2) > div.time_select_tit > strong"
   const name = await page.$eval(name_slt, data => {return data.innerText;});
   console.log("movie name:")
   console.log(name)

   const time_slt = '#mCSB_132_container > div:nth-child(1) > div.time_select_wrap.timeSelect > ul.list_time > li > a > dl > dd.time > strong'
   const time = await page.$eval(time_slt, data => {return data.innerText;});
   console.log("start time:")
   console.log(time)

    } catch (err) {
        console.error(err.message);
      } finally {
        await browser.close();
      }

  })();
