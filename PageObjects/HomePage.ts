import{Page,Locator} from "@playwright/test";

export class HomePage{




      private readonly page:Page;
      private readonly linkMyAccount:Locator;
      private readonly linkRegistration:Locator;
      private readonly linkLogin:Locator;
      private readonly txtSearchBox:Locator;
      private readonly searchButton:Locator;



      constructor(page:Page){


          this.page=page;
          this.linkMyAccount=this.page.locator("span:has-Text('My Account')");
          this.linkRegistration=this.page.locator(".dropdown-menu.dropdown-menu-right li:has-text('Register')");
          this.linkLogin=this.page.locator("a:has-text('Login')");
          this.txtSearchBox=this.page.locator("input[placeholder='Search']");
          this.searchButton=this.page.locator("#search button");





      }



      async homePageExists(){



        const title= await this.page.title();

          if(title){

            return true;

          }

            return false;

      }


  async myAccountLinkClick(){

      try{

     await  this.linkMyAccount.click();

      }catch(err){

       console.log(`Exceptiion Occured In ClickMyAccount Link ${err}`);

      }

  }


  async registerLinkClick(){


  try{
  await this.linkRegistration.click();

  }catch(err){

     console.log(`Exceptiion Occured In Register Link ${err}`);

  }


  }

async loginLinkclick(){
  try{

    await this.linkLogin.click();

  }catch(err){

   console.log(`Exceptiion Occured In Login Link ${err}`);
  }

}


async searchInputBox(text:string){

try{
await this.txtSearchBox.fill(text);

}catch(err){

   console.log(`Exceptiion Occured In SearchInputBox ${err}`);    
}

}


async searchButtonClick(){

     try{

        await this.searchButton.click();

     }catch(err){
         console.log(`Exception Occured In SearchButton ${err}`);
     }

}














}
