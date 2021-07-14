using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class SupplierDto
    {
        public int Id { get; set; }
        public string SupplierName { get; set; }
       
        public string SupplierCode { get; set; }

        public int TypeId { get; set; }
        public string Type { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
      
        public string Description { get; set; }
    }

    public class SaveSupplierDto
    {
        public int Id { get; set; }
        public string SupplierName { get; set; }
        public int SupplierCode { get; set; }

        public int TypeId { get; set; }
        public int Type { get; set; }
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public string Description { get; set; }

    }


}