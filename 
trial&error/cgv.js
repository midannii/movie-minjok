'use strict';
const puppeteer = require('puppeteer');

// click 동작 넣기
console.log('hi, Let us start!');
// page load
(async () => {
    const browser = await puppeteer.launch({
      headless:false
    });
    try {
// 웹페이지 열기
    const page = await browser.newPage();
    await page.goto('http://www.cgv.co.kr/reserve/show-times/');

    const city_slt = '#contents > div.sect-common > div > div.sect-city > ul > li:nth-child(4) > a';
    const city = await page.$eval(city_slt , data => {return data.innerText;});
    console.log("city: ")
    console.log(city)
   await page.waitForSelector(city_slt);
   await page.click(city_slt);



   const locate_slt = "#contents > div.sect-common > div > div.sect-city > ul > li.on > div > ul > li:nth-child(1) > a"
   const locate = await page.$eval(locate_slt , (data) => {return data.innerText;});
   console.log("locate: ")
   console.log(locate)

   await page.waitForSelector(locate_slt);
   await page.click(locate_slt);

   const frame = page.mainFrame()._url.replace('reserve/show-times/', 'common/showtimes/iframeTheater.aspx');
   //console.log(frame);
   //console.log(frame.replace('reserve/show-times/', 'common/showtimes/iframeTheater.aspx'));
   //console.log(frame);
   await page.goto(frame);

    //const frame2 = page.frames().find(frame => frame.name() == locate+' 상영시간표');


   const name_slt = "body > div > div.sect-showtimes > ul > li:nth-child(1) > div > div.info-movie > a > strong"
   const name = await page.$eval(name_slt, data => {return data.innerText;});
   console.log("movie name:")
   console.log(name)

   const time_slt = 'body > div > div.sect-showtimes > ul > li:nth-child(1) > div > div:nth-child(2) > div.info-timetable > ul > li:nth-child(2) > a > em'
  await page.waitForSelector(time_slt);
   const time = await page.$eval(time_slt, data => {return data.innerText;});
   console.log("start time:")
   console.log(time)

   const total_slt = 'body > div > div.sect-showtimes > ul > li:nth-child(1) > div > div:nth-child(2) > div.info-hall > ul > li:nth-child(3)'
   const total = await page.$eval(total_slt, data => {return data.innerText;});
   console.log("total eats:")
   console.log(total)

   const left_slt = 'body > div > div.sect-showtimes > ul > li:nth-child(1) > div > div:nth-child(2) > div.info-timetable > ul > li:nth-child(2) > a > span'
   const left = await page.$eval(left_slt, data => {return data.innerText;});
   console.log("left eats:")
   console.log(left)



   //console.log(data);




    } catch (err) {
        console.error(err.message);
      } finally {
        await browser.close();
      }

  })();
