FROM python:3.11-alpine3.15
WORKDIR /app
COPY . /app
RUN apt-get update && \
    apt-get install -y git
RUN pip install -r requirements.txt
EXPOSE 5000
CMD flask db upgrade && python app.py
