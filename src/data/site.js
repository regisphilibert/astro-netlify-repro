export default {
  title: 'Repro Netlify Issue'
}

export const sanity = {
  projectId: 'sz68jx2w',
  dataset: 'production',
  apiVersion: '2022-12-14',
  useCdn: false,
  token: import.meta.env.SANITY_TOKEN ? import.meta.env.SANITY_TOKEN : false
}