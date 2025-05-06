module.exports = {
	apps: [
		{
			name: 'frontend-monorepo',
			script: 'npm',
			args: 'start',
			watch: false,
			interpreter: 'none',
			max_memory_restart: '512M',
			listen_timeout: 3000,
			kill_timeout: 6000,
			combine_logs: true,
			error_file: 'logs/frontend-error.log',
			out_file: 'logs/frontend-out.log',
			time: true
		}
	]
}
