module.exports = {
  apps: [
    {
      name: 'backend-monorepo',
      script: 'npm',
      args: 'start',
      watch: false,
      exec_mode: 'cluster',
      instances: 'max',
      max_memory_restart: '512M',
      listen_timeout: 3000,
      kill_timeout: 6000,
      combine_logs: true,
      error_file: 'logs/backend-error.log',
      out_file: 'logs/backend-out.log',
      time: true,
    },
  ],
}
