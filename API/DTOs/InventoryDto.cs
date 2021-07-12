using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class InventoryDto
    {
        public int Id { get; set; }     
        public DateTime InventoryDate { get; set; }
        public string SerialNumber { get; set; }
        public int StockQuantity { get; set; }
        public int ActualQuantity { get; set; }
        public int WithdrawQuantity { get; set; }      
        public string Description { get; set; }
    }

  


}