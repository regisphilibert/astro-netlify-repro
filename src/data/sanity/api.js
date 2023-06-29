import groq from 'groq'
import sanityFetch from "@util/sanity/fetch"

const STAFF_MEMBER = groq`{
  'id': _id,
  title,
  first_name,
  last_name,
  'slug': slug.current,
  'type': _type,
  'url': '/saff/' + _id,
  'section': "staff",
  'email': 'none@none.no'
}`

export async function getEntry(id){
  const query = groq`*[_id == $id][0]${STAFF_MEMBER}`
  const entry = await sanityFetch({query, params:{
    id
  }});
  return entry
}

export async function getStaffMembers() {

  const query = groq`*[
    !(_id in path('drafts.**'))
    && _type == "person"
    && "staff" in associations
  ] | order(publishedAt desc)[]${STAFF_MEMBER}`;
  const entries = await sanityFetch({query});
  return entries
}