import { HomePage } from "../PageObjects/HomePage";
import { SearchProductPage } from "../PageObjects/SearchProductPage";
import {TestConfig} from "../test.config.ts/Config";
import {test,expect} from "@playwright/test";



test("VerifyNoExistingProduct @Master @regression",async({page})=>{

  
      let config=new TestConfig();
      let hp =new HomePage(page);
      let SPP=new SearchProductPage(page);


      await page.goto(config.appUrl);

       await  hp.searchInputBox(config.NotExistingProduct);
       await  hp.searchButtonClick();
       

    const text= await SPP.VerifyNoProductSearchCriteria();

     expect(text).toContain("There is no product that matches the search criteria.");















})