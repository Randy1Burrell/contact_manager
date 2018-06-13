pipeline {
  agent {
    docker {
      args 'args \'-u root\''
      image 'node:8'
    }
  }
  stages {
    stage('Build') {
      steps {
        sh 'echo "Hello World"'
      }
    }
  }
}