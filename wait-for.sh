# wait-for.sh
set -e

host="$1"
shift
cmd="npm run start:migrate:prod"

until pg_isready -h "$host" -U admin; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 2
done

>&2 echo "Postgres is up - executing command"
exec $cmd
