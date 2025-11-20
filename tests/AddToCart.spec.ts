import {test,expect} from "@playwright/test";
import {HomePage} from "../PageObjects/HomePage";
import {SearchProductPage} from "../PageObjects/SearchProductPage";
import { ProductPage } from "../PageObjects/ProductPage";
import { ShoppingCartPage } from "../PageObjects/ShoppingCartPage";
import { TestConfig} from "../test.config.ts/Config";


   
     //Success: You have added;

  test("Verify The Add To Cart @Master @regression",async({page})=>{


            let config=new TestConfig();
            let hp=new HomePage(page);
            let spp=new SearchProductPage(page);
            let pp=new ProductPage(page);
            let scp=new ShoppingCartPage(page);
    
      

            await page.goto(config.appUrl);

            await hp.searchInputBox(config.productName);
            await hp.searchButtonClick();

          const SearchText=  await spp.searchTextExists();
             expect(SearchText).toBeTruthy();
 
       

        pp=  await spp.clickSpecificProduct(config.productName);
         
              await page.waitForTimeout(2000);

         const title=   await  pp.VerifyPdtTitle();

         expect(title).toContain(config.productName);

              
        await pp.quantityInputBox(config.productQuantity);
        await pp.addToCartClick();

        await page.waitForTimeout(5000);

       const successmsg= await pp.SucessmsgAddTocart();

      expect(successmsg).toContain("Success: You have added");

       await pp.clickViewToCartButton();
       await page.waitForTimeout(1000);

        scp= await pp.ViewToCartLinkClick();

     expect(await scp.totalPdtPrice()).toContain(config.totalPrice);


     await page.waitForTimeout(5000);


  });