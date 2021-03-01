#!/usr/bin/env sh

if [ $DEVELOPMENT = "true" ]
then
  echo Running development image
else
  echo Running production image
fi

uvicorn src.main:app \
  --host 0.0.0.0 \
  --port 80 \
  --lifespan on \
  $([ "${DEVELOPMENT}" = "true" ] && echo --reload)
