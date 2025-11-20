import {test,expect} from "@playwright/test";
import {HomePage} from "../PageObjects/HomePage";
import {LoginPage} from "../PageObjects/LoginPage";
import {AccountPage} from "../PageObjects/AccountPage";
import {TestConfig} from "../test.config.ts/Config";
import { ParsingFiles } from "../Utils/dataProvider";



         //Read JSon Data

  
  const JsonPath="testdata/logindata.json";
  const JsonData=ParsingFiles.ReadJsonFile(JsonPath);


       for(let Data of JsonData){


         test(`Verify Login DataDriven Test @datadriven ${Data.testName}`,async({page})=>{


              const config=new TestConfig();
               await page.goto(config.appUrl);

               const hp=new HomePage(page);
               const lp=new LoginPage(page);
               const ap=new AccountPage(page);

              await hp.myAccountLinkClick();
              await hp.loginLinkclick();

              await lp.setUserEmailPassword(Data.email,Data.password);
              await page.waitForTimeout(5000);

              if(Data.expected==='success'){


               const text= await lp.LoginSucessMsg();

               expect(text).toEqual("My Account");

              }

              else{

                  const text=await lp.LoginUnsucessfull();

                  expect(text).toContain("Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour");

              }




                



         });





       }


