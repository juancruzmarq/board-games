pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    environment {
        PATH = "${tool 'nodejs'}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout')
         {
            steps {
                git branch: 'master', url: 'https://github.com/juancruzmarq/board-games'
            }
         }
        
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'npm run preview'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Deploy') {
      steps {
        sh 'npm run preview'
      }
    }

  }
  post {
    always {
      cleanWs()
    }
  }
}
