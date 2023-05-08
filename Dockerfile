# Utilise l'image Python comme base
FROM python:3.9-slim-buster

# Définit le répertoire de travail
WORKDIR /calculator

# Copie le répertoire courant 
COPY . /calculator

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Expose le port sur lequel l'application va écouter (par défaut : 5000)
EXPOSE 8080

# Démarre le serveur Flask lorsque le conteneur est lancé
CMD ["python", "calculator.py", "--port=8080"]