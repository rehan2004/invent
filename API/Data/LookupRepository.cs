using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class LookupRepository : ILookupRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public LookupRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

       

        public async Task<PagedList<ItemCategoryDto>> GetItemCategoriesAsync(SearchParams searchParams)
        {
            var query = _context.ItemCategory.AsQueryable();
            return await PagedList<ItemCategoryDto>.CreateAsync(query.ProjectTo<ItemCategoryDto>(_mapper
                .ConfigurationProvider).AsNoTracking(), 
                    searchParams.PageNumber, searchParams.PageSize);
        }

       
    }
}