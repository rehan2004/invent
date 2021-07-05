using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    [Table("Inventory")]
    public class Inventory
    {
        [Key]
        public int Id { get; set; }
      
        public DateTime InventoryDate { get; set; } = DateTime.Now;
        public int StockQuantity { get; set; }
        public int ActualQuantity { get; set; }
        public int WithdrawQuantity { get; set; }
        
        public string Description { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public int ItemId { get; set; }
        public Item Item { get; set; }
        public string ItemSerialNumber { get; set; }

        public IList<InventoryDocument> Documents { get; set; }

    }
}