import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname
})

const eslintConfig = [
	...compat.config({
		extends: ['next'],
		rules: {
			'@typescript-eslint/no-require-imports': 0,
			'@typescript-eslint/no-explicit-any': 0
		}
	})
]

export default eslintConfig
