import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropDownOption } from 'src/app/interfaces/drop-down-option';
import { CommonModel, CropData, CustomerData, Division, ProductData, RegionData, SatateData, SchemeCalculation, SchemeCalculationData, TerritoryData, ZoneData } from 'src/app/model/Scheme-Calculation-ddl';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { SchemeType } from 'src/app/shared/common-enums';
import { EnumHelper } from 'src/app/shared/enum-helpers';
import * as XLSX from 'xlsx-js-style';

@Component({
  selector: 'app-scheme-calculation',
  imports: [ReactiveFormsModule, FormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, MatOptionModule, CommonModule, MatButtonModule],
  templateUrl: './scheme-calculation.component.html',
  styleUrl: './scheme-calculation.component.scss'
})
export class SchemeCalculationComponent {

  commonModel: CommonModel = new CommonModel();
  dataSource = new MatTableDataSource<SchemeCalculation>();
  schemeCalculationData:SchemeCalculationData = new SchemeCalculationData();
  schemeType: IDropDownOption[] = EnumHelper.getNamesAndValues(SchemeType);
  itemCategoryExcludeValue: string[] = ['RENN,TANN,ZANN,ZDM,ZFGV,ZRAC,ZRFG,ZTAC'];
  bilingTypeExculde: string = 'ZDS';
  companycode: string = '1000';
  distribution_chanel = '01';
  cropNameList: CropData[] = [];
  ProductNameList: ProductData[] = [];
  StateNameList: SatateData[] = []
  CustomerNameList: CustomerData[] = [];
  RegionList: RegionData[] = [];
  DivisionNameList: Division[] = [];
  ZoneNameList: ZoneData[] = [];
  TerritoryList:TerritoryData[] = [];
  cropSpName: string = 'FSC.Sp_CropNamesdtl';
  stateSpName: string = 'FSC.Sp_state_name';
  CustomerSpName: string = 'FSC.sp_Customerdtl';
  RegionSpName: string = 'FSC.Sp_regiondtl';
  DivisionSpName: string = 'FSC.sp_DevisionDtl';
  ZoneSpName: string = 'FSC.sp_Zone_dtls';
  productSpName: string = 'FSC.sp_cropdetails';
  territorySpName : string = 'FSC.Sp_territorydtl';

  constructor(private route: ActivatedRoute, private common: CommonService, private router: Router, private authService: AuthService) {
    this.common.title.next({ title: 'Scheme Calculation', icon: 'fa-tachometer-alt' })
  }

  ngOnInit(): void {
    this.schemeCalculationData.companyCode = this.companycode;
    this.schemeCalculationData.excludePSTYV = this.itemCategoryExcludeValue;
    this.getSchemeCalculationDDL();
  }

  getSchemeCalculationDDL() {
    this.common.getCommonDDLList(this.cropSpName).subscribe(res => {
      this.cropNameList = JSON.parse(res.trim()) as CropData[];
    });
    this.common.getCommonDDLList(this.productSpName).subscribe(res => {
      this.ProductNameList = JSON.parse(res.trim()) as ProductData[];
    });
    this.common.getCommonDDLList(this.CustomerSpName).subscribe(res => {
      this.CustomerNameList = JSON.parse(res.trim()) as CustomerData[];
    });
    this.common.getCommonDDLList(this.DivisionSpName).subscribe(res => {
      this.DivisionNameList = JSON.parse(res.trim()) as Division[];
    });
    this.common.getCommonDDLList(this.ZoneSpName).subscribe(res => {
      this.ZoneNameList = JSON.parse(res.trim()) as ZoneData[];
    });
  }

