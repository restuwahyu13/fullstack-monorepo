import { NextResponse } from 'next/server'

export const POST = async (_req: Request) => {
	return NextResponse.json({ status: 200, message: 'Success POST' })
}

export const GET = async (_req: Request) => {
	return NextResponse.json({ status: 200, message: 'Success GET' })
}
