namespace Elsagh.Dashboard.Models;

public static class Money
{
    public const decimal TaxRate = 0.10m;

    public static decimal Tax(decimal price) => Math.Round(price * TaxRate, 2);

    public static decimal Total(decimal price) => price + Tax(price);
}

public class Category
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ArabicName { get; set; } = string.Empty;
    public string EnglishName { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string ParentCategory { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string SeoTitle { get; set; } = string.Empty;
    public string SeoDescription { get; set; } = string.Empty;
    public string PieceType { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ArabicName { get; set; } = string.Empty;
    public string EnglishName { get; set; } = string.Empty;
    public string Sku { get; set; } = string.Empty;
    public int CategoryId { get; set; }
    public string Collection { get; set; } = string.Empty;
    public string ProductType { get; set; } = "قطعة";
    public string PieceType { get; set; } = string.Empty;
    public string Purity { get; set; } = "21K";
    public decimal Weight { get; set; }
    public decimal ManufacturingCost { get; set; }
    public decimal SellingPrice { get; set; }
    public decimal WholesalePrice { get; set; }
    public decimal DealerPrice { get; set; }
    public decimal RetailPrice { get; set; }
    public string Barcode { get; set; } = string.Empty;
    public string QrCode { get; set; } = string.Empty;
    public string SerialNumber { get; set; } = string.Empty;
    public int Stock { get; set; }
    public string Status { get; set; } = "مفعل";
    public List<string> Images { get; set; } = [];
    public string Description { get; set; } = string.Empty;
    public string Notes { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public bool CanBeAddedToCustomSet { get; set; }

    public decimal Price
    {
        get => RetailPrice;
        set => RetailPrice = value;
    }

    public string ImageUrl
    {
        get => Images.FirstOrDefault() ?? string.Empty;
        set
        {
            Images.Clear();
            if (!string.IsNullOrWhiteSpace(value))
            {
                Images.Add(value);
            }
        }
    }
}

public class JewelrySet
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<int> ProductIds { get; set; } = [];
    public decimal DiscountPercentage { get; set; }
    public bool CanPurchaseFullSet { get; set; } = true;
    public bool CanPurchaseItemsSeparately { get; set; } = true;
    public bool CanCustomize { get; set; } = true;
}

public class Branch
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Manager { get; set; } = string.Empty;
    public decimal SalesToday { get; set; }
    public decimal InventoryWeight { get; set; }
    public int StockItems { get; set; }
    public int Employees { get; set; }
}

public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Branch { get; set; } = string.Empty;
    public decimal MonthlyTarget { get; set; }
    public decimal CurrentSales { get; set; }
    public decimal ProducedWeight { get; set; }
    public decimal WastePercentage { get; set; }
    public bool IsActive { get; set; } = true;
}

public class Order
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string Channel { get; set; } = "تجزئة";
    public DateTime CreatedAt { get; set; }
    public decimal Subtotal { get; set; }
    public string Status { get; set; } = string.Empty;
    public string PaymentMethod { get; set; } = string.Empty;

    public decimal Tax => Money.Tax(Subtotal);
    public decimal Total => Money.Total(Subtotal);
}

public class WasteRule
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal GramPerKg { get; set; }
}

public class ManufacturingOrder
{
    public int Id { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public string Employee { get; set; } = string.Empty;
    public string Branch { get; set; } = string.Empty;
    public decimal RawGoldWeight { get; set; }
    public decimal ExpectedFinishedWeight { get; set; }
    public decimal ActualFinishedWeight { get; set; }
    public string ManufacturingType { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public DateTime? FinishedDate { get; set; }
    public string Notes { get; set; } = string.Empty;
    public WasteRule WasteRule { get; set; } = new();

    public decimal ExpectedWaste => Math.Round((RawGoldWeight * WasteRule.GramPerKg) / 1000, 3);
    public decimal ActualWaste => Math.Round(RawGoldWeight - ActualFinishedWeight, 3);
    public decimal WasteDifference => Math.Round(ActualWaste - ExpectedWaste, 3);
    public bool IsWasteExceeded => WasteDifference > 0;
}

public class RawGoldLot
{
    public int Id { get; set; }
    public string LotNumber { get; set; } = string.Empty;
    public decimal Weight { get; set; }
    public string Purity { get; set; } = string.Empty;
    public string Supplier { get; set; } = string.Empty;
    public decimal PurchasePrice { get; set; }
    public DateTime PurchaseDate { get; set; }
    public decimal AvailableWeight { get; set; }
    public decimal ReservedWeight { get; set; }
    public decimal TransferredWeight { get; set; }
}

public class FinishedItem
{
    public int Id { get; set; }
    public string SerialNumber { get; set; } = string.Empty;
    public string Barcode { get; set; } = string.Empty;
    public string QrCode { get; set; } = string.Empty;
    public decimal Weight { get; set; }
    public string Purity { get; set; } = string.Empty;
    public string Branch { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string ManufacturingOrder { get; set; } = string.Empty;
    public string Employee { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
}

public class Dealer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Tier { get; set; } = string.Empty;
    public decimal CreditLimit { get; set; }
    public decimal Balance { get; set; }
    public decimal PurchaseHistory { get; set; }
}

public class Supplier
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Material { get; set; } = string.Empty;
    public decimal Outstanding { get; set; }
    public DateTime LastPurchase { get; set; }
}

public class Customer
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Segment { get; set; } = string.Empty;
    public decimal Balance { get; set; }
    public decimal LifetimeValue { get; set; }
}

public class DashboardViewModel
{
    public IReadOnlyList<Category> Categories { get; init; } = [];
    public IReadOnlyList<Product> Products { get; init; } = [];
    public IReadOnlyList<JewelrySet> Sets { get; init; } = [];
    public IReadOnlyList<Employee> Employees { get; init; } = [];
    public IReadOnlyList<Order> Orders { get; init; } = [];
    public IReadOnlyList<Branch> Branches { get; init; } = [];
    public IReadOnlyList<WasteRule> WasteRules { get; init; } = [];
    public IReadOnlyList<ManufacturingOrder> ManufacturingOrders { get; init; } = [];
    public IReadOnlyList<RawGoldLot> RawGoldLots { get; init; } = [];
    public IReadOnlyList<FinishedItem> FinishedItems { get; init; } = [];
    public IReadOnlyList<Dealer> Dealers { get; init; } = [];
    public IReadOnlyList<Supplier> Suppliers { get; init; } = [];
    public IReadOnlyList<Customer> Customers { get; init; } = [];

    public decimal Revenue => Orders.Sum(order => order.Total);
    public decimal Tax => Orders.Sum(order => order.Tax);
    public decimal InventoryValue => Products.Sum(product => product.RetailPrice * product.Stock);
    public int LowStockCount => Products.Count(product => product.Stock <= 2);
    public decimal RawGoldWeight => RawGoldLots.Sum(lot => lot.AvailableWeight);
    public decimal FinishedProductsWeight => FinishedItems.Sum(item => item.Weight);
    public decimal CurrentWastePercentage => ManufacturingOrders.Count == 0 ? 0 : Math.Round(ManufacturingOrders.Average(order => order.ActualWaste / order.RawGoldWeight * 100), 2);
    public decimal TodaySales => Orders.Where(order => order.CreatedAt.Date == DateTime.Today).Sum(order => order.Total);
    public decimal TodayProduction => ManufacturingOrders.Where(order => order.CreatedDate.Date == DateTime.Today || order.FinishedDate?.Date == DateTime.Today).Sum(order => order.ActualFinishedWeight);
}
