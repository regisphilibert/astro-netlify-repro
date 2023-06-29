import { createClient } from '@sanity/client'
import site, { sanity } from '@data/site';

const { projectId, apiVersion, useCdn, token = false} = sanity

const client = createClient({
  projectId,
  dataset: 'production',
  useCdn, // set to `false` to bypass the edge cache
  apiVersion, // use current date (YYYY-MM-DD) to target the latest API version
  token
})

const normalFetch = async function(params_input) {
  const { query, params = {} } = params_input
  const output = await client.fetch(query, params)
  return output
}

export default async function(params_input) {
  const { hash = false, forceCache = false } = params_input
  // We use the cash only if `hash` is set and not in developement.
  let useCache = hash && !import.meta.env.DEV
  // If forceCache is set to true, we use the cache no matter what.
  if(hash && forceCache){
    useCache = true
  }

  useCache = false
  
  return await normalFetch(params_input)
}