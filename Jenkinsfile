pipeline {
  agent {
    docker {
      image 'node'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh '''#!/bin/bash

echo "Hello World"'''
      }
    }
  }
}