  getSchemeCalculationData(isValid: any) {
    if (isValid) {
      this.dataSource.data = [];
      if (this.schemeCalculationData.startDate) {
        this.schemeCalculationData.startDate = new Date(Date.parse(new Date(this.schemeCalculationData.startDate.toString()).toUTCString()));
        this.schemeCalculationData.startDate.setHours(12);
      }
      if (this.schemeCalculationData.endDate) {
        this.schemeCalculationData.endDate = new Date(Date.parse(new Date(this.schemeCalculationData.endDate.toString()).toUTCString()));
        this.schemeCalculationData.endDate.setHours(12);
      }
       const searchSchemeCalculationBackendData = {
      divisionCodesString: this.schemeCalculationData.divisionCodes ? this.schemeCalculationData.divisionCodes.join(',') : '',
      companyCodeString:this.schemeCalculationData.companyCode,

      excludePSTYV: this.schemeCalculationData.excludePSTYV ? this.schemeCalculationData.excludePSTYV.join(',') : '',
      materialCodesString: this.schemeCalculationData.materialCodes ? this.schemeCalculationData.materialCodes.join(',') : '',
      regionsString: this.schemeCalculationData.regions ? this.schemeCalculationData.regions.join(',') : '',
      zoneCodesStrings: this.schemeCalculationData.zoneCodes ? this.schemeCalculationData.zoneCodes.join(',') : '',
      excludeStateString: this.schemeCalculationData.excludeState ? this.schemeCalculationData.excludeState.join(',') : '',
      stateString: this.schemeCalculationData.state ? this.schemeCalculationData.state.join(',') : '',
      excludeFKARTTable:this.schemeCalculationData.excludeFKART,
      excludeRegionsString: this.schemeCalculationData.excludeRegions ? this.schemeCalculationData.excludeRegions.join(',') : '',
      excludeCustomerString: this.schemeCalculationData.excludeCustomer ? this.schemeCalculationData.excludeCustomer.join(',') : '',
      startDateString: this.schemeCalculationData.startDate ? this.formatDate(this.schemeCalculationData.startDate) : '',
      endDateString: this.schemeCalculationData.endDate ? this.formatDate(this.schemeCalculationData.endDate) : '',
    };

       this.commonModel.data = searchSchemeCalculationBackendData;
      this.commonModel.sp = 'FSC.Sp_GetCustomerInvoiceDataUpdated_PI';
      this.common.getSchemeCalculationData('SchemeCalculation/DataJsonAndSP',this.commonModel).subscribe(res => {
        this.dataSource.data = JSON.parse(res);
        if (res.length == 0) {
          this.common.showWarningBox("Record not found");
        }else {
        this.exportToExcel();
      }
       setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 300);
      });
    }
    else {
      this.common.showWarningBox("Please select all required field");
    }
  }

  onZoneChange(selectedZones: string[]) {
  const zoneCodes = selectedZones.join(','); 
  this.common.getCommonSearchddlList(this.stateSpName, zoneCodes).subscribe(res => {
    this.StateNameList = JSON.parse(res.trim());
  });
}

onStateChange(selectedStates: string[]) {
  if (selectedStates.includes('All')) {
    this.schemeCalculationData.state = this.StateNameList.map(item => item.State_Code);
  } else {
    this.schemeCalculationData.state = selectedStates;
  }

  const stateCodes = this.schemeCalculationData.state.join(',');
  this.common.getCommonSearchddlList(this.RegionSpName, stateCodes).subscribe(res => {
    this.RegionList = JSON.parse(res);
  });
}


onTerritoryChange(selectedTerritory:string[]){
  const TerritoryCodes = selectedTerritory.join(','); 
  this.common.getCommonSearchddlList(this.territorySpName, TerritoryCodes).subscribe(res => {
    this.TerritoryList = JSON.parse(res.trim());
  });
}

exportToExcel(): void {
  const data = this.dataSource.filteredData.map(item => ({
    Division: item.divisionName,
    Zone: item.zone,
    Zone_Name: item.zone_Name,
    Territory: item.territory,
    Region: item.region,
    CustomerCode: item.custCode,
    CustomerName: item.custName,
    CustomerPlace: item.cust_Place,
    MaterialCode: item.materialCode,
    MaterialDescription: item.materialDescription,
    QuantityKG: item.qtyInKG,
    NoOfPackets: item.noOfPkts,
    SlabBenefit: item.slabBenefit,
    NetBenefit: item.netBenefit
  }));

  data.push({
    Division: '',
    Zone: '',
    Zone_Name: '',
    Territory: '',
    Region: '',
    CustomerCode: '',
    CustomerName: '',
    CustomerPlace: '',
    MaterialCode: '',
    MaterialDescription: '',
    QuantityKG:  0,
    NoOfPackets: 0,
    SlabBenefit: 0,
    NetBenefit:  0
  });

  const header = [
    'Division', 'Zone', 'Zone Name', 'Territory', 'Region',
    'Customer Code', 'Customer Name', 'Customer Place',
    'Material Code', 'Material Description',
    'Qty (KG)', 'No. of Packets', 'Slab Benefit', 'Net Benefit'
  ];

  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, [header], { origin: 'A1' });
  XLSX.utils.sheet_add_json(ws, data, { origin: 'A2', skipHeader: true });

  header.forEach((_, colIdx) => {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIdx });
    const cell = ws[cellAddress];
    if (cell) {
      cell.s = {
        fill: { pattern: 'solid', fgColor: { rgb: 'FFFF00' } },
        font: { bold: true },
        border: {
          top: { style: 'thin', color: { rgb: '000000' } },
          bottom: { style: 'thin', color: { rgb: '000000' } },
          left: { style: 'thin', color: { rgb: '000000' } },
          right: { style: 'thin', color: { rgb: '000000' } }
        }
      };
    }
  });

  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'SchemeCalculation');

  XLSX.writeFile(wb, 'Scheme_Calculation.xlsx');
}

formatDate(date: Date): string {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


}