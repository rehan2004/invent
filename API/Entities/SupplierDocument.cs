using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    [Table("SupplierDocument")]
    public class SupplierDocument
    {
        [Key]
        public int Id { get; set; }
        public string DocumentName { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
        public string FileName { get; set; }
        public byte[] File { get; set; }
        public string MimeType { get; set; }
       
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }

    }
}