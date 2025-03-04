# wait-for-it.sh script (save this in your backend folder)
#!/usr/bin/env bash
set -e

host="$1"
shift
until nc -z "$host" 5432; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec "$@"