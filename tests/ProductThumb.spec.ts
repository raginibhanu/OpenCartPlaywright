import {test,Locator,Page,BrowserContext} from "@playwright/test";
import { HomePage} from "..//PageObjects/HomePage";
import { SearchProductPage} from "../PageObjects/SearchProductPage";
import { ProductPage } from "../PageObjects/ProductPage";
import { TestConfig } from "../test.config.ts/Config";


let hp:HomePage;
let spp:SearchProductPage;
let pp:ProductPage;
let config:TestConfig;
let context:BrowserContext;
let page:Page;


  

test.beforeEach(async({browser})=>{


      context=await browser.newContext();

     page= await context.newPage();
   config=new TestConfig();

  await page.goto(config.appUrl);

   hp=new HomePage(page);
   spp=new SearchProductPage(page);
   pp=new ProductPage(page);


})

test.afterEach(async()=>{


    await page.waitForTimeout(5000);
    await page.close();


});



test("Verify Images next Last @master @regression",async()=>{


       await  hp.searchInputBox("iphone");

       await  hp.searchButtonClick();


       await spp.NonExistingSearchProductClick();
       await page.waitForTimeout(3000);
       await pp.ProductIdNextPreviousImgClick();
       await page.waitForTimeout(3000);


         //images Next Buttons Click

      let total= await pp.TotalImagesProductContain();

    


      for(let i=1;i<total;i++){


         await pp.imgNextButtonClick();
         //await page.waitForTimeout(2000);



      }

      await pp.ProductImgCloseButtonClick();
      await page.waitForTimeout(2000);


      await pp.ProductIdNextPreviousImgClick();
      await page.waitForTimeout(2000);
     

       //Images Previous Buttons click

     let total1= await pp.TotalImagesProductContain();

       


      for(let i=1;i<total1;i++){


         await pp.imgPreviousButtonClick();
        // await page.waitForTimeout(2000);



      }

      await pp.ProductImgCloseButtonClick();
      await page.waitForTimeout(2000);




});