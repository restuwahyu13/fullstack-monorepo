import Table from '~/presentation/components/Table'
import Modal from '~/presentation/components/Modal'

const DashboardView: React.FC<any> = (props: Record<string, any>) => {
	return (
		<div className='p-4'>
			<Table {...props} />
			<Modal {...props} />
		</div>
	)
}

export default DashboardView
