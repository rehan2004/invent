using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository {get; }
        IItemRepository ItemRepository { get; }
        ISupplierRepository SupplierRepository { get; }
        IStoreRepository StoreRepository { get; }
        ILookupRepository LookupRepository { get; }
        IMessageRepository MessageRepository {get;}
        ILikesRepository LikesRepository {get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}