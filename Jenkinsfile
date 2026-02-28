pipeline {
agent {
  kubernetes {
    cloud 'kind'
    namespace 'jenkins'
    defaultContainer 'busybox'
    yaml '''
apiVersion: v1
kind: Pod
metadata:
  labels:
    some-label: some-label-value
spec:
  containers:
  - name: busybox
    image: busybox
    command:
    - sleep
    args:
    - 99d
'''
  }
}


    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:${env.PATH}"
        MONGO_URI = "mongodb://root:root@localhost:27017/taskdb?authSource=admin"
        IMAGE_NAME = "chahatyadav1/taskmanager"
        CONTAINER_NAME = "taskmanager-container"
        ZAP_REPORT = "zap-report.html"
        TRIVY_REPORT = "trivy-report.html"
    }
    tools {
        nodejs 'nodejs-24-14-0'
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
                sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
            }
        }

        stage('Trivy Scan') {
            
        environment {
        DOCKER_CONFIG = "${WORKSPACE}/.docker"
        TRIVY_NO_PROGRESS = "true"
            }
            steps {
                sh """
                curl -L https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/html.tpl -o html.tpl
                trivy image \
                --format template \
                --template "@html.tpl" \
                --report summary \
                --output ${TRIVY_REPORT} \
                ${IMAGE_NAME}:${BUILD_NUMBER} 
                """
            }
        }
      //  stage("PUSH TO DOCKERHUB"){
     //    steps{
     //        withDockerRegistry(credentialsId: 'docker-token', url: 'https://index.docker.io/v1/') {
    //           sh 'docker --version'
      //            sh "docker push ${IMAGE_NAME}:${BUILD_NUMBER}"
        //       }
          //  }
       // }
        stage('Run Application Container') {
            steps {
                sh """
                docker run -d \
                --name $CONTAINER_NAME \
                -e MONGO_URI="mongodb://root:root@mongo:27017/taskdb?authSource=admin" \
                --network app-network \
                -p 3000:3000 \
                $IMAGE_NAME:$BUILD_NUMBER
                sleep 15
                """
            }
        }

     /*   stage('OWASP ZAP Baseline Scan') {
            steps {
                sh """
                docker run --rm \
                --network=app-network \
                -v \$(pwd):/zap/wrk/:rw \
                ghcr.io/zaproxy/zaproxy:stable \
                zap-baseline.py \
                -t http://localhost:3000 \
                -r $ZAP_REPORT
                """
            }
        }
*/
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
    success {
        echo "Build and scan successful"
    }
    failure {
        echo "Pipeline failed"
    }
  } 
}

