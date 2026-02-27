pipeline {
    agent any

    environment {
        IMAGE_NAME = "taskmanager-app"
        CONTAINER_NAME = "taskmanager-container"
        ZAP_REPORT = "zap-report.html"
        TRIVY_REPORT = "trivy-report.html"
    }
    tools {
        nodejs 'nodejs-22-6-0'
    }
    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Chahatyadav1/TaskManager.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                sh 'npm test -- --coverage'
            }
         }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER .'
            }
        }

        stage('Trivy Scan') {
            steps {
                sh """
                trivy image \
                --format html \
                --output $TRIVY_REPORT \
                $IMAGE_NAME:$BUILD_NUMBER
                """
            }
        }

        stage('Run Application Container') {
            steps {
                sh """
                docker run -d \
                --name $CONTAINER_NAME \
                -p 3000:3000 \
                $IMAGE_NAME:$BUILD_NUMBER
                sleep 15
                """
            }
        }

        stage('OWASP ZAP Baseline Scan') {
            steps {
                sh """
                docker run --rm \
                --network=host \
                -v \$(pwd):/zap/wrk/:rw \
                ghcr.io/zaproxy/zaproxy:stable \
                zap-baseline.py \
                -t http://localhost:3000 \
                -r $ZAP_REPORT
                """
            }
        }

        stage('Publish Reports') {
            steps {
                publishHTML(target: [
                    reportDir: '.',
                    reportFiles: "$ZAP_REPORT",
                    reportName: "OWASP ZAP Report"
                ])

                publishHTML(target: [
                    reportDir: '.',
                    reportFiles: "$TRIVY_REPORT",
                    reportName: "Trivy Scan Report"
                ])

                archiveArtifacts artifacts: '*.html', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            sh 'docker stop $CONTAINER_NAME || true'
            sh 'docker rm $CONTAINER_NAME || true'
        }
    }
}
    post {
        always {
            sh 'docker stop $CONTAINER_NAME || true'
            sh 'docker rm $CONTAINER_NAME || true'
        }
        success {
            echo "Build and scan successful "
        }
        failure {
            echo "Pipeline failed "
        }
    }
}
