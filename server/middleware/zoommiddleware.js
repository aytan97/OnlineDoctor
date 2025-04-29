const KJUR = require('jsrsasign')

const { v4: uuidv4 } = require('uuid')

const generateToken = async (req, res, next) => {
  try {
    const iat = Math.round(new Date().getTime() / 1000)

    const expDate = new Date(req.body.date)
    console.log(expDate)
    expDate.setDate(expDate.getDate() + 1)
    const exp = Math.round(expDate.getTime())

    const oHeader = { alg: 'HS256', typ: 'JWT' }
    console.log(oHeader)

    const { topic, password, userIdentity, sessionKey, roleType } = req.body
    const sdkKey = process.env.SDK_KEY
    const sdkSecret = process.env.SDK_SECRET
    const appKey = process.env.SDK_API
    const oPayload = {
      appKey: sdkKey,
      role_type: roleType,
      tpc: topic,
      version: 1,
      iat,
      exp,
      user_identity: userIdentity,
      session_key: sessionKey,
    }

    const sHeader = JSON.stringify(oHeader)
    const sPayload = JSON.stringify(oPayload)
    const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret)

    res.locals.signature = signature
    res.locals.expDate = exp
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = { generateToken }
