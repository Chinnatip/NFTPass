const GoogleSpreadsheet = require('google-spreadsheet')

const sheet_key = '1pd9i8e5hNMFnz4vD7PzGjKpUhFOxNE66_vU0GY7bWBQ'
const creds_json = {
  private_key:`-----BEGIN PRIVATE KEY-----\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_2}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_3}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_4}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_5}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_6}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_7}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_8}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_9}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_10}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_11}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_12}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_13}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_14}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_15}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_16}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_17}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_18}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_19}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_20}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_21}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_22}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_23}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_24}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_25}\n${process.env.NEXT_PUBLIC_GOOGLE_API_SECRET_26}\n-----END PRIVATE KEY-----\n`,
  client_email: 'kohlife-admin@quickstart-1572411459716.iam.gserviceaccount.com'
}

// PRIVATE FUNC
const googleFindSheet = (sheetName, info) => {
  let sheet_index = 0
  info.worksheets.map((sheet, index) => {
    if (sheet.title === sheetName) {
      sheet_index = index
    }
  })
  return info.worksheets[sheet_index]
}

const sheetDocument = async (key) => {
  const doc = new GoogleSpreadsheet(key)
  return await new Promise((resolve,_) => {
    doc.useServiceAccountAuth(creds_json, () => {
      doc.getInfo((_,info) => {
        resolve(info)
      })
    })
  })
}

const addRow = async (sheet , parcel) => {
  return await new Promise((resolve,_) => {
    sheet.addRow(parcel, () => (
      resolve('success')
    ))
  })
}

export const createOrder = async (parcel) => {
  const sheet = await sheetDocument(sheet_key)
  const list = await googleFindSheet('creator_list', sheet)
  console.log(parcel)
  const status = await addRow( list , {
    email: parcel.email,
    address: parcel.address,
    openseaurl: parcel.opensea_url,
    raribleurl: parcel.rarible_url,
    suggestion: parcel.suggestion
  })
  return { status: status }
}
