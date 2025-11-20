import {Page,Locator} from "@playwright/test";
import {LogoutPage} from "./LogoutPage";


export class AccountPage{


      private readonly page:Page;
      private readonly TxtMyaccountheader:Locator;
      private readonly linkLogout:Locator;
      

      constructor(page:Page){

          this.page=page;
          this.TxtMyaccountheader=this.page.locator("h2:has-text('My Account')");
          this.linkLogout=this.page.locator("a:has-text('Logout'):first-child");


  }


    async MyAccountmsgVisible():Promise<boolean>{


  try{
     const isvisible= await this.TxtMyaccountheader.isVisible();

           return isvisible;
     }catch(err){

       return false;


     }



    }


    async logoutlinkClick(){


         try{


             await this.linkLogout.click();
             return new LogoutPage(this.page);

         }catch(err){


         }






    }
 









}