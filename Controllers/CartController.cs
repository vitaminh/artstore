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

namespace ArtStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        // GET: api/cart
        [HttpGet]
        public async Task<ActionResult<Cart>> GetCart()
        {
            InitializeCart();
            
            Cart currentCart = HttpContext.Session.GetObject<Cart>("Cart");

            HttpContext.Session.SetObject("Cart", currentCart);

            return HttpContext.Session.GetObject<Cart>("Cart");
        }
        
        // POST: api/cart
        // Add item to the cart / Update quantity of item in cart
        [HttpPost]
        public async Task<ActionResult<Cart>> AddToCart(CartItem cartItem)
        {
            InitializeCart();
            Cart currentCart = HttpContext.Session.GetObject<Cart>("Cart");

            CartItem currentItem = currentCart.items.Find(i => 
                i.itemId == cartItem.itemId);

            if (currentItem == null)
            {
                currentCart.items.Add(cartItem);
            }
            else
            {
                currentItem.quantity += cartItem.quantity;
            }

            HttpContext.Session.SetObject("Cart", currentCart);

            return HttpContext.Session.GetObject<Cart>("Cart");
        }
        
        // DELETE: api/cart
        // Deletes the entire cart
        [HttpDelete]
        public async Task<ActionResult<Cart>> DeleteCart()
        {
            HttpContext.Session.SetObject("Cart", new Cart());
            return HttpContext.Session.GetObject<Cart>("Cart");
        }

        // Use to ensure that a cart exists before attempting to alter it
        private void InitializeCart()
        {
            if (HttpContext.Session.GetObject<Cart>("Cart") == null)
            {
                HttpContext.Session.SetObject("Cart", new Cart());
            }
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
        public int quantity { get; set; }
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