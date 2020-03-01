using System;
using System.Collections.Generic;

namespace ArtStore.Models
{
    public class Artist
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        public ICollection<Artwork> Artwork { get; set; }
    }
}