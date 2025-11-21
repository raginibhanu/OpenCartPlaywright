import {test,expect} from "@playwright/test";
import {HomePage} from "../PageObjects/HomePage";
import {RegistrationPage} from "../PageObjects/RegistrationPage";
import { RandomData } from "../Utils/Randomdata";
import { TestConfig } from "../test.config.ts/Config";


let hp:HomePage;
let rp:RegistrationPage;
let config:TestConfig;



   test.beforeEach(async({page})=>{

      config=new TestConfig();
     await page.goto(config.appUrl);

       hp=new HomePage(page);
       rp=new RegistrationPage(page);

 });


  test.afterEach(async({page})=>{


  await page.waitForTimeout(10000);

  await page.close();





  })


  test("User RegisterAccount @master @regression",async()=>{


       await   hp.myAccountLinkClick();
       await hp.registerLinkClick();

      await rp.setFirstName(RandomData.getFirstName());
      await  rp.setLastName(RandomData.getLastName());

      await rp.setEmail(RandomData.getEmail());
      await rp.setTelephone(RandomData.getPhoneNumber());

            const pass=RandomData.getPassword();

          await rp.setPassword(pass);
          await rp.setConfirmPassword(pass);

          await rp.setPrivacyPolicy();
          await rp.clickContinue();
          
          
          const confirmationMsg = await rp.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!')









  })