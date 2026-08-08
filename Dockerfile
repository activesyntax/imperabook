# syntax=docker/dockerfile:1

# ---- frontend -------------------------------------------------------------
FROM node:22-alpine AS frontend
WORKDIR /src
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ---- backend --------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend
WORKDIR /src
COPY backend/ ./
RUN dotnet publish ImperaBook.Api/ImperaBook.Api.csproj -c Release -o /app

# ---- runtime --------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=backend /app ./
# Angular 22 application builder emits the browser bundle under dist/<project>/browser.
# Verify the project name against angular.json before trusting this path.
COPY --from=frontend /src/dist/imperabook/browser ./wwwroot
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
USER $APP_UID
ENTRYPOINT ["dotnet", "ImperaBook.Api.dll"]
