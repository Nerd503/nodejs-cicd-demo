pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Nerd503/nodejs-cicd-demo.git'
            }
        }
        
        stage('Check Environment') {
            steps {
                sh '''
                    set -eu
                    node --version
                    npm --version
                    git --version
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Artifact') {
            steps {
                sh '''
                    set -eu
                    # Use --warning=no-file-changed to ignore file modification warnings
                    # This is safe because Jenkins may touch files during the build
                    tar --exclude=node_modules \
                        --exclude=.git \
                        --exclude='*.tar.gz' \
                        --warning=no-file-changed \
                        -czf nodejs-app.tar.gz .
                '''
            }
        }
        
        stage('Archive Artifact') {
            steps {
                archiveArtifacts artifacts: 'nodejs-app.tar.gz', fingerprint: true
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check Console Output.'
        }
        always {
            cleanWs(deleteDirs: true, patterns: [[pattern: 'nodejs-app.tar.gz', type: 'INCLUDE']])
        }
    }
}
