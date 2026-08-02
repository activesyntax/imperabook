#!/usr/bin/env bash
set -euo pipefail

pids=()

cleanup() {
  trap - INT TERM
  echo
  echo "Stopping API and frontend…"
  for pid in "${pids[@]}"; do
    kill "$pid" 2>/dev/null || true
  done
  wait 2>/dev/null || true
}
trap cleanup INT TERM

docker compose up -d db

echo "Waiting for Postgres to become healthy…"
until [ "$(docker inspect -f '{{.State.Health.Status}}' "$(docker compose ps -q db)" 2>/dev/null)" = "healthy" ]; do
  sleep 1
done
echo "Postgres ready."

dotnet run --project backend/src/ImperaBook.Api &
pids+=($!)

# TODO: health check for backend API
sleep 10

(cd frontend && npm start) &
pids+=($!)

wait
