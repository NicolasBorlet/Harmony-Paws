import { supabase } from '../lib/supabase'

async function testSupabaseConnection() {
  console.log('Testing Supabase connection...')

  try {
    // Test connection by getting Supabase server time
    const { data: timeData, error: timeError } = await supabase.rpc('get_time')

    if (timeError) {
      console.error('Error connecting to Supabase:', timeError.message)
      return
    }

    console.log('✅ Successfully connected to Supabase!')
    console.log('Server time:', timeData)

    // Test formations table
    console.log('\nFetching formations data...')
    const { data: formations, error: formationsError } = await supabase
      .from('formations')
      .select('*')

    if (formationsError) {
      console.error('Error fetching formations:', formationsError.message)
      return
    }

    console.log(`✅ Successfully fetched ${formations.length} formations!`)

    if (formations.length === 0) {
      console.log(
        'No formations found. You may need to add data to your table.',
      )
    } else {
      console.log('First formation:', formations[0])
    }
  } catch (error) {
    console.error('Unexpected error:', error.message)
  }
}

testSupabaseConnection()
