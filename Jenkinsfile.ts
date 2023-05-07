pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/main']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[url: 'https://github.com/kountak/Devops_project.git']]])
            }
        }

        stage('Build and Push Image') {
            steps {
                script {
                    docker.build("kountak/calculator:latest")
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials') {
                        docker.image('kountak/calculator:latest').push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sshagent(['ssh-key']) {
                        sshCommand remote: remote, command: 'docker-compose pull && docker-compose up -d'
                    }
                }
            }
        }
        stage('test') {
            steps {
                sh "docker run --rm calculator pytest"
            }
        }
    }
}

