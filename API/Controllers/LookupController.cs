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
    public class LookupController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        public LookupController(IUnitOfWork unitOfWork, IMapper mapper,
            IPhotoService photoService)
        {
            _unitOfWork = unitOfWork;
            _photoService = photoService;
            _mapper = mapper;
        }

       
        [HttpGet("category")]
        public async Task<ActionResult<IEnumerable<ItemCategoryDto>>> GetCategory([FromQuery] SearchParams searchParams)
        {
            var results = await _unitOfWork.LookupRepository.GetItemCategoriesAsync(searchParams);
            Response.AddPaginationHeader(results.CurrentPage, results.PageSize,
                results.TotalCount, results.TotalPages);           
            return Ok(results);
        }

        [HttpGet("measurementunit")]
        public async Task<ActionResult<IEnumerable<MeasurementUnit>>> GetMeasurementUnit([FromQuery] SearchParams searchParams)
        {
            var results = await _unitOfWork.LookupRepository.GetMeasurementUnitAsync(searchParams);

            Response.AddPaginationHeader(results.CurrentPage, results.PageSize,
                results.TotalCount, results.TotalPages);

            return Ok(results);
        }

        [HttpGet("supply")]
        public async Task<ActionResult<IEnumerable<MeasurementUnit>>> GetSupply([FromQuery] SearchParams searchParams)
        {
            var results = await _unitOfWork.LookupRepository.GetSupplyAsync(searchParams);

            Response.AddPaginationHeader(results.CurrentPage, results.PageSize,
                results.TotalCount, results.TotalPages);

            return Ok(results);
        }


    }
}