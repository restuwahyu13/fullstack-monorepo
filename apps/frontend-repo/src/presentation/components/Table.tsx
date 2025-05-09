import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, useMediaQuery, useTheme } from '@mui/material'
import { Edit } from '@mui/icons-material'

const TableComponent: React.FC<any> = (props: Record<string, any>) => {
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	return (
		<TableContainer component={Paper} className='shadow-md rounded-lg overflow-x-auto'>
			<Table stickyHeader aria-label='sticky table'>
				<TableHead>
					<TableRow>
						{props?.columns.map((column) => (
							<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }} className='bg-blue-50 font-bold'>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{props?.rows?.map((row) => (
						<TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
							{props?.columns?.map((column) => {
								if (column.id === 'actions') {
									return (
										<TableCell key={column.id} align={column.align}>
											<IconButton onClick={() => props?.handleEditClick(row)} className='text-blue-500 hover:text-blue-700'>
												<Edit fontSize={isMobile ? 'small' : 'medium'} />
											</IconButton>
										</TableCell>
									)
								}
								return (
									<TableCell key={column.id} align={column.align}>
										{row[column.id]}
									</TableCell>
								)
							})}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default TableComponent
