using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ISupplierRepository
    {
       
        Task<PagedList<SupplierDto>> GetSuppliersAsync(UserParams userParams);
        Task<int> SaveSuppliersAsync(SaveSupplierDto item);


        Task<PagedList<SupplyDto>> GetSuppliesAsync(UserParams userParams);
        Task<int> SaveSupplyAsync(SaveSupplyDto obj);

    }
}