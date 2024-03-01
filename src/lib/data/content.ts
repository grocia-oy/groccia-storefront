import qs from "qs"

const STRAPI_ENDPOINTS = {
  GLOBAL: "/global",
  HOMEPAGE: "/homepage",
}

export function getStrapiURL(path = "") {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`
}

function getAPIAccessToken() {
  const accessToken = process.env.NEXT_PUBLIC_STRAPI_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error("Cannot find Strapi Access Token in environment variables")
  }

  return accessToken
}

function generateBaseHeaders(
  accessToken: string,
  additionalHeaders?: Record<string, any>
) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    ...additionalHeaders,
  }
}

async function fetchStrapiAPI(
  path: string,
  urlParamsObject = {},
  options = {}
) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      ...options,
    }

    // Build request URL
    const queryString = qs.stringify(urlParamsObject)
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`
    )}`

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions)

    const data = await response.json()

    return data
  } catch (error) {
    throw new Error(`Cannot making request to the server: ${error}`)
  }
}

async function getGlobal(
  locale: string,
  populate: string[] = ["favicon", "announcement_bar"]
) {
  const accessToken = getAPIAccessToken()

  // Prepare options for the API Request
  const options = { headers: generateBaseHeaders(accessToken) }
  const urlQsParams = {
    populate,
    locale,
  }

  return await fetchStrapiAPI(STRAPI_ENDPOINTS.GLOBAL, urlQsParams, options)
}

async function getHomePage(
  locale: string,
  populate: string[] = ["hero_carousel.image", "hero_carousel.buttons", "seo"]
) {
  const accessToken = getAPIAccessToken()

  const options = { headers: generateBaseHeaders(accessToken) }
  const urlQsParams = {
    populate,
    locale,
  }
  return await fetchStrapiAPI(STRAPI_ENDPOINTS.HOMEPAGE, urlQsParams, options)
}

export { getGlobal, getHomePage }
