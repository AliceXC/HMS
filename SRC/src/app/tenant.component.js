"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var TenantComponent = (function () {
    function TenantComponent(http) {
        this.http = http;
        this.tenants = [];
        // run getTenants() when the page is loaded
        // uncomment the below line once router is created
        this.getTenants();
    }
    TenantComponent.prototype.getTenants = function () {
        var _this = this;
        this.http.post("http://127.0.0.1:10001/gettenants", {}).subscribe(function (data) {
            _this.tenants = data;
        }, function (error) {
            console.error(error);
        }, function () {
            console.log("response finished");
        });
    };
    TenantComponent.prototype.submit = function () {
        var phoneNumber = document.getElementById("phone-number").value;
        //console.log("phoneNumber: " + phoneNumber);
        //TODOOOOOOOO CHECK! phone number cannot be empty!!!
        for (var _i = 0, phoneNumber_1 = phoneNumber; _i < phoneNumber_1.length; _i++) {
            var c = phoneNumber_1[_i];
            //console.log("char: " + c + ", ascii: " + c.charCodeAt(0));
            if (c.charCodeAt(0) < 48 || c.charCodeAt(0) > 57) {
                alert("Phone number formatted incorrectly!");
                return;
            }
        }
        this.addTenant();
        var elem = document.getElementById("cancel-button");
        elem.click();
    };
    TenantComponent.prototype.addTenant = function () {
        var _this = this;
        var name = document.getElementById("name").value;
        var phoneNumber = document.getElementById("phone-number").value;
        var ob = {
            // key:value
            "name": name,
            "phoneNumber": phoneNumber
        };
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        this.http.post("http://127.0.0.1:10001/addtenant", JSON.stringify(ob), httpOptions).subscribe(function (data) {
        }, function (error) {
            console.error(error);
        }, function () {
            // once the new tenant is added, reload the tenant page
            console.log("response finished!!!");
            _this.getTenants();
            // reset the name and pn inputs
            var nameEle = document.getElementById("name");
            nameEle.value = nameEle.defaultValue;
            var pnEle = document.getElementById("phone-number");
            pnEle.value = pnEle.defaultValue;
        });
    };
    // TODO FIX ! 
    // remove => reload whole page, hms.html not tenant.html
    TenantComponent.prototype.removeTenant = function (id) {
        var _this = this;
        //console.log("id: " + id);
        var httpOptions = {
            headers: new http_1.HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };
        this.http.post("http://127.0.0.1:10001/removetenant", JSON.stringify(id), httpOptions).subscribe(function (data) {
        }, function (error) {
            console.error(error);
        }, function () {
            console.log("response finished");
            _this.getTenants();
        });
    };
    return TenantComponent;
}());
TenantComponent = __decorate([
    core_1.Component({
        selector: 'tenant',
        templateUrl: "./html/tenant.html",
        styleUrls: ['./css/tenant.css']
    }),
    __metadata("design:paramtypes", [http_1.HttpClient])
], TenantComponent);
exports.TenantComponent = TenantComponent;
//# sourceMappingURL=tenant.component.js.map