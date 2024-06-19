pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        git(branch: 'master', url: 'https://github.com/juancruzmarq/board-games')
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

    stage('Deploy') {
      steps {
        sh 'npm run preview'
      }
    }

  }
  post {
    always {
      cleanWs()
      echo 'This will always run'
    }

    success {
      echo 'This will run only if successful'
    }

    failure {
      echo 'This will run only if failed'
    }

    unstable {
      echo 'This will run only if the run was marked as unstable'
    }

    changed {
      echo 'This will run only if the state of the Pipeline has changed'
      echo 'For example, if the Pipeline was previously failing but is now successful'
    }

  }
}