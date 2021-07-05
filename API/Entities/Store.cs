using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Store 

    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int  StoreId { get; set; }
        public string StoreName { get; set; }
        public string StoreLocation { get; set; }
        public string Description { get; set; }
        public Boolean IsActive { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public ICollection<Item> Items { get; set; }




    }
}