import fs from "fs";
import axios from "axios";
import * as cheerio from "cheerio";
import xlsx from "xlsx";

let data = "";
let data2 = "";

async function scrape() {
    

    const response = await axios.get("https://www.quikr.com/jobs/it-software-developer+zwqxj1466534506");

    data = response.data;
    console.log(response.data);


    fs.writeFileSync("data3.js", response.data, (err) => {
        if (err) console.log(err);
    })

}

// scrape();

    let jobData = [];

function scrapeData() {


    
    const readData = fs.readFileSync("data3.js", "utf8");

    let $ = cheerio.load(readData);

    $(".jsListItems").each((index, job) => {
        
        $(job).find(".job-card").each((index, element) => {
            const title = $(element).find(".job-title").text();
            const city = $(element).find(".city b").text();
            const company = $(element).find(".attributeVal.cursor-default").text();
            const salary = $(element).find(".perposelSalary.attributeVal").text();
            const postDate = $(element).find(".jsPostedOn").text().split(",")[0]

            if (title && city && company && salary && postDate) {
                jobData.push({
                    title, city, company, salary, postDate
                });
}


        })
    console.log(jobData);
        
    })
    return jobData;
}
// scrapeData();


function convertToExcel() {
    
    const jobsToSheet = scrapeData();
    const ws = xlsx.utils.json_to_sheet(jobsToSheet);
    const wb = xlsx.utils.book_new();

    const wbtoSheet = xlsx.utils.book_append_sheet(wb, ws, "Jobs Data");

    xlsx.writeFile(wb, "jobs_Scraped.xlsx");



}

convertToExcel()