export class CropData {
  crop_code: string = '';
  Crop_desc: string = '';
  Cropdtl: string = '';
}

export class SatateData{
State_Code: string = '';
State_Name: string = '';
StateDetails: string = '';  
}

export class CustomerData{
customerCode: string = '';
CustomerName: string = '';
Dropcust: string = '';  
}

export class RegionData{
Region_Code: string = '';
Region_Name: string = '';
RegionDetails: string = '';  
}

export class Division{
Division: string = '';
Bu: string = '';
DivisionDetails: string = '';  
}

export class ZoneData{
Zone_Code: string = '';
Zone_Name: string = '';
zoneDetails: string = '';  
}

export class TerritoryData{
Territory_Code: string = '';
Territory_Name: string = '';
TerritoryDetails: string = '';  
}

export class Month{
  id:number=0;
  month_name='';
}

export class ProductData{
  InvoiceMaterialcode:string='';	
  Matnrdesc:string='';		
  Cropcode:string='';		
  Crop_desc:string='';	
}

export class SchemeCalculationData{
  divisionCodes:string[] = [];
  divisionCodesString:string='';
  companyCode:string = '';
  companyCodeString:string='';
  startDate:Date = new Date();
  startDateString:string=''
  endDate:Date = new Date();
  endDateString:string='';
  excludeFKART:string='';
  excludePSTYV:string[]=[];
  excludePSTYVString:string='';
  materialCodes:string[] = [];
  materialCodesString:string='';
  regions:string[]=[];
  regionsString:string='';
  zoneCodes:string[] = [];
  zoneCodesStrings=''
  excludeState:string[] = [];
  excludeStateString:string='';
  state:string[] = [];
  stateString:string='';
  territory:string[] = [];
  territorystring:string='';
  excludeRegions:string[] = [];
  excludeRegionsString:string='';
  excludeCustomer:string[] = [];
  excludeCustomerString:string='';
}

export class SchemeCalculation{
  divisionName:string='';
  zone: string='';
  zone_Name:string='';
  territory:string='';
  region:string='';
  custCode:string='';
  custName:string='';
  cust_Place:string='';
  materialCode:string='';
  materialDescription:string='';
  qtyInKG:number=0;
  noOfPkts:number=0;
  slabBenefit:number=0;
  netBenefit:number=0;
}

export class CommonModel {
    data: any = '';
    sp: string ='';
}



