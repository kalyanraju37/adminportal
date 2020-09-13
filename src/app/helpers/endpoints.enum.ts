// export enum EndService {
//     UserLogin = "/userLogin",
//     Dashboard = "/dashboard",
//     RefCodes = "/getAllRefCodes",
//     MasterDataByType = "/getMasterDataByType/",
//     AddMasterData = "/addMasterData",
//     ResetPassword = "/resetPassword",
//     GetRefCodes = "/getRefCodes",
//     GetAuditPositions = "/getAuditPositions",
//     GetAuditPosition = "/getAuditPosition/",
//     GetPosition = "/getPosition/",
//     AddPosition = "/addPosition",
//     GetAllPositions = "/getAllPositions",
//     GetUsers = "/getUsers",
//     GetUserRoles = "/userRoles",
//     GetUserSignup = "/userSignup"
//   }

  export enum EndService {
    UserLogin = "http://localhost:9090/api/v1/users/signin",
    Dashboard = "http://localhost:9090/api/v1/positions/dashboard/",
    RefCodes = "http://localhost:9090/api/v1/refcodes/all",
    MasterDataByType = "http://localhost:9090/api/v1/refcodes/types",
    AddMasterData = "http://localhost:9090/api/v1/refcodes/",
    ResetPassword = "http://localhost:9090/api/v1/users/reset/password",
    GetRefCodes = "http://localhost:9090/api/v1/refcodes/",
    GetAuditPositions = "http://localhost:9090/api/v1/positions/audit/",
    GetAuditPosition = "http://localhost:9090/api/v1/positions/audit/",
    GetPosition = "http://localhost:9090/api/v1/positions",
    AddPosition = "http://localhost:9090/api/v1/positions/",
    GetAllPositions = "http://localhost:9090/api/v1/positions/",
    GetUsers = "http://localhost:9090/api/v1/users/",
    GetUserRoles = "http://localhost:9090/api/v1/roles/",
    GetUserSignup = "http://localhost:9090/api/v1/users/signup"
  }