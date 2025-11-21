import {test,expect,BrowserContext,Browser,Page} from "@playwright/test";
import {HomePage} from "../PageObjects/HomePage";
import {LoginPage} from "../PageObjects/LoginPage";
import {AccountPage} from "../PageObjects/AccountPage";
import { TestConfig } from "../test.config.ts/Config";

let hp:HomePage;
let lp:LoginPage;
let config:TestConfig;
let context:BrowserContext;
let page:Page;
let ap:AccountPage;



  test.beforeEach(async({browser})=>{


       context=    await   browser.newContext();
        page=      await   context.newPage();

       config=new TestConfig();

       await page.goto(config.appUrl);
       
       hp=new HomePage(page);
       lp=new LoginPage(page);
       ap=new AccountPage(page);


 });

test.afterEach(async()=>{

    await page.waitForTimeout(5000);
    await page.close();

})


test("Verify Login @master @regression",async()=>{



        await  hp.myAccountLinkClick();
        await  hp.loginLinkclick();

        await lp.setUserEmailPassword(config.email,config.password);


      const Myaccountheader= await ap.MyAccountmsgVisible();

        expect(Myaccountheader).toBeTruthy();










});