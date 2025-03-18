import { Agent } from '@credo-ts/core'
import { BifoldLogger, Screens, Stacks } from '@hyperledger/aries-bifold-core'
import { b64decode, connectFromInvitation } from '@hyperledger/aries-bifold-core/App/utils/helpers'
import {
  InvitationQrTypes,
  isOpenIdCredentialOffer,
  isOpenIdPresentationRequest,
} from '@hyperledger/aries-bifold-core/App/utils/parsers'
import { parseUrl } from 'query-string'

const processBetaUrlIfRequired = (uri: string): string => {
  // _oob is a beta query param, not supported by Credo.
  let aUrl = uri.replace('_oob', 'oob')

  // _url is a beta query param, not supported by Credo.
  if (uri.includes('_url')) {
    const queryParams = parseUrl(uri)?.query
    const b64UrlRedirect = queryParams['_url']
    aUrl = b64decode(b64UrlRedirect as string)
  }

  return aUrl
}

export const connectFromScanOrDeepLink = async (
  uri: string,
  agent: Agent | undefined,
  logger: BifoldLogger,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigation: any,
  isDeepLink: boolean,
  implicitInvitations: boolean = false,
  reuseConnection: boolean = false,
  redirect: string | undefined = undefined
) => {
  if (!agent) {
    return
  }

  // TODO:(jl) Do we care if the connection is a deep link?
  logger.info(`Attempting to connect from ${isDeepLink ? 'deeplink' : 'qr scan'}`)
  try {
    if (isOpenIdCredentialOffer(uri)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigation.navigate(Stacks.ConnectionStack as any, {
        screen: Screens.Connection,
        params: { oobRecordId: '', openIDUri: uri },
      })

      return
    }

    if (isOpenIdPresentationRequest(uri)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigation.navigate(Stacks.ConnectionStack as any, {
        screen: Screens.Connection,
        params: { oobRecordId: '', openIDPresentationUri: uri },
      })

      return
    }

    if (
      uri.startsWith(InvitationQrTypes.DIDCOMM) &&
      !(uri.includes('c_i=') || uri.includes('oob=') || uri.includes('oobUrl=') || uri.includes('d_m='))
    ) {
      uri = uri.replace(InvitationQrTypes.DIDCOMM, InvitationQrTypes.HTTPS)
    }

    const aUrl = processBetaUrlIfRequired(uri)
    const receivedInvitation = await connectFromInvitation(aUrl, agent, implicitInvitations, reuseConnection)

    if (receivedInvitation?.id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      navigation.navigate(Stacks.ConnectionStack as any, {
        screen: Screens.Connection,
        params: { oobRecordId: receivedInvitation.id, redirectQueryParam: redirect },
      })
    }
  } catch (error: unknown) {
    logger.error('Problem during connect strategy, error:', error as Error)

    throw error
  }
}
