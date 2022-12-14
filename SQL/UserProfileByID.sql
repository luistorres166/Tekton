USE [Flow]
GO
/****** Object:  StoredProcedure [dbo].[UserProfiles_SelectById]    Script Date: 9/4/2022 11:23:08 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Luis Torres
-- Create date: 7/30/2022
-- Description: Selects a Profile by User Id.
-- Code Reviewer: Saif

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================

ALTER PROC [dbo].[UserProfiles_SelectById]
			@Id int 

AS 
/*--------------TEST CODE--------------------------

DECLARE @Id int = 24

EXECUTE [dbo].[UserProfiles_SelectById] @Id

*/--------------END TEST CODE-----------------------
BEGIN

	SELECT [Id]
		  ,[UserId]
		  ,[FirstName]
		  ,[LastName]
		  ,[MI]
		  ,[AvatarUrl]
		  ,[DateCreated]
		  ,[DateModified]
	  FROM [dbo].[UserProfiles]
	  WHERE @Id = UserId

END


