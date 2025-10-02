import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WebApi } from '../shared/web-api';
import { IDropDownOption } from '../interfaces/drop-down-option';
import { EmployeeDetails } from '../model/employee-details';
import { LoginRequest } from '../model/login-request';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../common/confirm-dialog/confirm-dialog.component';
import { CommonModel, SchemeCalculation, SchemeCalculationData } from '../model/Scheme-Calculation-ddl';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  imgPath = 'assets/images/';
  dummyDataUrl = '../../assets/data/data.json';
  URL = '';
  title = new BehaviorSubject<any>({});
  isLoginPage = true;
  isLoading = new Subject<boolean>();
  headers = new HttpHeaders();
  hiddenSideBar: boolean = true;
  constructor(private snackBar: MatSnackBar
    , private http: HttpClient, public dialog: MatDialog) {
    this.headers = this.headers.append('content-type', 'application/json');
    this.headers = this.headers.append('authorization','Bearer ' + localStorage.getItem('accessToken'));
  }

  //menu on data json file
  getAPICall(url?: string): Observable<object> {
    return this.http.get(this.dummyDataUrl);
  }

  authenticateUser(loginRequest: LoginRequest): Observable<any> {
    return this.http.post<any>(WebApi.authenticateUserApi, loginRequest);
  }

  //Drop Down
  getDropDownOptionList(item:string): Observable<any> {
    return this.http.get<IDropDownOption[]>(WebApi.getDropDownOptionListApi(item));
  }
  getDropDownOptionListById(item:string, id : string): Observable<any> {
    return this.http.get<IDropDownOption[]>(WebApi.getDropDownOptionListApi(item) + '/' + id);
  }
  getDropDownOptionStringListById(item:string, id : string): Observable<any> {
    return this.http.get<string[]>(WebApi.getDropDownOptionListApi(item) + '/' + id);
  }
  
  //Employee
  getEmployeeDetailsByUserMailId(userCode: string): Observable<any> {
    return this.http.get<EmployeeDetails>(WebApi.getEmployeeByUserMailIdApi + '/' + userCode);
  }  
   getCropListByuserCode(item:string, id : string): Observable<any> {
    return this.http.get<string>(WebApi.getDropDownOptionListApi(item) + '/' + id);
  }

  //Scheme Calculation 
  getCommonDDLList(spName: string): Observable<any> {
    return this.http.get<any>(WebApi.getCommonDDLListApi + '?' + 'spName' + '=' + spName);
  }

   getCommonSearchddlList(spName: string,code : string): Observable<any> {
    return this.http.get<any>(WebApi.getCommonSearchddlListApi + '?' + 'spName' + '=' + spName + '&' + 'code' + '=' + code);
  }

  //  getSchemeCalculationData(schemeCalculationData: SchemeCalculationData): Observable<SchemeCalculation[]> {
  //   return this.http.post<SchemeCalculation[]>(WebApi.getSchemeCalculationDataApi, schemeCalculationData);
  // }

  getSchemeCalculationData(item:string, value :CommonModel): Observable<any> {
    return this.http.post<any>(WebApi.DataJsonAndSPApi(item), value);
  }

  toggleMenu() {
    // document.getElementsByClassName('app-container')[0].classList.toggle("closed-sidebar");
    // document.getElementsByClassName('app-container')[0].classList.toggle("sidebar-mobile-open");
    // document.getElementsByClassName('hamburger ')[0].classList.toggle("is-active");
  }

  showError(message: string) {
    this.snackBar.open(message, "Dismiss", {
      panelClass: ['snackbar-error', 'mt-40px', 'centered-snackbar'],
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, "Dismiss", {
      panelClass: "snackbar-success",
      duration: 3000,
    });
  }
  showSuccessWithDelay(message: string, duration: number) {
    this.snackBar.open(message, "Dismiss", {
      panelClass: "snackbar-success",
      duration: duration,
    });

  }

  showWarning(message: string) {
    this.snackBar.open(message, "Dismiss", {
      panelClass: "snackbar-warning",
    });
  }

  showNotification(message: string) {
    this.snackBar.open(message, "X", {
      panelClass: ['snackbar-info', 'mt-40px'],
      horizontalPosition: "right",
      verticalPosition: "top",
      duration: 4000
    });
  }

  showInfo(message: string) {
    this.snackBar.open(message, "Dismiss", {
      panelClass: "snackbar-info",
    });
  }

  getCurrentUserId() {
    return 2;
  }

  showConfirmMassage(Massage : any): Observable<any>{
   var dialogRef = this.dialog.open(ConfirmDialogComponent,
    {
      data: {
        btnShow : true,
        massage : Massage
      },
      maxWidth: '50vh',
    });
   return  dialogRef.afterClosed();
  }

  showBusySpinner() {
    this.isLoading.next(true);
  }

  hideBusySpinner() {
    this.isLoading.next(false);
  }

  showWarningBox(massage: string){
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        data: {
          btnShow : false,
          massage : massage
        }
      });
         return  dialogRef.afterClosed();
    }

    getErrorHandlerMassage(Response: HttpErrorResponse) {
      if (Response.error && Response.status != 0) {
        this.showError(Response.error);
      }
      else {
        switch (Response.status) {
          case 400:
            return this.showError('Invalid request syntax.');
            break;
          case 401:
            return this.showError('Authentication required.');
            break;
          case 403:
            return this.showError('Access denied.');
            break;
          case 404:
            return this.showError('Resource not found.');
            break;
          case 405:
            return this.showError('HTTP method not allowed.');
            break;
          case 408:
            return this.showError('Request timed out.');
            break;
          case 429:
            return this.showError('Too many requests, please try again later.');
            break;
          case 500:
            return this.showError('Server encountered an error.');
            break;
          case 502:
            return this.showError('Invalid response from upstream server.');
            break;
          case 503:
            return this.showError('Service temporarily unavailable.');
            break;
          case 504:
            return this.showError('Upstream server timed out.');
            break;
          default:
          return this.showError('Unknown Error');
          break
        }
      }
    }

    truncateDescription(text: string, maxLength: number): any {
    if(text){
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  }
  }

}
