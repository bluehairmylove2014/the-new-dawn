using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using thenewdawn_be.Database;
using thenewdawn_be.Database.Models;

namespace thenewdawn_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotProductsController : ControllerBase
    {
        private readonly ThenewdawnContext _context;

        public HotProductsController(ThenewdawnContext context)
        {
            _context = context;
        }

        // GET: api/HotProducts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HotProduct>>> GetHotProducts()
        {
          if (_context.HotProducts == null)
          {
              return NotFound();
          }
            return await _context.HotProducts.ToListAsync();
        }

        // GET: api/HotProducts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HotProduct>> GetHotProduct(int id)
        {
          if (_context.HotProducts == null)
          {
              return NotFound();
          }
            var hotProduct = await _context.HotProducts.FindAsync(id);

            if (hotProduct == null)
            {
                return NotFound();
            }

            return hotProduct;
        }

        // PUT: api/HotProducts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotProduct(int id, HotProduct hotProduct)
        {
            if (id != hotProduct.HotProductId)
            {
                return BadRequest();
            }

            _context.Entry(hotProduct).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HotProductExists(id))
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

        // POST: api/HotProducts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HotProduct>> PostHotProduct(HotProduct hotProduct)
        {
          if (_context.HotProducts == null)
          {
              return Problem("Entity set 'ThenewdawnContext.HotProducts'  is null.");
          }
            _context.HotProducts.Add(hotProduct);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHotProduct", new { id = hotProduct.HotProductId }, hotProduct);
        }

        // DELETE: api/HotProducts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotProduct(int id)
        {
            if (_context.HotProducts == null)
            {
                return NotFound();
            }
            var hotProduct = await _context.HotProducts.FindAsync(id);
            if (hotProduct == null)
            {
                return NotFound();
            }

            _context.HotProducts.Remove(hotProduct);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HotProductExists(int id)
        {
            return (_context.HotProducts?.Any(e => e.HotProductId == id)).GetValueOrDefault();
        }
    }
}
