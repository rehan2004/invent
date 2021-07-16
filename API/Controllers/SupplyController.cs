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
    public class SupplyController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public SupplyController(IUnitOfWork unitOfWork, IMapper mapper,
            IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
        }

        [HttpGet("supplies")]
        public async Task<ActionResult<IEnumerable<SupplyDto>>> GetSupplies([FromQuery] UserParams userParams)
        {
            var query = await _unitOfWork.SupplierRepository.GetSuppliesAsync(userParams);

            Response.AddPaginationHeader(query.CurrentPage, query.PageSize,
                query.TotalCount, query.TotalPages);

            return Ok(query);
        }

        [HttpPost("savesupply")]
        public async Task<ActionResult<int>> SaveSupply(SaveSupplyDto objSupply)
        {
            var query = await _unitOfWork.SupplierRepository.SaveSupplyAsync(objSupply);
            return Ok(query);
        }


       
    }
}