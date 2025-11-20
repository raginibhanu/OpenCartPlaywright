import { Page,Locator } from "@playwright/test";

export class AccountSucessPage{


        private readonly page:Page;
        private readonly msgAccountConfirmation:Locator;
        private readonly continueButton:Locator;


        constructor(page:Page){

            this.page=page;
            this.msgAccountConfirmation=page.locator("h1:has-text('Your Account Has Been Created!')");
            this.continueButton=page.locator(".btn.btn-primary");


        }


        async clickContinueButton(){


         await this.continueButton.click();


        }


        async accountSucessMsg(){


         return await this.msgAccountConfirmation.textContent();


        }




}