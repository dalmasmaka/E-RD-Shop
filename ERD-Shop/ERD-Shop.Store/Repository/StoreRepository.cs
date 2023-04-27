using AutoMapper;
using ERD_Shop.Store.Models;
using ERD_Shop.Store.Models.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ERD_Shop.Store.Repository
{
    public class StoreRepository : IStoreRepository
    {
        private readonly StoreContext _context;
        private IMapper _mapper;
        public StoreRepository(StoreContext context, IMapper mapper)
        {
            _context= context;
            _mapper= mapper;
        }
        public async Task<StoreDto> CreateUpdateStore(StoreDto storeDto)
        {
            Stores store = _mapper.Map<StoreDto, Stores>(storeDto);
            if (store.StoreId > 0)
            {
                _context.Stores.Update(store);
            }
            else
            {
                _context.Stores.Add(store);
            }
            await _context.SaveChangesAsync();
            return _mapper.Map<Stores, StoreDto>(store);
        }
        public async Task<bool> DeleteStore(int StoreId)
        {
            try
            {
                Stores store = await _context.Stores.SingleOrDefaultAsync(x => x.StoreId == StoreId);
                if (store == null) {
                    return false;
                }
                _context.Stores.Remove(store);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<StoreDto> GetStoreById(int StoreId)
        {
            Stores store = await _context.Stores.Where(x => x.StoreId == StoreId).FirstOrDefaultAsync();
            return _mapper.Map<StoreDto>(store);
        }

        public async Task<IEnumerable<StoreDto>> GetStores()
        {
            IEnumerable<Stores> storeList = await _context.Stores.ToListAsync();
            return _mapper.Map<List<StoreDto>>(storeList);
        }
    }
}
