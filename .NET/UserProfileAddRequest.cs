using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.UserProfiles
{
    public class UserProfileAddRequest
    {
        [StringLength(100)]
        public string FirstName { get; set; }

        [StringLength(100)]
        public string LastName { get; set; }

        [StringLength(2)]
        public string MI { get; set; }

        [StringLength(255)]
        public string AvatarUrl { get; set; }

    }
}
