#Use same container as PostgreSQL DB
FROM postgres:latest
COPY worker.py /
ENTRYPOINT ["/usr/bin/python", "/worker.py"]