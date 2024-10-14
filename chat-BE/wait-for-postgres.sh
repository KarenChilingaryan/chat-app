#!/bin/sh
# wait-for-postgres.sh

set -e

host="$DATABASE_HOST"
port="$DATABASE_PORT"

until nc -z "$host" "$port"; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec "$@"
