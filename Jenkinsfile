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
        sh '''#!/bin/bash

echo "Hello World"'''
      }
    }
  }
}