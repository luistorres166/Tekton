using System.Collections.Generic;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.UserProfiles;

namespace Sabio.Services.Interfaces
{
    public interface IUserProfilesService
    {
        int Add(UserProfileAddRequest model, int UserId);

        UserProfile Get(int id);

        Paged<UserProfile> GetPage(int pageIndex, int pageSize);

        void Update(UserProfileUpdateRequest model, int Id);

        void Delete(int Id);
        UserProfile GetByUserId(int userId);

    }
}