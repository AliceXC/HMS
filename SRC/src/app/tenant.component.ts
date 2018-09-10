import { Component } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tenant } from './model/tenant';

@Component({
    selector: 'tenant',
    templateUrl: `./html/tenant.html`,
    styleUrls: ['./css/tenant.css']
})
 
export class TenantComponent{
    tenants: any = [];

  constructor(private http: HttpClient) {
    // run getTenants() when the page is loaded
    // uncomment the below line once router is created
    this.getTenants();
  }

  getTenants(): void {
    this.http.post("http://127.0.0.1:10001/gettenants", {}).subscribe(
      data => {
        this.tenants = data;
      }, error => {
        console.error(error);
      }, () => {
        console.log("response finished");
      }
    );
  }

  submit(): void {
    let phoneNumber = (<HTMLInputElement> document.getElementById("phone-number")).value;
    //console.log("phoneNumber: " + phoneNumber);

    //TODOOOOOOOO CHECK! phone number cannot be empty!!!

    for(let c of phoneNumber){
      //console.log("char: " + c + ", ascii: " + c.charCodeAt(0));
      if(c.charCodeAt(0) < 48 || c.charCodeAt(0) > 57){
        alert("Phone number formatted incorrectly!");
        return; 
      }
    }
    this.addTenant();
    var elem = document.getElementById("cancel-button");
    elem.click();
  }
  addTenant(): void {
    
    let name = (<HTMLInputElement> document.getElementById("name")).value;
    let phoneNumber = (<HTMLInputElement> document.getElementById("phone-number")).value;

    let ob = {
      // key:value
      "name": name,
      "phoneNumber": phoneNumber
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    };

    this.http.post("http://127.0.0.1:10001/addtenant",JSON.stringify(ob), httpOptions).subscribe(
      data => {
      }, error => {
        console.error(error);
      }, () => {
        // once the new tenant is added, reload the tenant page
        console.log("response finished!!!");
        this.getTenants();

        // reset the name and pn inputs
        let nameEle = <HTMLInputElement>document.getElementById("name");
        nameEle.value = nameEle.defaultValue;
        let pnEle = <HTMLInputElement>document.getElementById("phone-number");
        pnEle.value = pnEle.defaultValue;
      }
    );
  }

  // TODO FIX ! 
  // remove => reload whole page, hms.html not tenant.html
  removeTenant(id: number): void{
    //console.log("id: " + id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    this.http.post("http://127.0.0.1:10001/removetenant",JSON.stringify(id), httpOptions).subscribe(
      data=>{
      }, error => {
        console.error(error);
      }, () => {
        console.log("response finished");
        this.getTenants();
      }
    );
  }
}