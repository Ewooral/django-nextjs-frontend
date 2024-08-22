import {query} from '@/lib/postgres_supabase_connection'
import { stat } from 'fs'
export const dynamic = 'force-dynamic' // defaults to auto

export async function GET() {
let res
  try {
     res = await query('SELECT COUNT(*) from users', [])
  } catch(e) {
    console.error('Theres being an error:', e)
    return new Response(JSON.stringify({ error: e }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  
  }

  return new Response(JSON.stringify({res:res.rows[0]}), {
    headers: { 'Content-Type': 'application/json' },
    status: 200,
  })
}