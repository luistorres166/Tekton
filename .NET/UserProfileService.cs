using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.UserProfiles;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class UserProfileService : IUserProfilesService
    {
        IDataProvider _data = null;
        public UserProfileService(IDataProvider data)
        {
            _data = data;
        }
        public int Add(UserProfileAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[UserProfiles_Insert]";

            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {

                    AddCommonParams(model, col, userId);
                    

                    SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);

                },
                returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@Id"].Value;

                    int.TryParse(oId.ToString(), out id);

                });

            return id;
        }
        public UserProfile Get(int id)
        {

            string procName = "[dbo].[UserProfiles_SelectById]";

            UserProfile userProfile = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@Id", id);


            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                userProfile = MapSingleUser(reader, ref startingIndex);
            }
            );

            return userProfile;
        }
        public Paged<UserProfile> GetPage(int pageIndex, int pageSize)
        {
            Paged<UserProfile> pagedList = null;
            List<UserProfile> results = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[UserProfiles_SelectAllPaginated]",
                delegate (SqlParameterCollection param)
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);

                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    UserProfile userProfile = MapSingleUser(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (results == null)
                    {
                        results = new List<UserProfile>();
                    }
                    results.Add(userProfile);
                });
            if (results != null)
            {
                pagedList = new Paged<UserProfile>(results, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public void Update(UserProfileUpdateRequest model, int userId)
        {
            string procName = "[dbo].[UserProfiles_Update]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    AddCommonParams(model, col, userId);
                    col.AddWithValue("@Id", model.Id);
                },
                returnParameters: null);
        }
        public void Delete(int Id)
        {
            string procName = "[dbo].[UserProfiles_DeleteById]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", Id);
                });
        }

        public UserProfile GetByUserId(int userId)
        {

            string procName = "[dbo].[UserProfiles_SelectByUserId]";

            UserProfile userProfile = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection paramCollection)
            {

                paramCollection.AddWithValue("@UserId", userId);


            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                userProfile = MapSingleUser(reader, ref startingIndex);
            }
            );

            return userProfile;
        }
        private static UserProfile MapSingleUser(IDataReader reader, ref int startingIndex)
        {
            UserProfile uProfile = new UserProfile();

            uProfile.Id = reader.GetSafeInt32(startingIndex++);
            uProfile.UserId = reader.GetSafeInt32(startingIndex++);
            uProfile.FirstName = reader.GetSafeString(startingIndex++);
            uProfile.LastName = reader.GetSafeString(startingIndex++);
            uProfile.MI = reader.GetSafeString(startingIndex++);
            uProfile.AvatarUrl= reader.GetSafeString(startingIndex++);
            uProfile.DateCreated = reader.GetSafeDateTime(startingIndex++);
            uProfile.DateModified = reader.GetSafeDateTime(startingIndex++);

            return uProfile;
        }
        private static void AddCommonParams(UserProfileAddRequest model, SqlParameterCollection col,int userId)
        {
            col.AddWithValue("@FirstName", model.FirstName);
            col.AddWithValue("@LastName", model.LastName);
            col.AddWithValue("@MI", model.MI);
            col.AddWithValue("@AvatarUrl", model.AvatarUrl);
            col.AddWithValue("@UserId", userId);
        }
    }
}
