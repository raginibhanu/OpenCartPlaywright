import {Page,Locator} from "@playwright/test";

export class ShoppingCartPage{


  private readonly page:Page;
  private readonly txtTotalPriceBox:Locator;
  private readonly linkShoppingcart:Locator;



    constructor(page:Page){

       this.page=page;
       this.txtTotalPriceBox=page.locator(".table-responsive tbody td.text-right:last-child");
       this.linkShoppingcart=page.locator(".breadcrumb a:has-text('Shopping Cart')");


    }



    async totalPdtPrice():Promise<string | null>{


      const price=  await this.txtTotalPriceBox.textContent();

      return price;




    }

    async linkshoppingCartVisible():Promise<boolean>{


       const text=   this.linkShoppingcart;

         if(text){

             return true;


         }

         else{

             return false;
         }


    }








}