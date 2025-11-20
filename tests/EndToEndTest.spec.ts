import {test,expect, Page} from "@playwright/test";
import { HomePage } from "../PageObjects/HomePage";
import { AccountPage} from "../PageObjects/AccountPage";
import {LoginPage} from "../PageObjects/LoginPage";
import { LogoutPage } from "../PageObjects/LogoutPage";
import { SearchProductPage} from "../PageObjects/SearchProductPage";
import { ProductPage } from "../PageObjects/ProductPage";
import { ShoppingCartPage } from "../PageObjects/ShoppingCartPage";
import { TestConfig} from "../test.config.ts/Config";
import { RandomData } from "../Utils/Randomdata";
import { RegistrationPage } from "../PageObjects/RegistrationPage";
import { AccountSucessPage } from "../PageObjects/AccountSucessPage";








  test("End To End test",async({page})=>{

      test.slow();

    let config=new TestConfig();

     await page.goto(config.appUrl);

  const Usermail=  await AccountRegistration(page);

    console.log("********UserSucessfullyRegistered*********");

         await UserLogout(page);

    console.log("********UserSucessfullyLogout*********");

       await UserLogin(page,Usermail);

   console.log("********UserSucessfullyLogIn*********");

               await AddToCart(page);

     console.log("********ProductSucessfullyAddToCart*********");

             await VerifyShoppingCartPrice(page);

      console.log("********ShoppingCartPagePricesAreEqual*********");

    

  });



   async function AccountRegistration(page:Page):Promise<string>{


            const hp=new HomePage(page);
                
             await hp.myAccountLinkClick();
             await hp.registerLinkClick();

             const rp=new RegistrationPage(page);
         
           await  rp.setFirstName(RandomData.getFirstName());
           await  rp.setLastName(RandomData.getLastName());
             
            const UserEmail=RandomData.getEmail();
            
                 
            await  rp.setEmail(UserEmail);

            await  rp.setTelephone(RandomData.getPhoneNumber());
            await  rp.setPassword("test@123");
            await  rp.setConfirmPassword("test@123");
            await  rp.setPrivacyPolicy();
            await  rp.clickContinue();
            await page.waitForTimeout(3000);
      
         const asp=new AccountSucessPage(page);
    
     expect( await asp.accountSucessMsg()).toContain("Your Account Has Been Created!");
       await asp.clickContinueButton();
       await page.waitForTimeout(3000);

              return UserEmail;

 }



    async function UserLogout(page:Page){

        
        const ap=new AccountPage(page);
        const hp=new HomePage(page);
        const lop=new LogoutPage(page);

        expect(await ap.MyAccountmsgVisible()).toBeTruthy();
         await  hp.myAccountLinkClick();
          await page.waitForTimeout(3000);
          await ap.logoutlinkClick();
        await page.waitForTimeout(5000);
        await lop.btnContinueClick();
        await page.waitForTimeout(3000);
 

  }


  async function UserLogin(page:Page,email:string){

        const hp=new HomePage(page);
        const lp=new LoginPage(page);

       await   hp.myAccountLinkClick();
   
       await   hp.loginLinkclick();
      
       await   lp.setUserEmailPassword(email,"test@123");




  }


  async function AddToCart(page:Page){

      const Sp=new SearchProductPage(page);
      const config=new TestConfig();
      let Pp=new ProductPage(page);
      let SCp=new ShoppingCartPage(page);
      const Hp=new HomePage(page);


     await Hp.searchInputBox(config.productName);
     await Hp.searchButtonClick();


      expect(await Sp.searchTextExists()).toBeTruthy();

      Pp=  await Sp.clickSpecificProduct(config.productName);

      expect(await Pp.VerifyPdtTitle()).toContain(config.productName);

     await Pp.quantityInputBox(config.productQuantity);
     
       await Pp.addToCartClick();

       await page.waitForTimeout(3000);

     /* const successmsg= await Pp.SucessmsgAddTocart();

      expect(successmsg).toContain("Success: You have added ");*/

       await Pp.clickViewToCartButton();
      
        SCp= await Pp.ViewToCartLinkClick();

  expect(await SCp.linkshoppingCartVisible()).toBeTruthy();


  }


  async function VerifyShoppingCartPrice(page:Page){

     let config=new TestConfig();
      const Scp=new ShoppingCartPage(page);
     expect(await Scp.totalPdtPrice()).toEqual(config.totalPrice);




  }