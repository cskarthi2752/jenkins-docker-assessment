pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Test Application') {
            steps {
                sh 'docker compose up -d'
                sh 'sleep 15'
                sh 'docker compose ps'
                sh 'curl -f http://localhost:8080/api'
                sh 'curl -f http://localhost:8080/health'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                sh '''
                docker run --rm \
                  -v /var/run/docker.sock:/var/run/docker.sock \
                  aquasec/trivy:latest \
                  image \
                  --severity HIGH,CRITICAL \
                  --exit-code 0 \
                  jenkins-docker-assessment-backend:latest
                '''

                sh '''
                docker run --rm \
                  -v /var/run/docker.sock:/var/run/docker.sock \
                  aquasec/trivy:latest \
                  image \
                  --severity HIGH,CRITICAL \
                  --exit-code 0 \
                  jenkins-docker-assessment-frontend:latest
                '''
            }
        }

        stage('Deployment') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Health Check') {
            steps {
                sh 'sleep 10'
                sh 'curl -f http://localhost:8080/health'
            }
        }

        stage('Cleanup') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }

    post {
        always {
            sh 'docker compose ps || true'
        }

        success {
            echo 'Jenkins CI/CD Pipeline completed successfully.'
        }

        failure {
            echo 'Jenkins CI/CD Pipeline failed.'
        }
    }
}