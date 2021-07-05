using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    [Table("ActionHistory")]
    public class ActionHistory
    {
        [Key]
        public int Id { get; set; }  
        public DateTime ActionDate { get; set; } = DateTime.Now;
        public string ActionType { get; set; }
        public string ActionEntityType { get; set; }

        public int ActionEntityId { get; set; }
        public string ActionDescription { get; set; }
       
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}