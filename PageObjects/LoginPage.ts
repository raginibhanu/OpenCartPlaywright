import {Page,Locator,expect} from "@playwright/test";
import { RegistrationPage } from "./RegistrationPage";


export class LoginPage{


      private readonly page:Page;
      private readonly UsernameInput:Locator;
      private readonly PasswordInput:Locator;
      private readonly LoginButton:Locator;
      private readonly ErrormsgTextHeading:Locator;
      private readonly LoginSucessMyAccountText:Locator;
      private readonly NewCustomerSignup:Locator;


      constructor(page:Page){


         this.page=page;
         this.UsernameInput=this.page.locator("#input-email");
         this.PasswordInput=this.page.locator("#input-password");
         this.LoginButton=this.page.locator("input[value='Login']");
         this.LoginSucessMyAccountText=this.page.locator("#content h2:has-text('My account')");
         this.ErrormsgTextHeading=this.page.locator(".alert.alert-danger.alert-dismissible");
         this.NewCustomerSignup=this.page.locator("a[class='btn btn-primary']");



  }


      async setUserEmailPassword(email:string,pass:string){


        await this.UsernameInput.fill(email);
        await this.PasswordInput.fill(pass);
        await this.LoginButton.click();



      }


      async LoginSucessMsg():Promise<string | null>{




      return (await this.LoginSucessMyAccountText.textContent())?.trim() ?? '';




      }

   async LoginUnsucessfull():Promise<string | null>{




      return (await this.ErrormsgTextHeading.textContent())?.trim() ?? '';


   }
















}