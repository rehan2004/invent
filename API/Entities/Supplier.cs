using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Supplier 

    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        
        public string SupplierName { get; set; }
        public string Attention { get; set; }
        
        public string SupplierCode { get; set; }
        public string TaxRegNumber { get; set; }
        public string LicenseNumber { get; set; }
        public string BankName { get; set; }
        public string AccountNumber { get; set; }
        public string IBAN { get; set; }
        public string BankAddress { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string SupplierAddress { get; set; }
        public Boolean IsActive { get; set; } = true;
        public string InActiveReason { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
       
        public string Description { get; set; }

        public int CategoryId { get; set; }
        public SupplierCategory Category { get; set; }
        

        public int TypeId { get; set; }
        public SupplierType Type { get; set; }
       
        

     //   public ICollection<Item> Items { get; set; }
        public IList<SupplierDocument> Documents { get; set; }

        public IList<Supply> Supplies { get; set; }

    }
}