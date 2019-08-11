module.exports = {
  apps: [{
    name: 'project.stoffel',
    script: './server/server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-217-145-40.compute-1.amazonaws.com',
      key: '~/.ssh/accountflow.pem',
      ref: 'origin/dev',
      repo: 'git@github.com:badgerads/project.stoffel.git',
      path: '/home/ubuntu/project.stoffel',
      'post-deploy': 'cp ~/.env . && npm install && npm run build && pm2 startOrRestart ecosystem.config.js'
    }
  }
}