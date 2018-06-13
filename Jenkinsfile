pipeline {
  agent {
    dockerfile {
      filename 'Dockerfile'
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