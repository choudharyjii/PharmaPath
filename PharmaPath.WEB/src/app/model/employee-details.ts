import { IBaseRequest } from "../interfaces/base-request";

export class EmployeeDetails implements IBaseRequest {
    id: number = 0;
    isActive: boolean = true;
    employeeCode: string = '';
    employeeName: string = '';
    emailId: string = '';
    userName: string = '';
    password: string = '';
    companyId: number | null = null;
    divisionId: number | null = null;
    plantId: number | null = null;
    roleId: number | null = null;
    modifiedBy: number = 0;
    currentUserId: number = 0

}
export class Employee implements IBaseRequest {
    id: number = 0;
    isActive: boolean = true;
    employeeCode: string = '';
    employeeName: string = '';
    emailId: string = '';
    userName: string = '';
    password: string = '';
    companyId: number = 0;
    divisionId: number = 0;
    plantId: number = 0;
    roleId: number = 0;
    companyName: string = '';
    divisionName: string = '';
    plantName: string = '';
    roleName: string = '';
    modifiedBy: number = 0;
    currentUserId: number = 0;
    rolePermissionDetails: RolePermissionDetails[] = [];
    userRoles: UserRole[] = [];

}

export class RolePermissionDetails {
    userId: number = 0;
    userName: string = '';
    employeeName: string = '';
    roleId: number = 0;
    roleCode: string = '';
    roleName: string = '';
    permissionId: number = 0;
    permissionName: string = '';
    permissionCode: string = '';
}

export class UserRole {
    roleId: number = 0;
    role: string = '';
    roleSrCount: number = 0;
}