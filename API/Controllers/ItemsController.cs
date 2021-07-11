using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class ItemsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public ItemsController(IUnitOfWork unitOfWork, IMapper mapper,
            IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
        }

        [HttpGet("items")]
        public async Task<ActionResult<IEnumerable<ItemDto>>> GetItems([FromQuery] UserParams userParams)
        {
            //var gender = await _unitOfWork.ItemRepository.GetItemsAsync(User.GetUsername());
            //userParams.CurrentUsername = User.GetUsername();

            //if (string.IsNullOrEmpty(userParams.Gender))
            //    userParams.Gender = gender == "male" ? "female" : "male";

            var users = await _unitOfWork.ItemRepository.GetItemsAsync(userParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages);

            return Ok(users);
        }

        [HttpPost("saveitem")]
        public async Task<ActionResult<int>> SaveItem(SaveItemDto newItem)
        {
            var query = await _unitOfWork.ItemRepository.SaveItemsAsync(newItem);
            return Ok(query);
        }


        [HttpPost("updateinventory")]
        public async Task<ActionResult<int>> UpdateInventory(SaveItemDto newItem)
        {
            var query = await _unitOfWork.ItemRepository.UpdateInventoryAsync(newItem);
            return Ok(query);
        }


    }
}