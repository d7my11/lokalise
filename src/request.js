import { LokaliseApi } from '@lokalise/node-api'

export const bundle = async (apiToken, projectId) => {
  const lokaliseApi = new LokaliseApi({ apiKey: apiToken })
  const response = await lokaliseApi.files.download(projectId, {
    format: 'json',
    bundle_filename: '%PROJECT_NAME%-intl.zip',
    bundle_structure: '%LANG_ISO%.%FORMAT%'
  })
  if (response.response.status === 'success') {
    return response.bundle.file
  }
  if (response.response.status === 'error') {
    throw new Error(response.response.status)
  }
  throw new Error(`Invalid response: ${JSON.stringify(response)}`)
}
