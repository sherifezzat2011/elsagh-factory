using Elsagh.Dashboard.Models;
using Elsagh.Dashboard.Services;
using Microsoft.AspNetCore.Mvc;

namespace Elsagh.Dashboard.Controllers;

public class DashboardController(DemoDashboardStore store) : Controller
{
    public IActionResult Index() => View(store.Snapshot());

    public IActionResult Products() => View(store.Snapshot());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddProduct(Product product)
    {
        store.AddProduct(product);
        TempData["Message"] = "تم إضافة المنتج التجريبي بنجاح.";
        return RedirectToAction(nameof(Products));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult UpdatePrice(int id, decimal price)
    {
        store.UpdateProductPrice(id, price);
        TempData["Message"] = "تم تحديث السعر وسيظهر شامل الضريبة في التقارير.";
        return RedirectToAction(nameof(Products));
    }

    public IActionResult Categories() => View(store.Snapshot());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddCategory(Category category)
    {
        store.AddCategory(category);
        TempData["Message"] = "تم إضافة التصنيف التجريبي.";
        return RedirectToAction(nameof(Categories));
    }

    public IActionResult Sets() => View(store.Snapshot());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddSet(string name, string description, int[] productIds, decimal discountPercentage)
    {
        store.AddSet(new JewelrySet
        {
            Name = name,
            Description = description,
            ProductIds = productIds.ToList(),
            DiscountPercentage = discountPercentage
        });
        TempData["Message"] = "تم إنشاء الطقم التجريبي.";
        return RedirectToAction(nameof(Sets));
    }

    public IActionResult Manufacturing() => View(store.Snapshot());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddManufacturingOrder(ManufacturingOrder order, int wasteRuleId)
    {
        store.AddManufacturingOrder(order, wasteRuleId);
        TempData["Message"] = "تم إنشاء أمر التصنيع وحساب الهالك المتوقع.";
        return RedirectToAction(nameof(Manufacturing));
    }

    public IActionResult RawGold() => View(store.Snapshot());

    public IActionResult FinishedProducts() => View(store.Snapshot());

    public IActionResult Branches() => View(store.Snapshot());

    public IActionResult BranchInventory() => View(store.Snapshot());

    public IActionResult Orders() => View(store.Snapshot());

    public IActionResult Sales() => View(store.Snapshot());

    public IActionResult Customers() => View(store.Snapshot());

    public IActionResult Dealers() => View(store.Snapshot());

    public IActionResult Suppliers() => View(store.Snapshot());

    public IActionResult Employees() => View(store.Snapshot());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult AddEmployee(Employee employee)
    {
        store.AddEmployee(employee);
        TempData["Message"] = "تم إضافة الموظف للتقرير التجريبي.";
        return RedirectToAction(nameof(Employees));
    }

    public IActionResult Reports() => View(store.Snapshot());

    public IActionResult Accounting() => View(store.Snapshot());

    public IActionResult Settings() => View(store.Snapshot());
}
