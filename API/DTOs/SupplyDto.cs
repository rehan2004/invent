using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class SupplyDto
    {
        public int Id { get; set; }
        public string SupplyTitle { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime RecievedDate { get; set; }
        public string SupplierName { get; set; }
        public int  SupplierId { get; set; }
        public string Description { get; set; }
    }

    public class SaveSupplyDto
    {
        public int Id { get; set; }
        public string SupplyTitle { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime RecievedDate { get; set; }
        public int SupplierId { get; set; }
        public string Description { get; set; }

    }


}