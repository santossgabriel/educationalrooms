const { spawn } = require('child_process')
const args = ['start']
const opts = {
  stdio: 'inherit',
  cwd: 'client/react',
  shell: true
}
spawn('npm', args, opts)