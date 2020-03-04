using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ArtStore.Data;
using ArtStore.Models;
using Newtonsoft.Json;

namespace Artstore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        // GET: api/cart
        [HttpGet]
        public async Task<ActionResult<Cart>> GetCart()
        {
            if (HttpContext.Session.GetObject<Cart>("Cart") == null)
            {
                var newCart = new Cart();
                HttpContext.Session.SetObject("Cart", newCart);
            }
            
            var currentCart = HttpContext.Session.GetObject<Cart>("Cart");

            currentCart.items.Add(new CartItem());

            HttpContext.Session.SetObject("Cart", currentCart);

            return HttpContext.Session.GetObject<Cart>("Cart");
        }
    }

    public class Cart
    {
        public List<CartItem> items { get; set; }

        public Cart()
        {
            items = new List<CartItem>();
        }
    }

    public class CartItem
    {
        public int itemId { get; set; }

        public CartItem()
        {
            itemId = -1;
        }
    }
    
    public static class SessionExtensions
    {
        public static void SetObject<T>(this ISession session, string key, T value)
        {
            session.SetString(key, JsonConvert.SerializeObject(value));
        }

        public static T GetObject<T>(this ISession session, string key)
        {
            var value = session.GetString(key);

            return value == null ? default(T) : 
                JsonConvert.DeserializeObject<T>(value);
        }
    }
}