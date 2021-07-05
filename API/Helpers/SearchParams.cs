namespace API.Helpers
{
    public class SearchParams : PaginationParams
    {
        public int StoreId { get; set; }
        public string StoreName { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public int SupplierId { get; set; }
        public string SupplierName { get; set; }

       
        public string OrderBy { get; set; } = "lastActive";
    }
}