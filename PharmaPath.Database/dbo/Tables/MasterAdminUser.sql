CREATE TABLE [DLR].[MasterAdminUser]
(
	Id INT NOT NULL PRIMARY KEY IDENTITY,
	UserCode varchar(50) NOT NULL,
	FullName varchar(150) NOT NULL,
	IsActive bit NOT NULL,
)
