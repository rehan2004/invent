using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    [Table("Items")]
    public class Item
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public string SerialNumber { get; set; }
        public int Quantity { get; set; }
        public int ActualQuantity { get; set; }
        public MeasurementUnit MeasurementUnit { get; set; }
        public int MeasurementUnitId{ get; set; }
        
        public string BrandName { get; set; }
       
       
        public DateTime GuranteeStart { get; set; } = DateTime.Now;
        public DateTime GuranteeEnd { get; set; } = DateTime.Now;
        public string Description { get; set; }
        public Boolean IsActive { get; set; } = true;
        public Store Store { get; set; }
        public int StoreId { get; set; }

        public Supply Supply { get; set; }
        public int SupplyId { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }

        //public Supplier Supplier { get; set; }
        //public int SupplierId { get; set; }

        public IList<Inventory> Inventories { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;


    }
}