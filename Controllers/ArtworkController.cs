using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArtStore.Data;
using ArtStore.Models;

namespace ArtStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtworkController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ArtworkController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Artwork
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artwork>>> GetArtwork()
        {
            return await _context.Artwork.ToListAsync();
        }

        // GET: api/Artwork/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Artwork>> GetArtwork(int id)
        {
            var artwork = await _context.Artwork.FindAsync(id);

            if (artwork == null)
            {
                return NotFound();
            }

            return artwork;
        }

        // PUT: api/Artwork/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtwork(int id, Artwork artwork)
        {
            if (id != artwork.Id)
            {
                return BadRequest();
            }

            _context.Entry(artwork).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtworkExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Artwork
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Artwork>> PostArtwork(Artwork artwork)
        {
            _context.Artwork.Add(artwork);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtwork", new { id = artwork.Id }, artwork);
        }

        // DELETE: api/Artwork/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Artwork>> DeleteArtwork(int id)
        {
            var artwork = await _context.Artwork.FindAsync(id);
            if (artwork == null)
            {
                return NotFound();
            }

            _context.Artwork.Remove(artwork);
            await _context.SaveChangesAsync();

            return artwork;
        }

        private bool ArtworkExists(int id)
        {
            return _context.Artwork.Any(e => e.Id == id);
        }
    }
}
