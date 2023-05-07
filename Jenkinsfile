pipeline {
    agent any

     stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/kountak/Devops_project.git']]])
            }
        }

    stages {
        stage('Build') {
            steps {
                // Clone le code source depuis GitHub
                git 'https://github.com/kountak/Devops_project.git'

                // Construit l'image Docker
                sh 'docker build -t calculator .'
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


