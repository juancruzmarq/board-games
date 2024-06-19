pipeline {
  agent any
  stages {
    stage('Checkout code') {
      steps {
        git(url: 'https://github.com/juancruzmarq/board-games', branch: 'master')
      }
    }

    stage('') {
      steps {
        sh 'ls -la'
      }
    }

  }
}