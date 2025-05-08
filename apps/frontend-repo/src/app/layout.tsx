import './globals.css'
import { Providers } from '~/app/provider'

const RootLayout: React.FC<any> = ({ children }: { children: React.ReactNode }): React.ReactNode => {
	return (
		<html lang='en' suppressHydrationWarning>
			<body suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}

export default RootLayout
