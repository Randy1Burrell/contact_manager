pipeline {
  agent {
    dockerfile true
  }
  stages {
    stage('Build') {
      steps {
        sh 'echo "Hello World"'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }
}