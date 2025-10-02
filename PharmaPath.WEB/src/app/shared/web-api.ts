export class WebApi {

  // static apiBaseUrl = window.location.origin;
  static apiBaseUrl = 'https://localhost:7139';
  // static apiBaseUrl = 'http://localhost:5139';
  static apimaapackhousenxgUrl = 'https://maapackhousenxg.mahyco.com/';

  static getDropDownOptionListApi(type:string): string {
    return this.apiBaseUrl + "/api/"+ type +"/list";
  }

  // Employee
  static get getEmployeeByUserMailIdApi(): string {
    return this.apiBaseUrl + "/api/User/UserMailId";
  }

  //Permission && authenticate
  static get authenticateUserApi(): string {
    return this.apiBaseUrl + "/api/User/authenticate";
  }

  //Scheme Calculation 
    static get getCommonDDLListApi(): string {
    return this.apiBaseUrl + "/api/SchemeCalculation";
  }

    static get getCommonSearchddlListApi(): string {
    return this.apiBaseUrl + "/api/SchemeCalculation/search";
  }

  // static get DataJsonAndSPApi(): string {
  //   return this.apiBaseUrl + "/api/";
  // }

   static DataJsonAndSPApi(type:string): string {
    return this.apiBaseUrl + "/api/"+ type;
  }


}
