using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILookupRepository
    {
       
        Task<PagedList<ItemCategoryDto>> GetItemCategoriesAsync(SearchParams searchParams);
        Task<PagedList<MeasurementUnit>> GetMeasurementUnitAsync(SearchParams searchParams);
        Task<PagedList<Supply>> GetSupplyAsync(SearchParams searchParams);

    }
}