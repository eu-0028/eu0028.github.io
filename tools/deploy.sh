#!/bin/bash
# Выгрузка сайта на хостинг через панель ISPmanager.
#
# FTP и SSH из облачного окружения недоступны, а панель отвечает по
# обычному HTTPS: вход — /manager/ispmgr, загрузка файла — /mancgi/upload.
# Пароль в репозитории не хранится и в командную строку не попадает:
# сценарий читает его из файла, путь к которому передан первым аргументом.
#
#   DEPLOY_USER=<логин> tools/deploy.sh <файл с паролем> [коммит]
#
# Без второго аргумента выгружается весь сайт, с ним — только файлы,
# изменившиеся с указанного коммита. Исходники (src, tools, build.mjs,
# README.md) не выгружаются. Страницы идут последними: пока льются стили
# и картинки, на сайте остается прежняя страница со своими файлами.
set -euo pipefail

HOST="${DEPLOY_HOST:-https://server84.hosting.reg.ru}"
ROOT="${DEPLOY_ROOT:-/www/e-shutov.ru}"
USER_NAME="${DEPLOY_USER:?задайте DEPLOY_USER}"
PASS_FILE="${1:?первым аргументом нужен путь к файлу с паролем}"
SINCE="${2:-}"

SID=$(curl -sS --max-time 40 -X POST "$HOST/manager/ispmgr" \
  --data-urlencode "out=json" --data-urlencode "func=auth" \
  --data-urlencode "username=$USER_NAME" --data-urlencode "password@$PASS_FILE" \
  | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const a=JSON.parse(s).doc.auth;process.stdout.write(a?(a.$id||a.$):"")})')
[ -n "$SID" ] || { echo "вход в панель не удался" >&2; exit 1; }

if [ -n "$SINCE" ]; then
  FILES=$(git diff --name-only --diff-filter=AMR "$SINCE" HEAD -- . ':!src' ':!tools' ':!build.mjs' ':!README.md')
else
  FILES=$(git ls-files -- . ':!src' ':!tools' ':!build.mjs' ':!README.md')
fi

fail=0
up() {
  local f="$1" dir="$ROOT"
  [ "$(dirname "$f")" != "." ] && dir="$ROOT/$(dirname "$f")"
  if curl -sS --max-time 180 -X POST "$HOST/mancgi/upload" \
      -F "out=json" -F "func=file.upload" -F "sok=ok" -F "type=data" -F "mgrname=ispmgr" \
      --form-string "auth=$SID" --form-string "plid=$dir" -F "filename=@$f" | grep -q '"ok"'; then
    echo "  залит   $f"
  else
    echo "  ОШИБКА  $f" >&2; fail=1
  fi
}
while read -r f; do [ -n "$f" ] && up "$f"; done < <(echo "$FILES" | grep -v '\.html$' || true)
while read -r f; do [ -n "$f" ] && up "$f"; done < <(echo "$FILES" | grep '\.html$' || true)

# сверка: то, что отдает сайт, должно совпасть с локальными файлами
DOMAIN="${DEPLOY_DOMAIN:-https://e-shutov.ru}"
while read -r f; do
  [ -n "$f" ] || continue
  u="$DOMAIN/${f%index.html}"
  if [ "$(curl -sS --max-time 40 "$u?v=$RANDOM" | sha1sum)" != "$(sha1sum < "$f")" ]; then
    echo "  РАСХОЖДЕНИЕ  $f" >&2; fail=1
  fi
done <<< "$FILES"
[ "$fail" = 0 ] && echo "готово: сайт совпадает со сборкой" || { echo "есть ошибки, см. выше" >&2; exit 1; }
