import {Page,Locator} from "@playwright/test";
import { ShoppingCartPage } from "./ShoppingCartPage";


export class ProductPage{


       private readonly page:Page;
       private readonly TxtProductTitle:Locator;
       private readonly PdtQuantityInputBox:Locator;
       private readonly linkAddtoCart:Locator;
       private readonly ButtonViewCart:Locator;
       private readonly linkViewToCart:Locator;
       private readonly addtoCartSucessmsg:Locator;
       private readonly PdtImgThumbNextPrevious:Locator;
       private readonly ImgNextButton:Locator;
       private readonly ImgPreviousButton:Locator;
       public  totalNoOfImagesCount:Locator;
       public imgCloseMarkSymbol:Locator;

       constructor(page:Page){

         this.page=page;
         this.TxtProductTitle=page.locator("div[id='content'] h1");
         this.PdtQuantityInputBox=page.locator("#input-quantity");
         this.linkAddtoCart=page.locator("#button-cart");
         this.ButtonViewCart=page.locator("#cart-total");
         this.linkViewToCart=page.locator("p[class='text-right']>a:first-child");
         this.addtoCartSucessmsg=page.locator(".alert.alert-success.alert-dismissible");
         this.PdtImgThumbNextPrevious=page.locator("ul[class='thumbnails'] li:nth-child(1) a");
         this.ImgNextButton=page.locator("button[title='Next (Right arrow key)']");
         this.ImgPreviousButton=page.locator("button[title='Previous (Left arrow key)']");
         this.totalNoOfImagesCount=page.locator(".mfp-counter");
         this.imgCloseMarkSymbol=page.locator("button[title='Close (Esc)']");

       }



       async VerifyPdtTitle():Promise<string | null>{


     const title=  (await this.TxtProductTitle.textContent());


          return title;


       }



      async quantityInputBox(quan:string){


       await  this.PdtQuantityInputBox.clear();
       await  this.page.waitForTimeout(1000);
       await  this.PdtQuantityInputBox.fill(quan);


      }


      async addToCartClick(){


        await this.linkAddtoCart.click();




      }


      async clickViewToCartButton(){


        await this.ButtonViewCart.click();


    }

     async ViewToCartLinkClick():Promise<ShoppingCartPage>{



     await this.linkViewToCart.click();
     await this.page.waitForTimeout(2000);
     return new ShoppingCartPage(this.page);



     }


     async SucessmsgAddTocart():Promise<string|null>{


       const alertMsg= await this.addtoCartSucessmsg.innerText();

       return alertMsg;


     }


       async ProductIdNextPreviousImgClick(){



       await this.PdtImgThumbNextPrevious.click();




       }


   async imgNextButtonClick(){


      await this.ImgNextButton.click();


   }

async imgPreviousButtonClick(){

 await this.ImgPreviousButton.click();

}




async TotalImagesProductContain():Promise<number>{



  let text= await  this.totalNoOfImagesCount.innerText();

   
       
        let t=    text.split("of");

      let totalimgs=parseInt(t[1].trim());

        return totalimgs;
       


  }



  async ProductImgCloseButtonClick(){


      await this.imgCloseMarkSymbol.click();
  }







}