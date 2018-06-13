pipeline {
  agent {
    docker {
      image 'node'
      args 'args \'-u root\''
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