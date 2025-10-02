export enum AuthenticationTypeEnum {
  UsernameAndPassword,
  SingleSignOn
}

export enum MasterRoleEnum {
  'Admin' = 1,
  'User'
}

export enum UserRoleEnum {
  Distributor = 1,
  TBM,
  RBM,
  ZBM,
  NBM,
  AccountAdmin,
  BU,
  Treasury,
  FDB,
  SD,
  Admin = 100,
  ZMM = 101
}

export enum ActivityPlaningStatusEnum {
  Draft = 0,
  Submit = 1,
  RBMApproved = 2,
  RBMCancel = 3
}

export enum SchemeType{
  Pkt=0,
  Qty=1,
  Flat=2,
  Hidden=3,
  Growth=4
}
