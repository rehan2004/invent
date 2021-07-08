using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class ItemDto
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public string SerialNumber { get; set; }
        public int Quantity { get; set; }
        public int ActualQuantity { get; set; }
        public int QuantityType { get; set; }
        public string StoreName { get; set; }
        public string CategoryName { get; set; }
        public string MeasurementUnit { get; set; }
        public string BrandName { get; set; }



    }

    public class SaveItemDto
    {
        public string itemName { get; set; }
        public string category { get; set; }
        public int quantity { get; set; }
        public string store { get; set; }
        public string supply { get; set; }
        public string unit { get; set; }
        public string description { get; set; }

    }


}