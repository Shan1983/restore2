using System.ComponentModel.DataAnnotations.Schema;
using Restore2.Entities;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quamtity { get; set; }

        // navigation propterties for relationships
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int BasketId { get; set; }
        public Basket Basket { get; set; }

    }

}