USE [Flow]
GO
/****** Object:  StoredProcedure [dbo].[UserProfiles_Update]    Script Date: 9/4/2022 11:28:24 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Luis Torres
-- Create date: 7/30/2022
-- Description: Update User Profile.
-- Code Reviewer: Saif

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


ALTER PROC [dbo].[UserProfiles_Update]
			@Id int
			,@UserId int
			,@FirstName nvarchar(100)
			,@LastName nvarchar(100)
			,@MI nvarchar(2)
			,@AvatarUrl nvarchar(255)
AS 
/*--------------TEST CODE--------------------------

	DECLARE @Id int = 19
			,@UserId int = 93
			,@FirstName nvarchar(100) = 'Roger'
			,@LastName nvarchar(100) = 'Griffen'
			,@MI nvarchar(2) = 'R'
			,@AvatarUrl nvarchar(255) = 'something.com'

	EXECUTE [dbo].[UserProfiles_Update]
			@Id
			,@UserId
			,@FirstName
			,@LastName 
			,@MI 
			,@AvatarUrl
		  
	SELECT *
	FROM [dbo].[UserProfiles]
	WHERE @Id = Id

*/--------------END TEST CODE-----------------------

BEGIN
	DECLARE	@NewDate datetime2(7) = GETUTCDATE()	

	 UPDATE	[dbo].[UserProfiles]
		SET	[UserId] = @UserId
			,[FirstName] = @FirstName
           ,[LastName] = @LastName 
           ,[MI] = @MI 
           ,[AvatarUrl] = @AvatarUrl
		   ,[DateModified] = @NewDate

	WHERE	@Id = Id
	
END


