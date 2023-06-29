import EleventyFetch from '@11ty/eleventy-fetch'
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

const cachedFetch = async function(params_input) {
  const { query, params = {}, hash = "unique" } = params_input
  let url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/production#${hash}`
  const cacheDir = site.env == "dev" ? ".cache" : "/tmp/.cache/"
  const response = await EleventyFetch(url, {
    duration: site.env ==  "dev" ? "1h" : "5m", // save for 5m in production
    type: "json",    // we’ll parse JSON for you
    directory: cacheDir,
    fetchOptions: {
      method: "POST",
      body: JSON.stringify({query, params}),
      headers: {
        // lol
        "Content-Type":"application/groq"
      }
    }
  }).then((res) => res.result );
  return response
}

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
  
  if(useCache) {
    return await cachedFetch(params_input)
  } else {
    return await normalFetch(params_input)
  }
}