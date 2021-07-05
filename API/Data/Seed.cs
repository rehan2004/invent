using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager, 
            RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            if (users == null) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "Member"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
            
            foreach (var user in users)
            {
                user.UserName = user.UserName.ToLower();
                await userManager.CreateAsync(user, "Rehan@123");
                await userManager.AddToRoleAsync(user, "Member");
            }

            var admin = new AppUser
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "Rehan@123");
            await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
        }



        public static async Task SeedData(DataContext dbContext)     
        {

            if ( await dbContext.Stores.AnyAsync() ==false)
            { 
                Store store1 = new Store { StoreId=1, StoreName = "Main Store", Description = "Main store" };
                Store store2 = new Store { StoreId=2, StoreName = "Sub Store 1", Description = "Sub store 1" };
                Store store3 = new Store { StoreId = 3, StoreName = "General Store", Description = "General store" };
                Store store4 = new Store { StoreId = 4, StoreName = "Logistic Store", Description = "Logistic" };
                Store store5 = new Store { StoreId = 5, StoreName = "Main Doc Store", Description = "Main doc store" };
                Store store6 = new Store { StoreId = 6, StoreName = "Electronic Store", Description = "Electronic" };
                Store store7 = new Store { StoreId = 7, StoreName = "Priority Store", Description = "Priority store" };

                dbContext.Stores.Add(store1);
                dbContext.Stores.Add(store2);
                dbContext.Stores.Add(store3);
                dbContext.Stores.Add(store4);
                dbContext.Stores.Add(store5);
                dbContext.Stores.Add(store6);
                dbContext.Stores.Add(store7);

            }


            if (await dbContext.SupplierType.AnyAsync() == false)
            {
                SupplierType SupplierType1 = new SupplierType { Id=1, TypeName = "Company", Description = "Company -provider" };
                SupplierType SupplierType2 = new SupplierType { Id = 2, TypeName = "Unit", Description = "External Unit" };
                dbContext.SupplierType.Add(SupplierType1);
                dbContext.SupplierType.Add(SupplierType2);
            }

            if (await dbContext.SupplierCategory.AnyAsync() == false)
            {
                SupplierCategory SupplierCat1 = new SupplierCategory { Id=1, CategoryName = "Category1", Description = "Categories" };
                SupplierCategory SupplierCat2 = new SupplierCategory { Id = 2, CategoryName = "Category2", Description = "Categories" };
                dbContext.SupplierCategory.Add(SupplierCat1);
                dbContext.SupplierCategory.Add(SupplierCat2);
            }


            if (await dbContext.Supplier.AnyAsync() == false)
            {
                Supplier Supplier1 = new Supplier { Id=1, SupplierName = "Abc Corporation", CategoryId = 1, TypeId = 1 };
                Supplier Supplier2 = new Supplier { Id = 2, SupplierName = "Microsoft ", CategoryId = 2, TypeId = 1 };

                dbContext.Supplier.Add(Supplier1);
                dbContext.Supplier.Add(Supplier2);
            }

            if (await dbContext.Supply.AnyAsync() == false)
            {
                Supply Supply1 = new Supply { Id = 1, SupplierId = 1, SupplyTitle = "supply of head phones", OrderDate = System.DateTime.Now.AddDays(-10), RecievedDate = System.DateTime.Now.AddDays(-3) };
                Supply Supply2 = new Supply { Id = 2, SupplierId = 2, SupplyTitle = "supply of keyboard and mouse from abc corporation", OrderDate = System.DateTime.Now.AddDays(-9), RecievedDate = System.DateTime.Now.AddDays(-4) };

                dbContext.Supply.Add(Supply1);
                dbContext.Supply.Add(Supply2);
            }


            if (await dbContext.ItemCategory.AnyAsync() == false)
            {
                Category ItemCategory1 = new Category {  CategoryName = "Hardware", Description = "Hardware" };
                Category ItemCategory2 = new Category { CategoryName = "Furniture", Description = "Furniture" };
                Category ItemCategory3 = new Category { CategoryName = "Medicines", Description = "Medicines" };
                 dbContext.ItemCategory.Add(ItemCategory1);
                 dbContext.ItemCategory.Add(ItemCategory2);
                 dbContext.ItemCategory.Add(ItemCategory3);

            }

            if (await dbContext.MeasurementUnits.AnyAsync() == false)
            {
                MeasurementUnit MeasurementUnit1 = new MeasurementUnit { Id=1, Unit = "Peace", Description = "1 peace" };
                MeasurementUnit MeasurementUnit2 = new MeasurementUnit { Id = 2, Unit = "Dozen", Description = "Dozen" };
                MeasurementUnit MeasurementUnit3 = new MeasurementUnit { Id = 3, Unit = "Kilogram", Description = "Kilogram" };
                MeasurementUnit MeasurementUnit4 = new MeasurementUnit { Id = 4, Unit = "Meter", Description = "Meter" };
                MeasurementUnit MeasurementUnit5 = new MeasurementUnit { Id = 5, Unit = "Gallon", Description = "Gallon" };
                await dbContext.MeasurementUnits.AddAsync(MeasurementUnit1);
                await dbContext.MeasurementUnits.AddAsync(MeasurementUnit2);
                await dbContext.MeasurementUnits.AddAsync(MeasurementUnit3);
                await dbContext.MeasurementUnits.AddAsync(MeasurementUnit4);
                await dbContext.MeasurementUnits.AddAsync(MeasurementUnit5);

            }

            if (await dbContext.Items.AnyAsync() == false)
            {
                Item Item1 = new Item { StoreId = 1, SupplyId = 1, CategoryId = 1, ItemName = "Head Phones", BrandName = "HP", ActualQuantity = 20, Quantity = 20, MeasurementUnitId = 1, IsActive = true, SerialNumber = "111110010-102-2001" };
                Item Item2 = new Item { StoreId = 2, SupplyId = 1, CategoryId = 2, ItemName = "Cam Web", BrandName = "Sony", ActualQuantity = 30, Quantity = 30, MeasurementUnitId = 2, IsActive = true, SerialNumber = "21000010-102-2021" };
                Item Item3 = new Item { StoreId = 1, SupplyId = 2, CategoryId = 1, ItemName = "7 seeter sofa", BrandName = "Pan Emirates", ActualQuantity = 10, Quantity = 20, MeasurementUnitId = 3, IsActive = true, SerialNumber = "77777-102-2021" };
                Item Item4 = new Item { StoreId = 1, SupplyId = 1, CategoryId = 1, ItemName = "Keyboard", BrandName = "HP", ActualQuantity = 100, Quantity = 100, MeasurementUnitId = 1, IsActive = true, SerialNumber = "111110010-102-2001" };
                Item Item5 = new Item { StoreId = 1, SupplyId = 1, CategoryId = 2, ItemName = "Monitors", BrandName = "Dell", ActualQuantity = 300, Quantity = 300, MeasurementUnitId = 2, IsActive = true, SerialNumber = "21000010-102-2021" };
                Item Item6 = new Item { StoreId = 1, SupplyId = 2, CategoryId = 1, ItemName = "Mouse", BrandName = "Apple", ActualQuantity = 50, Quantity = 20, MeasurementUnitId = 3, IsActive = true, SerialNumber = "77777-102-2021" };
                Item Item7 = new Item { StoreId = 1, SupplyId = 1, CategoryId = 1, ItemName = "Printers", BrandName = "HP", ActualQuantity = 6, Quantity = 20, MeasurementUnitId = 1, IsActive = true, SerialNumber = "111110010-102-2001" };
                Item Item8 = new Item { StoreId = 2, SupplyId = 1, CategoryId = 2, ItemName = "Staionery", BrandName = "Steddler Noris", ActualQuantity = 30, Quantity = 30, MeasurementUnitId = 4, IsActive = true, SerialNumber = "21000010-102-2021" };
                Item Item9 = new Item { StoreId = 1, SupplyId = 2, CategoryId = 1, ItemName = "5 seeter sofa", BrandName = "Pan Emirates", ActualQuantity = 6, Quantity = 2, MeasurementUnitId = 3, IsActive = true, SerialNumber = "77777-102-2021" };
                Item Item10 = new Item { StoreId = 2, SupplyId = 1, CategoryId = 2, ItemName = "Office table", BrandName = "Sony", ActualQuantity = 30, Quantity = 30, MeasurementUnitId = 3, IsActive = true, SerialNumber = "21000010-102-2021" };
                Item Item11 = new Item { StoreId = 1, SupplyId = 2, CategoryId = 1, ItemName = "15 seeter sofa", BrandName = "Pan Emirates", ActualQuantity = 100, Quantity = 95, MeasurementUnitId = 3, IsActive = true, SerialNumber = "77777-102-2021" };


                await dbContext.Items.AddAsync(Item1);
                await dbContext.Items.AddAsync(Item2);
                await dbContext.Items.AddAsync(Item3);
                await dbContext.Items.AddAsync(Item4);
                await dbContext.Items.AddAsync(Item5);
                await dbContext.Items.AddAsync(Item6);
                await dbContext.Items.AddAsync(Item7);
                await dbContext.Items.AddAsync(Item8);
                await dbContext.Items.AddAsync(Item9);
                await dbContext.Items.AddAsync(Item10);
                await dbContext.Items.AddAsync(Item11);
            }
            await dbContext.SaveChangesAsync();


        }
    }
}
