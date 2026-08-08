# syntax=docker/dockerfile:1

# ---- frontend -------------------------------------------------------------
FROM node:22-alpine AS frontend
# Output path is relative to frontend/. Angular's application builder emits
# dist/<project>/browser, where <project> is the name in angular.json.
ARG BROWSER_DIST=dist/imperabook/browser
WORKDIR /src
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build && test -d "$BROWSER_DIST"

# ---- backend --------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS backend
# Path is relative to backend/.
ARG API_PROJECT=src/ImperaBook.Api/ImperaBook.Api.csproj
WORKDIR /src
COPY backend/ ./
RUN dotnet publish "$API_PROJECT" -c Release -o /app

# ---- runtime --------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
ARG BROWSER_DIST=dist/imperabook/browser
WORKDIR /app
COPY --from=backend /app ./
COPY --from=frontend /src/${BROWSER_DIST} ./wwwroot
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
USER $APP_UID
ENTRYPOINT ["dotnet", "ImperaBook.Api.dll"]
