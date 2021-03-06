### Python dependencies stage ###
FROM python:3.9.2-slim as deps

WORKDIR /bsk/api/

## Pipenv
COPY ./docker/pipenv-requirements.txt /bsk/api/
RUN pip install --no-cache-dir -r pipenv-requirements.txt

## Python venv
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH" VIRTUAL_ENV="/opt/venv"

## Python dependencies
COPY ./Pipfile ./Pipfile.lock /bsk/api/
RUN pipenv install --deploy



### Tests and linting ###
FROM deps as tests

ARG DEVELOPMENT=false

ENV PYTHONDONTWRITEBYTECODE 1

## Python dependencies
RUN pipenv install --deploy --dev

## Copy project
COPY ./src /bsk/api/src/
COPY ./docker/tox.ini /bsk/api/tox.ini
COPY ./tests /bsk/api/tests

## Analyze project
# Run linter
RUN if [ "$DEVELOPMENT" = "false" ]; then \
        flake8 /bsk/api/src/ \
    ; fi
# Run tests
RUN if [ "$DEVELOPMENT" = "false" ]; then \
        pytest /bsk/api/tests/ \
    ; fi



### Runtime Appilcation
FROM python:3.9.2-slim

WORKDIR /bsk/api/

## Entrypoint
COPY ./docker/entrypoint.sh /bsk/api/entrypoint.sh
RUN chmod +x /bsk/api/entrypoint.sh
CMD ["/bsk/api/entrypoint.sh"]

# expose port 80
EXPOSE 80
# disable python .pyc
ENV PYTHONDONTWRITEBYTECODE 1
# force unbuffered output
ENV PYTHONUNBUFFERED 1

## Copy from previous stages
# copy venv
COPY --from=deps /opt/venv/ /opt/venv/
# add venv to path
ENV PATH="/opt/venv/bin:$PATH" VIRTUAL_ENV="/opt/venv"
# copy sources
COPY ./src /bsk/api/src
