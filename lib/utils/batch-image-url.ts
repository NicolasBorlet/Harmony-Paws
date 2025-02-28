import { supabase } from '../supabase'

/**
 * Generate batch image URLs for multiple items
 *
 * This function optimizes the process of getting multiple image URLs
 * by batching the requests instead of making individual calls
 *
 * @param ids Array of item IDs
 * @param bucket Storage bucket name
 * @param prefix Optional path prefix
 * @returns Object with ID keys and URL values
 */
export const generateBatchImageUrls = async (
  ids: (string | number)[],
  bucket: string = 'public',
  prefix: string = '',
): Promise<Record<string, string>> => {
  if (!ids || ids.length === 0) return {}

  const result: Record<string, string> = {}

  // Convert all IDs to strings for consistency
  const stringIds = ids.map(id => id.toString())

  // Create paths for each ID
  const paths = stringIds.map(id => `${prefix}${id}.jpg`)

  try {
    // Get signed URLs for all images in one batch request
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrls(paths, 3600) // 1 hour expiration

    if (error) throw error

    // Map the results back to the original IDs
    data?.forEach((item, index) => {
      const id = stringIds[index]
      result[id] = item.signedUrl
    })

    return result
  } catch (error) {
    console.error('Error generating batch image URLs:', error)
    return {}
  }
}
