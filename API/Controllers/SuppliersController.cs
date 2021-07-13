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
    public class SuppliersController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public SuppliersController(IUnitOfWork unitOfWork, IMapper mapper,
            IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
        }

        [HttpGet("suppliers")]
        public async Task<ActionResult<IEnumerable<SupplierDto>>> GetSuppliers([FromQuery] UserParams userParams)
        {
            //var gender = await _unitOfWork.SupplierRepository.GetSuppliersAsync(User.GetUsername());
            //userParams.CurrentUsername = User.GetUsername();

            //if (string.IsNullOrEmpty(userParams.Gender))
            //    userParams.Gender = gender == "male" ? "female" : "male";

            var query = await _unitOfWork.SupplierRepository.GetSuppliersAsync(userParams);

            Response.AddPaginationHeader(query.CurrentPage, query.PageSize,
                query.TotalCount, query.TotalPages);

            return Ok(query);
        }

        [HttpPost("savesupplier")]
        public async Task<ActionResult<int>> SaveSupplier(SaveSupplierDto newSupplier)
        {
            var query = await _unitOfWork.SupplierRepository.SaveSuppliersAsync(newSupplier);
            return Ok(query);
        }


       
    }
}