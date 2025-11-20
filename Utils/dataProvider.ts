import fs from "fs";
import {parse} from "csv-parse";


export class ParsingFiles{



    static ReadJsonFile(filepath:string){


       let data=JSON.parse(fs.readFileSync(filepath,'utf-8'));
       return data;



    }


  static ReadCsvFile(filepath:string){



    let data= parse(fs.readFileSync(filepath),{columns:true,skip_empty_lines:true});

    return data;




  }




}