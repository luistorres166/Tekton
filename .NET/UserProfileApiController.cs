﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.UserProfiles;
using Sabio.Services;
using Sabio.Services.Interfaces;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/userprofiles")]
    [ApiController]
    public class UserProfileApiController : BaseApiController
    {
        private IAuthenticationService<int> _authService = null;
        private IUserProfilesService _service = null;
        public UserProfileApiController(IUserProfilesService service
            , ILogger<UserProfileApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(UserProfileAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpGet("userid")]
        public ActionResult<ItemResponse<UserProfile>> GetById()
        {
            int iCode = 200;
            BaseResponse response = null;
            int userId = _authService.GetCurrentUserId();
            try
            {
                UserProfile userProfile = _service.Get(userId);

                if (userProfile == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Resource not found");
                }
                {
                    response = new ItemResponse<UserProfile> { Item = userProfile };
                }

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Errors:{ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<UserProfile>>> GetPage(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<UserProfile> page = _service.GetPage(pageIndex, pageSize);

                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<UserProfile>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }


            return StatusCode(code, response);

        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(UserProfileUpdateRequest model)
        {
          
          
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);
                response = new SuccessResponse();
           }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.Delete(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet("user/{userId:int}")]
        public ActionResult<ItemResponse<UserProfile>> GetByUserId(int userId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                UserProfile userProfile = _service.GetByUserId(userId);

                if (userProfile == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Resource not found");
                }
                {
                    response = new ItemResponse<UserProfile> { Item = userProfile };
                }

            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Errors:{ex.Message}");
            }
            return StatusCode(iCode, response);
        }
    }
}
