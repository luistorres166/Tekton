USE [Flow]
GO
/****** Object:  StoredProcedure [dbo].[UserProfiles_Insert]    Script Date: 9/4/2022 11:21:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Luis Torres
-- Create date: 7/30/2022
-- Description: Creates a new User Profile.
-- Code Reviewer: Saif

-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================


ALTER PROC [dbo].[UserProfiles_Insert]
		    @UserId int
           ,@FirstName nvarchar(100)
           ,@LastName nvarchar(100)
           ,@MI nvarchar(2)
           ,@AvatarUrl nvarchar(255)
		   ,@Id int OUTPUT
    

AS 
/*--------------TEST CODE--------------------------

	DECLARE	@Id int = 0

	DECLARE @UserId int = 10
           ,@FirstName nvarchar(100) = 'test1'
           ,@LastName nvarchar(100) = 'test1'
           ,@MI nvarchar(2) = 'o'
           ,@AvatarUrl nvarchar(255) = 'test1'

    SELECT *
	FROM [dbo].[UserProfiles]
	
	EXECUTE [dbo].[UserProfiles_Insert]
			@UserId 
           ,@FirstName
           ,@LastName 
           ,@MI 
           ,@AvatarUrl
		   ,@Id OUTPUT
	SELECT *
	FROM [dbo].[UserProfiles]
	WHERE Id = @Id

*/--------------END TEST CODE-----------------------

BEGIN

	INSERT INTO [dbo].[UserProfiles]
           ([UserId]
           ,[FirstName]
           ,[LastName]
           ,[MI]
           ,[AvatarUrl])
     VALUES
           (@UserId 
           ,@FirstName 
           ,@LastName 
           ,@MI 
           ,@AvatarUrl) 

		SET	@Id = SCOPE_IDENTITY()
END


