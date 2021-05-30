const GoogleSpreadsheet = require('google-spreadsheet')

const sheet_key = '1pd9i8e5hNMFnz4vD7PzGjKpUhFOxNE66_vU0GY7bWBQ'

const API_SECRET='MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkAtJElnubxJ3Q'
const API_SECRET_2='ZK2SjHA+zsHCPHwQPIbND8MbJ0aFPgFXQRwXvfq/1kFYzS3zt3I3JL8eKapHrUjx'
const API_SECRET_3='JU6vhh9TSVOkMfLOoz7D8V0zshTx2J0nc7wIveA3uBzjnxEuWPoSOhpvD1AOln1P'
const API_SECRET_4='ksS2270PnRpkhTY1FfRqu4+6856hjRWOd0DKq1+7Eqx4vrA+p0asS7oLDXDgRO1F'
const API_SECRET_5='/1TkvxmWKjrvwA/7WYNUUzvF8B706AoH7pIV3IM+u16n47s2wX2gvGMbLBm9XFcJ'
const API_SECRET_6='t3zD1Y3wdB14yAwRYy4bGD0lMjC4k/YgcmYqKKPjHBFl6XdPla4oETCy7uWu+9TC'
const API_SECRET_7='HawukMtPAgMBAAECggEACYMMnovgkDj9lGn+y7RMInKhpqa7TjoYLYnQy9sxl/Fk'
const API_SECRET_8='QO2YbG0ifspDY577ocUvYJmJ14pJbkAOYPD7fVsNB35xnNHwnSo2PhpdlwCA2y38'
const API_SECRET_9='MF8lov+40No/akeCgfp4RDZkT+nFnzYr+BvZVP+JvZMCPNtJzaEi1ykH7/al0Xtr'
const API_SECRET_10='E4355gDOwbmDDv2iAUyyqauq1RlY40bC0puc4ukha62jtUKxyRwqMg/grEKimAtQ'
const API_SECRET_11='uYXrdhWaaVTVVH0glWuPu7R+Hc6umQYCvidBoi6QkQWHHfaLvD5lEbC8gi/vp8zL'
const API_SECRET_12='3ImomMiN0xobQh8iQojtVIsSNFHsWtQXnVqT8A+LcQKBgQD8Qa1RBpY4wT6HyuaO'
const API_SECRET_13='1YXviXqEgll9nqhdjCnWaTEdd4r92JxPJMQvHRbwQBsUe6u0hReU1WrdBkBqUlu/'
const API_SECRET_14='7NohvQI/hyzB4Banx+o5Z46OySr6/KoGzg60X1CjFtGm223BQpRu04Y/F6z+5Ocb'
const API_SECRET_15='SziTHdOLvVFux9/S+iYIBo8uBQKBgQDnZQkZJ6UXwc8zbSu/YWLjjhfDafk960/1'
const API_SECRET_16='ST455GzOiXRpM8Emi338LU2kdrpeTrvLOe5OVwENgcYs9BtzdzW3uKIvWR6UYW3I'
const API_SECRET_17='Vgb2ccuDx8S4iXHyRlBrfi+Eztm3xSLeCPwCuHgzYyFSJ6TgEwwHnQYkXGpGtCE1'
const API_SECRET_18='hRfrEoTAQwKBgQDvj/Pn8ihx59vZnDDPTyqubNKEy0Hv0eA1TypgbG/vexrtrmvr'
const API_SECRET_19='oZAK6kZhjY/qKPTNMGRPvUqKcyhzkJl/sJEL33MmH9q6mHULjAj90UIKijOePpu+'
const API_SECRET_20='cKx4UdjDuaULIHKgSfmrMojYnER3oa11Nz+YP4gqunV+jqUauOOrVYdefQKBgE0K'
const API_SECRET_21='eqkBZhou0QnSQ0qI5h/VY1wQoIdZHVoRdMJZp1Bsu3F7ZcerkdqwSrWDQjG8DRJw'
const API_SECRET_22='y0MR/Ku+lXjKHYmoGx58PqN9DI1ikuasnczXvma10G2QdXuwpX3kmXWiWSKyZBWA'
const API_SECRET_23='8EcHnB2f16w+vspMDSlLwovAqTG5L4VeNsRxefl5AoGAMwtpWTTcOCnG3x8q5pIH'
const API_SECRET_24='ybC1OrHUzUFkpgaqN8QeUNTJTolSdwZvCAqfoqheyEzsOpj7fMkbhqeMWm5hT81u'
const API_SECRET_25='7zyR/cITG6oZxJPvBcsTBlSeOINC29/UOwYyECfJv0M3Pypak/sBFC/zIofvdrUq'
const API_SECRET_26='Zdb/wTpbCDjG/89G0W/49NA='

const creds_json = {
  private_key:`-----BEGIN PRIVATE KEY-----\n${API_SECRET}\n${API_SECRET_2}\n${API_SECRET_3}\n${API_SECRET_4}\n${API_SECRET_5}\n${API_SECRET_6}\n${API_SECRET_7}\n${API_SECRET_8}\n${API_SECRET_9}\n${API_SECRET_10}\n${API_SECRET_11}\n${API_SECRET_12}\n${API_SECRET_13}\n${API_SECRET_14}\n${API_SECRET_15}\n${API_SECRET_16}\n${API_SECRET_17}\n${API_SECRET_18}\n${API_SECRET_19}\n${API_SECRET_20}\n${API_SECRET_21}\n${API_SECRET_22}\n${API_SECRET_23}\n${API_SECRET_24}\n${API_SECRET_25}\n${API_SECRET_26}\n-----END PRIVATE KEY-----\n`,
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
