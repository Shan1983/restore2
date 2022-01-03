using System;
using System.Collections.Generic;
using System.Linq;
using Restore2.Entities;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(item => item.ProductId != product.Id))
            {
                Items.Add(new BasketItem { Product = product, Quamtity = quantity });
            }

            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (existingItem != null) existingItem.Quamtity += quantity;
        }

        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;

            item.Quamtity -= quantity;
            if (item.Quamtity == 0) Items.Remove(item);
        }
    }
}
