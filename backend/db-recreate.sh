#!/usr/bin/env bash
rm -rf src/ImperaBook.Infrastructure.Data/Migrations
docker compose down -v && docker compose up -d
dotnet ef migrations add InitialCreate -p src/ImperaBook.Infrastructure.Data -s src/ImperaBook.Infrastructure.Data
