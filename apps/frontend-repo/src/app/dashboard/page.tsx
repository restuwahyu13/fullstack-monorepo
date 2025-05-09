import AuthGuard from '~/app/auth'

const Dashboard: React.FC<any> = (): React.ReactNode => {
	return (
		<AuthGuard>
			<div>Dashboard</div>
		</AuthGuard>
	)
}

export default Dashboard
