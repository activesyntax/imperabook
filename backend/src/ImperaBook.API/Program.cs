using System.Text.Json;
using System.Text.Json.Serialization;
using ImperaBook.API.Endpoints;
using ImperaBook.API.Endpoints.Data;
using ImperaBook.Application;
using ImperaBook.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionString =
    builder.Configuration.GetConnectionString("ImperaBook")
    ?? throw new InvalidOperationException(
        "Connection string 'ImperaBook' was not found in configuration."
    );

builder.Services.AddApplication();
builder.Services.AddInfrastructure(connectionString);
builder.Services.AddProblemDetails();
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(
        new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
    );
});

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();
}

var app = builder.Build();

app.UseExceptionHandler();
app.UseStatusCodePages();

if (app.Environment.IsDevelopment())
{
    await app.AddDevelopmentData();
}

app.MapCommandEndpoints();

app.Run();
