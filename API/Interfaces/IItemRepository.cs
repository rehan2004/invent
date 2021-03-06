using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IItemRepository
    {
        //void Update(AppUser user);
        //Task<IEnumerable<AppUser>> GetUsersAsync();
        //Task<AppUser> GetUserByIdAsync(int id);
        //Task<AppUser> GetUserByUsernameAsync(string username);
        Task<PagedList<ItemDto>> GetItemsAsync(UserParams userParams);
        Task<PagedList<InventoryDto>> GetItemInventoryAsync(SearchParams searchParams);
        
        Task<int> SaveItemsAsync(SaveItemDto item);
        Task<int> UpdateInventoryAsync(SaveItemDto item);
     
    }
}