using AutoMapper;
using ERD_Shop.Order;
using ERD_Shop.Order.Models;
using ERD_Shop.Order.Repository;
using ERD_Shop.Order.Settings;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IOrderRepository, OrderRepository>();
builder.Services.AddTransient<IDiscountCodeRepository, DiscountCodeRepository>();
builder.Services.AddTransient<IRefundRepository, RefundRepository>();
builder.Services.AddTransient<IProductVariantRepository, ProductVariantRepository>();
builder.Services.AddTransient<IUserRepository, UserRepository>();



var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<OrdersContext>(x=>x.UseSqlServer(connectionString));

// Add services to the container.
//Adding MassTransit/RabbitMQ Configuration
builder.Services.AddMassTransit(options =>
{
    options.AddConsumers(Assembly.GetEntryAssembly());
    options.UsingRabbitMq((context, configurator) =>
    {
        var rabbitMQSettings = builder.Configuration.GetSection(nameof(RabbitMQSettings)).Get<RabbitMQSettings>();
        configurator.Host(rabbitMQSettings.Host);
        configurator.ConfigureEndpoints(context, new KebabCaseEndpointNameFormatter(false));
    });
});

IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();
builder.Services.AddSingleton(mapper);
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
