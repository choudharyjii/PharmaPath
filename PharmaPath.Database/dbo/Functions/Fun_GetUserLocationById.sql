CREATE FUNCTION [dbo].[Fun_GetUserLocationById]
(
      @UserId INT
)
RETURNS NVARCHAR(25)
AS
BEGIN
	DECLARE @Location NVARCHAR(25);

	SELECT @Location = PP.PlantName FROM MasterEmployee EE
	INNER JOIN MasterPlant PP ON PP.Id = EE.PlantId
	WHERE EE.Id = @UserId
 
    RETURN @Location
END