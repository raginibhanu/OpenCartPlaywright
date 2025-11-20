import {Page,Locator} from "@playwright/test";
import { ProductPage } from "./ProductPage";


export class SearchProductPage{


      
   

      private readonly page:Page;
      private readonly allProductslist:Locator;
      private readonly  TxtSearchProduct:Locator;
      private readonly TxtNoProductinthisName:Locator;
      private readonly nonExistPdtThumb:Locator;

   

      constructor(page:Page){


         this.page=page;

        this.TxtSearchProduct=page.locator("#content>h1");
        this.allProductslist=page.locator("h4>a");
        this.TxtNoProductinthisName=page.locator("text='There is no product that matches the search criteria.'");
        this.nonExistPdtThumb=page.locator(".product-thumb img");


       }


        async searchTextExists():Promise<boolean>{


         const searchProductname =  this.TxtSearchProduct;

         if(await searchProductname.isVisible()){

              return true;

         }

           else{

                return  false;
           }

             
           

     }



     async clickSpecificProduct(PdtName:string):Promise<ProductPage>{


      

       const TotalProducts:Locator=   this.allProductslist;

         const total=  await  TotalProducts.count();


         for(let i=0;i<total;i++){


          let producttext=await TotalProducts.nth(i).textContent();

     
            if(producttext===PdtName){


           await TotalProducts.nth(i).click();
            
                      break;

              

            }



         }

              return new ProductPage(this.page);


  }


    async ProductVisible(ProductName:string):Promise<boolean>{

       

         const TotalProducts:Locator=   this.allProductslist;

         const total=  await  TotalProducts.count();


         for(let i=0;i<total;i++){


          let producttext=await TotalProducts.nth(i).textContent();

     
            if(producttext===ProductName){


                    return true;
            
                      break;

                  
              

            }



         }




                        return false;
 



    }


       async VerifyNoProductSearchCriteria():Promise<string>{


          const noProduct:string=await this.TxtNoProductinthisName.innerText();

             return noProduct;



       }


        async NonExistingSearchProductClick(){


         await  this.nonExistPdtThumb.click();



    }

















}