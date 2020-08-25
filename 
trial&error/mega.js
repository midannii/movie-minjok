'use strict';
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
      headless:false
    });
    try {
// 웹페이지 열기
    const page = await browser.newPage();
    await page.goto('https://www.megabox.co.kr/booking/timetable');


    const city_slt = '#contents > div > div > div.reserve.theater-list-box > div.tab-block.tab-layer.mb30 > ul > li:nth-child(2) > a';
    //const city = await page.$eval(city_slt , data => {return data.innerText;});
    console.log("city: ")
    //console.log(city)
    await page.waitForSelector(city_slt);
    await page.click(city_slt);
   //await page.waitFor(3000);


   const locate_slt = "#contents > div > div > div.reserve.theater-list-box > div:nth-child(2) > div.theater-area-click > a";
   await page.waitForSelector(locate_slt);
   const locate = await page.$eval(locate_slt , data => {return data.innerText;});
   console.log("locate: ")
   console.log(locate)

   await page.waitForSelector(locate_slt);
   await page.click(locate_slt);
   //await page.waitFor(3000);

   const name_slt = "#mCSB_2_container > ul > li:nth-child(2) > button"
   const name = await page.$eval(name_slt, data => {return data.innerText;});
   console.log("movie name:");
   console.log(name);

   const time_slt = '#contents > div > div > div.reserve.theater-list-box > div:nth-child(2) > div:nth-child(2) > div.theater-time > div.theater-time-box > table > tbody > tr > td:nth-child(1) > div > div > a > p.time'
   const time = await page.$eval(time_slt, data => {return data.innerText;});
   console.log("start time:");
   console.log(time);

   const total_slt = '#contents > div > div > div.reserve.theater-list-box > div:nth-child(2) > div:nth-child(2) > div.theater-type > p.chair'
   const total = await page.$eval(total_slt, data => {return data.innerText;});
   console.log("total eats:")
   console.log(total);

   const left_slt = '#contents > div > div > div.reserve.theater-list-box > div:nth-child(2) > div:nth-child(2) > div.theater-time > div.theater-time-box > table > tbody > tr > td:nth-child(1) > div > div > a > p.chair'
   const left = await page.$eval(left_slt, data => {return data.innerText;});
   console.log("left eats:");
   console.log(left);

/*
    const start = '#contents > div > div > div.movie-choice-area > div.tab-left-area > ul > li:nth-child(2) > a';
    await page.waitForSelector(start);
    const starts = await page.$eval(start , data => {return data;});
    await page.click(start);
    console.log(starts);
    //await page.waitFor(30000);

    const city_slt = '#masterBrch > div > div.tab-list-choice > ul > li:nth-child(1) > a';
    const city = await page.$eval(city_slt , data => {return data.innerText;});
    console.log("city: ")
    console.log(city)
   await page.waitForSelector(city_slt);
   await page.click(city_slt);
   //await page.waitFor(3000);


   const locate_slt = "#mCSB_4_container > ul > li:nth-child(2) > button"
   const locate = await page.$eval(locate_slt , data => {return data.innerText;});
   console.log("locate: ")
   console.log(locate)

   await page.waitForSelector(locate_slt);
   await page.click(locate_slt);
   //await page.waitFor(3000);

   const name_slt = "#contents > div > div > div.reserve.theater-list-box > div:nth-child(2) > div.theater-tit > p:nth-child(2)"
   const name = await page.$eval(name_slt, data => {return data.innerText;});
   console.log("movie name:")
   console.log(name)

   const time_slt = '#contents > div > div > div.reserve.theater-list-box > div:nth-child(2) > div:nth-child(2) > div.theater-time > div.theater-time-box > table > tbody > tr > td:nth-child(1) > div > div > a > p.time'
   const time = await page.$eval(time_slt, data => {return data.innerText;});
   console.log("start time:")
   console.log(time)

*/

    } catch (err) {
        console.error(err.message);
      } finally {
        await browser.close();
      }

  })();
