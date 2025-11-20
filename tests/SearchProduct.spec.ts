import {test,expect} from "@playwright/test";
import {HomePage} from "../PageObjects/HomePage";
import {SearchProductPage} from "../PageObjects/SearchProductPage";
import {TestConfig} from "../test.config.ts/Config";


 let config:TestConfig;
 let hp:HomePage;
 let spp:SearchProductPage;
 
 



test("Search The Products @master @regression",async({page})=>{


      config=new TestConfig();

      await page.goto(config.appUrl);

         hp=new HomePage(page);
        
      await hp.searchInputBox(config.productName);
      await hp.searchButtonClick();

      await page.waitForTimeout(5000);

      spp=new SearchProductPage(page);
 
    const booleanvalue= await  spp.searchTextExists();

      expect(booleanvalue).toBeTruthy();

 expect(await spp.ProductVisible(config.productName)).toBeTruthy();


    await page.waitForTimeout(5000);

});