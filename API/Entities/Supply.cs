using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Supply 

    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int  Id { get; set; }
        public string SupplyTitle { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime RecievedDate { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public int CreatedBy { get; set; }
        public string Description { get; set; }
        public ICollection<Item> Items { get; set; }

        public ICollection<SupplyDocument> Documents { get; set; }

        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }


    }
}