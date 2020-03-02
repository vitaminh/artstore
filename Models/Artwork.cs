using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ArtStore.Models
{
    public class Artwork
    {
        public int Id { get; set; }
        
        public int ArtistId { get; set; }
        
        [ForeignKey("ArtistId")]
        public Artist Artist { get; set; }
        
        [Required]
        public string Title { get; set; }
        
        [Required]
        public int Quantity { get; set; }
        
        public string Medium { get; set; }
        public string Description { get; set; }
        public int Year { get; set; }
    }
}