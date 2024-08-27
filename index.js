import fs from "fs";
import axios from "axios";
import * as cheerio from "cheerio";

let data = "";
let data2 = "";

async function scrape() {
    

    const response = await axios.get("https://www.seek.co.nz/front-end-developer-jobs/in-All-Auckland");

    data = response.data;
    console.log(response.data);


    // fs.writeFileSync("data2.js", response.data, (err) => {
    //     if (err) console.log(err);
    // })

}

scrape();


function scrapeData() {

    const readData = fs.readFileSync("data2.js", "utf8");
    
    let dataArray = [];

    let $ = cheerio.load(readData);

    $(".job-title").each((index, data) => {
        dataArray[index] = {};
        dataArray[index].jobTitle = $(data).text();
    })

    $(".company-name").each((index, data) => {
        data[index].company = $(data).text();
    })



}
// scrapeData()
