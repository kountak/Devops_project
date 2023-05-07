pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                // Clone le code source depuis GitHub
                git 'https://github.com/kountakr/Devops_project.git'

                // Construit l'image Docker
                sh 'docker build -t calculatorr .'
            }
        }

        stage('Push') {
            steps {
                // Envoie l'image vers le registre Docker (par exemple Docker Hub)
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh "docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD"
                    sh "docker tag calculator $DOCKER_USERNAME/calculator"
                    sh "docker push $DOCKER_USERNAME/calculator"
                }
            }
        }

        stage('Deploy') {
            steps {
                // Démarre les conteneurs Docker à l'aide de docker-compose
                sh 'docker-compose up -d'
            }
        }
    }
}


