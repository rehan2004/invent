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
    public class SupplierRepository : ISupplierRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SupplierRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

       

        public async Task<PagedList<SupplierDto>> GetSuppliersAsync(UserParams userParams)
        {
            //var query = _context.Suppliers.AsQueryable();
            var query = (from a in _context.Supplier
                        
                        // join c in _context.Stores on a.StoreId equals c.StoreId
                         join cat in _context.SupplierCategory on a.CategoryId equals cat.Id
                         select new SupplierDto
                         {
                             Id = a.Id,
                             SupplierName = a.SupplierName,
                           
                             Description = a.Description
                         }).Distinct().AsQueryable();

                
            // if (userParams.SupplierName!=null)
            //query = query.Where((m => m.SupplierName.Contains(userParams.SupplierName)));

            return await PagedList<SupplierDto>.CreateAsync(query.ProjectTo<SupplierDto>(_mapper
                .ConfigurationProvider).AsNoTracking(), 
                    userParams.PageNumber, userParams.PageSize);
        }

        
        public async Task<int> SaveSuppliersAsync(SaveSupplierDto supplier)
        {

            //var query = _context.Suppliers.AsQueryable();
            if (supplier.Id == 0)
            {
                _context.Supplier.Add(new Supplier
                {
                    SupplierName= supplier.SupplierName,
                   

                });
            }

            else
            {
                Supplier sup=await _context.Supplier.FindAsync(supplier.Id);
                sup.SupplierName = supplier.SupplierName;

                _context.Update(sup);
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