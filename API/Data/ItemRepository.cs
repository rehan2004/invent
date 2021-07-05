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
    public class ItemRepository : IItemRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ItemRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

       

        public async Task<PagedList<ItemDto>> GetItemsAsync(UserParams userParams)
        {
            //var query = _context.Items.AsQueryable();

            var query = (from a in _context.Items
                          join b in _context.MeasurementUnits on a.MeasurementUnitId equals b.Id 
                          join c in _context.Stores on a.StoreId equals c.StoreId
                          join cat in _context.ItemCategory on a.CategoryId equals cat.Id                         
                         select new ItemDto
                          {
                              Id=a.Id,
                              ItemName= a.ItemName,
                              BrandName= a.BrandName,
                              Quantity= a.Quantity,
                              ActualQuantity=a.ActualQuantity,
                              MeasurementUnit= b.Unit,
                              StoreName= c.StoreName,
                              CategoryName=cat.CategoryName
                             
                          }).Distinct();

            //query = query.Where(u => u.UserName != userParams.CurrentUsername);
            //query = query.Where(u => u.Gender == userParams.Gender);

            //var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            //var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

            //query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            //query = userParams.OrderBy switch
            //{
            //    "created" => query.OrderByDescending(u => u.Created),
            //    _ => query.OrderByDescending(u => u.LastActive)
            //};

            return await PagedList<ItemDto>.CreateAsync(query.ProjectTo<ItemDto>(_mapper
                .ConfigurationProvider).AsNoTracking(), 
                    userParams.PageNumber, userParams.PageSize);
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<string> GetUserGender(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .Select(x => x.Gender).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.Photos)
                .ToListAsync();
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}