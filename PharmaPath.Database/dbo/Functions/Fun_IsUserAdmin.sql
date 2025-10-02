CREATE FUNCTION [dbo].[Fun_IsUserAdmin]
(
      @UserId INT
)
RETURNS BIT
AS
BEGIN
	DECLARE @IsAdmin BIT;

	SELECT @IsAdmin = COUNT(1) FROM 
		[dbo].[MasterUserRoles]
	WHERE UserId = @UserId AND RoleId IN (1,3,4)

    RETURN @IsAdmin
END