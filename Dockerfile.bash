# Utilise l'image Python comme base
FROM python:3.7-slim

# Installe les dépendances de l'application
RUN pip install flask

# Définit le répertoire de travail
WORKDIR /app

# Copie le code source de l'application
COPY . .

# Expose le port sur lequel l'application va écouter (par défaut : 5000)
EXPOSE 5000

# Démarre le serveur Flask lorsque le conteneur est lancé
CMD ["python", "app.py"]
