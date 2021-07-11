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
                              CategoryName=cat.CategoryName,
                              MeasurementUnitId=a.MeasurementUnitId,
                              StoreId=a.StoreId,
                              CategoryId=a.CategoryId,
                              SupplyId=a.SupplyId,
                              Description=a.Description
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


        public async Task<int> UpdateInventoryAsync(SaveItemDto item)
        {

            //var query = _context.Items.AsQueryable();
            if (item.Id == 0)
            {
                return -1;
            }

            else
            {
                Item itm = await _context.Items.FindAsync(item.Id);
                itm.ActualQuantity = itm.ActualQuantity-item.pullQuantity;
                _context.Update(itm);
                _context.Inventories.Add(new Inventory
                {
                     ItemId= item.Id,
                     WithdrawQuantity=item.pullQuantity,
                     ActualQuantity= itm.ActualQuantity,
                     Description= item.description,

                }
                );
            }


            return await _context.SaveChangesAsync();
        }

        public async Task<int> SaveItemsAsync(SaveItemDto item)
        {

            //var query = _context.Items.AsQueryable();
            if (item.Id == 0)
            {
                _context.Items.Add(new Item
                {
                    StoreId = Convert.ToInt32(item.store),
                    ItemName = item.itemName,
                    CategoryId = Convert.ToInt32(item.category),
                    Quantity = item.quantity,
                    SerialNumber = "111-02201111",
                    ActualQuantity = item.quantity,
                    SupplyId = Convert.ToInt32(item.supply),
                    MeasurementUnitId = Convert.ToInt32(item.unit),
                    Description = item.description,
                    CreatedBy = 1,
                    IsActive = true

                });
            }

            else
            {
                Item itm=await _context.Items.FindAsync(item.Id);
                itm.ItemName = item.itemName;

                itm.Quantity = item.quantity;

                itm.Quantity = item.quantity;
                itm.ActualQuantity = item.quantity;
                itm.SupplyId = Convert.ToInt32(item.supply);
                itm.MeasurementUnitId = Convert.ToInt32(item.unit);

                itm.CategoryId = Convert.ToInt32(item.categoryId);
                itm.Description = item.description;
                   
                _context.Update(itm);
            }


            return await _context.SaveChangesAsync();
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