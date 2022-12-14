USE [Flow]
GO
/****** Object:  StoredProcedure [dbo].[UserProfiles_SelectAllPaginated]    Script Date: 9/4/2022 11:25:33 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Luis Torres
-- Create date: 7/30/2022
-- Description: Selects all UserProfiles paginated .
-- Code Reviewer: Saif

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[UserProfiles_SelectAllPaginated]
			@PageIndex int
			,@PageSize int
		

AS 
/*--------------TEST CODE--------------------------

	DECLARE @PageSize int = 15
			,@PageIndex int = 0
		

	EXECUTE [dbo].[UserProfiles_SelectAllPaginated] @PageIndex, @PageSize

*/--------------END TEST CODE-----------------------

BEGIN

	DECLARE @Offset int = @PageIndex * @PageSize

	SELECT [Id]
		  ,[UserId]
		  ,[FirstName]
		  ,[LastName]
		  ,[MI]
		  ,[AvatarUrl]
		  ,[DateCreated]
		  ,[DateModified]
		  ,TotalCount = COUNT (1) OVER()
	FROM [dbo].[UserProfiles]

	ORDER BY Id
		OFFSET @OffSet Rows
		Fetch Next @PageSize Rows ONLY

END


