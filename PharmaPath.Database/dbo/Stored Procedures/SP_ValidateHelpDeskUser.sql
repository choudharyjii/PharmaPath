CREATE PROCEDURE dbo.usp_ValidateAuthenticateUser
(
    @EmailId NVARCHAR(50),
    @Password NVARCHAR(50)
)
AS
BEGIN
    SELECT *
    FROM [dbo].[AutheticateUser]
    WHERE IsActive = 1
      AND EmailId = @EmailId
      AND Password = @Password;
END
