using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class StoreDto
    {
        public int Id { get; set; }
        public string StoreName { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        
    }
}