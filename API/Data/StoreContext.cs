using API.Entities;
using Microsoft.EntityFrameworkCore;
using Restore2.Entities;

namespace Restore2.Data
{
    public class StoreContext : DbContext
    {

        public StoreContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
    }
}
