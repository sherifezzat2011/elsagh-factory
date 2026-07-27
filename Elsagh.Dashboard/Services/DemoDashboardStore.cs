using Elsagh.Dashboard.Models;

namespace Elsagh.Dashboard.Services;

public class DemoDashboardStore
{
    private readonly List<Category> _categories =
    [
        new() { Id = 1, Name = "الأطقم", ArabicName = "الأطقم", EnglishName = "الأطقم", Slug = "sets", ParentCategory = "المجوهرات", Description = "أطقم ذهب عيار 21 للعرائس والمناسبات.", PieceType = "طقم", SeoTitle = "أطقم ذهب بحرينية", SeoDescription = "أطقم الصايغ الفاخرة", ImageUrl = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85" },
        new() { Id = 2, Name = "القلائد", ArabicName = "القلائد", EnglishName = "القلائد", Slug = "necklaces", ParentCategory = "المجوهرات", Description = "قلائد بحرينية بتفاصيل دقيقة ووزن واضح.", PieceType = "قلادة", SeoTitle = "قلائد ذهب", SeoDescription = "قلائد ذهب عيار 21", ImageUrl = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85" },
        new() { Id = 3, Name = "الأساور", ArabicName = "الأساور", EnglishName = "الأساور", Slug = "bracelets", ParentCategory = "المجوهرات", Description = "أساور يومية وفاخرة بنقوش خليجية.", PieceType = "سوار", SeoTitle = "أساور ذهب", SeoDescription = "أساور الصايغ", ImageUrl = "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85" },
        new() { Id = 4, Name = "الخواتم", ArabicName = "الخواتم", EnglishName = "الخواتم", Slug = "rings", ParentCategory = "المجوهرات", Description = "خواتم ذهب بتصاميم كلاسيكية وحديثة.", PieceType = "خاتم", SeoTitle = "خواتم ذهب", SeoDescription = "خواتم بحرينية فاخرة", ImageUrl = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85" },
        new() { Id = 5, Name = "الأقراط", ArabicName = "الأقراط", EnglishName = "الأقراط", Slug = "earrings", ParentCategory = "المجوهرات", Description = "أقراط خفيفة وقطع بارزة للمناسبات.", PieceType = "قرط", SeoTitle = "أقراط ذهب", SeoDescription = "أقراط ذهب عيار 21", ImageUrl = "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=85" },
        new() { Id = 6, Name = "الدبل", ArabicName = "الدبل", EnglishName = "الدبل", Slug = "wedding", ParentCategory = "الزفاف", Description = "دبل ذهب عيار 21 بتشطيب ناعم.", PieceType = "دبلة", SeoTitle = "دبل ذهب", SeoDescription = "دبل زفاف ذهب", ImageUrl = "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85" }
    ];

    private readonly List<Product> _products =
    [
        CreateProduct(1, "طقم عروس ملكي", "طقم عروس ملكي فاخر", "SET-10023", 1, "المجموعة الملكية", "طقم", "طقم", 42.5m, 340m, 2650m, 2850m, 2450m, 2550m, 3, "GF-2026-000001", "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85", true),
        CreateProduct(2, "قلادة لؤلؤ البحرين", "قلادة لؤلؤ البحرين", "GLD-10024", 2, "مجموعة الدانة", "قطعة", "قلادة", 13.2m, 85m, 390m, 430m, 335m, 360m, 7, "GF-2026-000002", "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85", true),
        CreateProduct(3, "سوار نقش المحرق", "سوار نقش المحرق", "GLD-10025", 3, "مجموعة التراث", "قطعة", "سوار", 11.8m, 92m, 480m, 520m, 410m, 455m, 2, "GF-2026-000003", "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85", false),
        CreateProduct(4, "خاتم زهرة الخليج", "خاتم زهرة الخليج", "GLD-10026", 4, "أناقة يومية", "قطعة", "خاتم", 8.4m, 55m, 330m, 360m, 285m, 310m, 9, "GF-2026-000004", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85", false),
        CreateProduct(5, "أقراط الدانة", "أقراط الدانة", "GLD-10027", 5, "مجموعة الدانة", "قطعة", "قرط", 6.5m, 48m, 265m, 290m, 225m, 245m, 1, "GF-2026-000005", "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=85", false),
        CreateProduct(6, "دبلة عهد الصايغ", "دبلة عهد الصايغ", "GLD-10028", 6, "مجموعة الزفاف", "قطعة", "دبلة", 5.1m, 34m, 220m, 240m, 190m, 205m, 12, "GF-2026-000006", "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85", false)
    ];

    private readonly List<JewelrySet> _sets =
    [
        new() { Id = 1, Name = "طقم عروس ملكي", Description = "طقم كامل يمكن بيعه كاملا أو كقطع منفصلة.", ProductIds = [1, 2, 3, 5], DiscountPercentage = 5 },
        new() { Id = 2, Name = "طقم دانة المحرق", Description = "اختيار قطع متناسقة من القلادة والسوار والأقراط.", ProductIds = [2, 3, 5], DiscountPercentage = 3 }
    ];

    private readonly List<Branch> _branches =
    [
        new() { Id = 1, Name = "فرع السيف", City = "السيف", Manager = "نورة الجاسم", SalesToday = 14800, InventoryWeight = 1840, StockItems = 216, Employees = 12 },
        new() { Id = 2, Name = "فرع المحرق", City = "المحرق", Manager = "فاطمة راشد", SalesToday = 9200, InventoryWeight = 1210, StockItems = 168, Employees = 9 },
        new() { Id = 3, Name = "فرع الرفاع", City = "الرفاع", Manager = "خالد محمود", SalesToday = 11350, InventoryWeight = 1390, StockItems = 191, Employees = 10 }
    ];

    private readonly List<Employee> _employees =
    [
        new() { Id = 1, Name = "سلمان الصايغ", Role = "رئيس مجلس الإدارة", Branch = "الإدارة", MonthlyTarget = 50000, CurrentSales = 62000, ProducedWeight = 0, WastePercentage = 0 },
        new() { Id = 2, Name = "مريم الصايغ", Role = "مديرة التصميم", Branch = "المصنع", MonthlyTarget = 25000, CurrentSales = 23200, ProducedWeight = 188.4m, WastePercentage = 0.62m },
        new() { Id = 3, Name = "عبدالله العلوي", Role = "مدير المصنع", Branch = "المصنع", MonthlyTarget = 38000, CurrentSales = 41000, ProducedWeight = 326.8m, WastePercentage = 0.58m },
        new() { Id = 4, Name = "نورة الجاسم", Role = "مديرة الفروع", Branch = "الرفاع", MonthlyTarget = 42000, CurrentSales = 39400, ProducedWeight = 0, WastePercentage = 0 },
        new() { Id = 5, Name = "فاطمة راشد", Role = "مستشارة العرائس", Branch = "المحرق", MonthlyTarget = 18000, CurrentSales = 20500, ProducedWeight = 0, WastePercentage = 0 }
    ];

    private readonly List<WasteRule> _wasteRules =
    [
        new() { Id = 1, Name = "تصنيع عادي", GramPerKg = 6 },
        new() { Id = 2, Name = "نقش", GramPerKg = 7.5m },
        new() { Id = 3, Name = "تصميم معقد", GramPerKg = 10 },
        new() { Id = 4, Name = "قيمة مخصصة", GramPerKg = 8.2m }
    ];

    private readonly List<ManufacturingOrder> _manufacturingOrders;

    private readonly List<RawGoldLot> _rawGoldLots =
    [
        new() { Id = 1, LotNumber = "RG-2026-0701", Weight = 1500, Purity = "24K", Supplier = "شركة سبائك البحرين", PurchasePrice = 51000, PurchaseDate = DateTime.Today.AddDays(-18), AvailableWeight = 930, ReservedWeight = 420, TransferredWeight = 150 },
        new() { Id = 2, LotNumber = "RG-2026-0709", Weight = 820, Purity = "22K", Supplier = "موردو ذهب الخليج", PurchasePrice = 27600, PurchaseDate = DateTime.Today.AddDays(-9), AvailableWeight = 610, ReservedWeight = 160, TransferredWeight = 50 },
        new() { Id = 3, LotNumber = "RG-2026-0718", Weight = 620, Purity = "21K", Supplier = "معادن المنامة", PurchasePrice = 19400, PurchaseDate = DateTime.Today.AddDays(-3), AvailableWeight = 510, ReservedWeight = 80, TransferredWeight = 30 }
    ];

    private readonly List<FinishedItem> _finishedItems =
    [
        new() { Id = 1, SerialNumber = "GF-2026-000001", Barcode = "629100001", QrCode = "QR-GF-000001", Weight = 42.5m, Purity = "21K", Branch = "فرع السيف", Status = "متاح", ManufacturingOrder = "MO-2026-0001", Employee = "عبدالله العلوي", CreatedDate = DateTime.Today.AddDays(-5), ImageUrl = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85" },
        new() { Id = 2, SerialNumber = "GF-2026-000002", Barcode = "629100002", QrCode = "QR-GF-000002", Weight = 13.2m, Purity = "21K", Branch = "فرع المحرق", Status = "محجوز", ManufacturingOrder = "MO-2026-0002", Employee = "مريم الصايغ", CreatedDate = DateTime.Today.AddDays(-3), ImageUrl = "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85" },
        new() { Id = 3, SerialNumber = "GF-2026-000003", Barcode = "629100003", QrCode = "QR-GF-000003", Weight = 11.8m, Purity = "21K", Branch = "فرع الرفاع", Status = "متاح", ManufacturingOrder = "MO-2026-0003", Employee = "عبدالله العلوي", CreatedDate = DateTime.Today, ImageUrl = "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=900&q=85" }
    ];

    private readonly List<Order> _orders =
    [
        new() { Id = 1001, CustomerName = "طلب واتساب", Channel = "تجزئة", CreatedAt = DateTime.Today, Subtotal = 3280, Status = "قيد المراجعة", PaymentMethod = "تحويل" },
        new() { Id = 1002, CustomerName = "حجز فرع الرفاع", Channel = "تجزئة", CreatedAt = DateTime.Today, Subtotal = 920, Status = "تم التأكيد", PaymentMethod = "بطاقة" },
        new() { Id = 1003, CustomerName = "وكيل الجملة", Channel = "جملة", CreatedAt = DateTime.Today.AddDays(-1), Subtotal = 4180, Status = "قيد التجهيز", PaymentMethod = "آجل" },
        new() { Id = 1004, CustomerName = "شراء مباشر", Channel = "وكيل", CreatedAt = DateTime.Today.AddDays(-2), Subtotal = 760, Status = "مكتمل", PaymentMethod = "نقدي" }
    ];

    private readonly List<Dealer> _dealers =
    [
        new() { Id = 1, Name = "وكالة دانة الخليج", Tier = "ذهبي", CreditLimit = 40000, Balance = 12800, PurchaseHistory = 186000 },
        new() { Id = 2, Name = "مجوهرات المنامة", Tier = "فضي", CreditLimit = 22000, Balance = 5400, PurchaseHistory = 94000 },
        new() { Id = 3, Name = "تجار الرفاع", Tier = "بلاتيني", CreditLimit = 65000, Balance = 24800, PurchaseHistory = 282000 }
    ];

    private readonly List<Supplier> _suppliers =
    [
        new() { Id = 1, Name = "شركة سبائك البحرين", Material = "ذهب خام 24K", Outstanding = 9200, LastPurchase = DateTime.Today.AddDays(-18) },
        new() { Id = 2, Name = "موردو ذهب الخليج", Material = "ذهب خام 22K", Outstanding = 4300, LastPurchase = DateTime.Today.AddDays(-9) },
        new() { Id = 3, Name = "تغليف المنامة", Material = "تغليف فاخر", Outstanding = 1100, LastPurchase = DateTime.Today.AddDays(-4) }
    ];

    private readonly List<Customer> _customers =
    [
        new() { Id = 1, Name = "عميلة عروس", Segment = "عميل مميز", Balance = 0, LifetimeValue = 11800 },
        new() { Id = 2, Name = "طلب واتساب", Segment = "طلب إلكتروني", Balance = 320, LifetimeValue = 4200 },
        new() { Id = 3, Name = "عميل فرع السيف", Segment = "تجزئة", Balance = 0, LifetimeValue = 6800 }
    ];

    public DemoDashboardStore()
    {
        _manufacturingOrders =
        [
            new() { Id = 1, OrderNumber = "MO-2026-0001", Employee = "عبدالله العلوي", Branch = "المصنع", RawGoldWeight = 1000, ExpectedFinishedWeight = 994, ActualFinishedWeight = 993.7m, ManufacturingType = "تصنيع عادي", Status = "مكتمل", CreatedDate = DateTime.Today.AddDays(-6), FinishedDate = DateTime.Today.AddDays(-5), Notes = "جاهز للتحويل إلى فرع السيف", WasteRule = _wasteRules[0] },
            new() { Id = 2, OrderNumber = "MO-2026-0002", Employee = "مريم الصايغ", Branch = "المصنع", RawGoldWeight = 500, ExpectedFinishedWeight = 496.25m, ActualFinishedWeight = 496.4m, ManufacturingType = "نقش", Status = "مكتمل", CreatedDate = DateTime.Today.AddDays(-4), FinishedDate = DateTime.Today.AddDays(-3), Notes = "نقش يدوي", WasteRule = _wasteRules[1] },
            new() { Id = 3, OrderNumber = "MO-2026-0003", Employee = "عبدالله العلوي", Branch = "المصنع", RawGoldWeight = 750, ExpectedFinishedWeight = 742.5m, ActualFinishedWeight = 741.8m, ManufacturingType = "تصميم معقد", Status = "فحص الجودة", CreatedDate = DateTime.Today, Notes = "تجاوز بسيط يحتاج مراجعة", WasteRule = _wasteRules[2] }
        ];
    }

    public DashboardViewModel Snapshot() => new()
    {
        Categories = _categories,
        Products = _products,
        Sets = _sets,
        Employees = _employees,
        Orders = _orders,
        Branches = _branches,
        WasteRules = _wasteRules,
        ManufacturingOrders = _manufacturingOrders,
        RawGoldLots = _rawGoldLots,
        FinishedItems = _finishedItems,
        Dealers = _dealers,
        Suppliers = _suppliers,
        Customers = _customers
    };

    public IReadOnlyList<Category> Categories => _categories;
    public IReadOnlyList<Product> Products => _products;
    public IReadOnlyList<JewelrySet> Sets => _sets;
    public IReadOnlyList<Employee> Employees => _employees;

    public void AddProduct(Product product)
    {
        product.Id = NextId(_products.Select(item => item.Id));
        product.Sku = string.IsNullOrWhiteSpace(product.Sku) ? $"GLD-{10000 + product.Id}" : product.Sku.Trim();
        product.SerialNumber = string.IsNullOrWhiteSpace(product.SerialNumber) ? $"GF-{DateTime.Today.Year}-{product.Id:000000}" : product.SerialNumber.Trim();
        product.Barcode = string.IsNullOrWhiteSpace(product.Barcode) ? $"6291{product.Id:00000}" : product.Barcode.Trim();
        product.QrCode = string.IsNullOrWhiteSpace(product.QrCode) ? $"QR-{product.SerialNumber}" : product.QrCode.Trim();
        product.Status = string.IsNullOrWhiteSpace(product.Status) ? "مفعل" : product.Status;
        if (!product.Images.Any())
        {
            product.Images.Add("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=85");
        }
        _products.Add(product);
    }

    public void UpdateProductPrice(int id, decimal price)
    {
        var product = _products.FirstOrDefault(item => item.Id == id);
        if (product is not null)
        {
            product.RetailPrice = price;
            product.SellingPrice = price;
        }
    }

    public void AddCategory(Category category)
    {
        category.Id = NextId(_categories.Select(item => item.Id));
        category.Slug = string.IsNullOrWhiteSpace(category.Slug) ? category.Name.Replace(" ", "-") : category.Slug.Trim();
        _categories.Add(category);
    }

    public void AddSet(JewelrySet set)
    {
        set.Id = NextId(_sets.Select(item => item.Id));
        _sets.Add(set);
    }

    public void AddEmployee(Employee employee)
    {
        employee.Id = NextId(_employees.Select(item => item.Id));
        _employees.Add(employee);
    }

    public void AddManufacturingOrder(ManufacturingOrder order, int wasteRuleId)
    {
        var rule = _wasteRules.FirstOrDefault(item => item.Id == wasteRuleId) ?? _wasteRules.First();
        order.Id = NextId(_manufacturingOrders.Select(item => item.Id));
        order.OrderNumber = $"MO-{DateTime.Today.Year}-{order.Id:0000}";
        order.WasteRule = rule;
        order.ExpectedFinishedWeight = order.RawGoldWeight - order.ExpectedWaste;
        order.Status = string.IsNullOrWhiteSpace(order.Status) ? "قيد التصنيع" : order.Status;
        order.CreatedDate = DateTime.Today;
        _manufacturingOrders.Add(order);
    }

    private static Product CreateProduct(int id, string arabicName, string englishName, string sku, int categoryId, string collection, string productType, string pieceType, decimal weight, decimal cost, decimal selling, decimal retail, decimal wholesale, decimal dealer, int stock, string serial, string image, bool featured)
    {
        return new Product
        {
            Id = id,
            Name = arabicName,
            ArabicName = arabicName,
            EnglishName = englishName,
            Sku = sku,
            CategoryId = categoryId,
            Collection = collection,
            ProductType = productType,
            PieceType = pieceType,
            Weight = weight,
            ManufacturingCost = cost,
            SellingPrice = selling,
            RetailPrice = retail,
            WholesalePrice = wholesale,
            DealerPrice = dealer,
            Stock = stock,
            Barcode = $"6291{id:00000}",
            QrCode = $"QR-{serial}",
            SerialNumber = serial,
            Status = "مفعل",
            Images = [image, "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=900&q=85"],
            Description = "منتج ذهب عيار 21 ببيانات كاملة للعرض التجريبي.",
            Notes = "السعر قابل للتعديل من لوحة التحكم.",
            IsFeatured = featured,
            CanBeAddedToCustomSet = productType != "طقم"
        };
    }

    private static int NextId(IEnumerable<int> ids) => ids.DefaultIfEmpty().Max() + 1;
}
