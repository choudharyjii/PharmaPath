CREATE TABLE [dbo].[AutheticateUser]
(
	Id int IDENTITY(1,1) NOT NULL,
	UserName varchar(100) NULL,
	UserCode varchar(50) NULL,
	EmailId varchar(50) NULL,
	Location varchar(200) NOT NULL,
	Password varchar(50) NULL,
	CreatedBy varchar(50) NOT NULL,
	CreatedOn datetime NOT NULL,
	UpdatedBy varchar(50) NOT NULL,
	UpdatedOn datetime NOT NULL,
	IsActive bit NOT NULL, 
    CONSTRAINT [PK_AutheticateUser] PRIMARY KEY ([Id]),
)
