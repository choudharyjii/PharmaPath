CREATE TABLE [dbo].[AutheticateUser]
(
	Id int IDENTITY(1,1) NOT NULL,
	UserName varchar(100) NULL,
	UserCode varchar(50) NULL,
	EmailId varchar(50) NULL,
	Location varchar(200) NOT NULL,
	Password varchar(50) NULL,
	CreatedBy varchar(50) NULL,
	CreatedOn datetime NULL DEFAULT GetDate(),
	UpdatedBy varchar(50) NULL,
	UpdatedOn datetime NULL,
	IsActive bit NOT NULL DEFAULT ((1)), 
    CONSTRAINT [PK_AutheticateUser] PRIMARY KEY ([Id]),
)
