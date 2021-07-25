import React, { useRef, useState } from "react";
import * as firebase from "../method/firebase";
import Icon from '@/Icon'
import { faSync } from '@fortawesome/free-solid-svg-icons'

const MyCustomButton = (props) => {
  return <button className="bg-black text-white py-1 text-xs p-3 rounded-full" onClick={props.onClick} >Change pic</button>;
};

const UploadButton = ({action}) => {
    const ref = useRef(undefined);
    const [loading, setLoad] = useState(false)
    const handleClick = () => {
        if (ref) {
            return ref.current?.click();
        }
    };

    const handleUpload = async (event) => {
        const uploadedFile = event?.target.files[0];
        if (!uploadedFile) return;
        setLoad(true)
        const uploadResponse = await firebase.uploadFile(uploadedFile);
        if (uploadResponse.status){
            action(uploadResponse.imagePath)
        }
        setLoad(false)
    };

    return (
        <div className="flex items-center justify-center mt-2">
          <MyCustomButton onClick={() => handleClick()} />
          { loading && <span className="ml-2"><Icon fill={faSync}/></span> }
          <input
            type="file"
            ref={ref}
            accept=".png, .jpg, .jpeg"
            hidden
            onChange={handleUpload}
          />
        </div>
    );
};

export default UploadButton;


// const firestore = admin.firestore()
// const bucket = firebase.storage().bucket()

// const uploadMedia = async (mediaList: Media[]): Promise<Array<Media & { ipfsHash: string }>> => {
//   return Promise.all(
//     mediaList.map(async media => {
//       const ipfsHash = media.src.split('/').pop()!
//       const filepath = `ipfs-media/${ipfsHash}`
//       const documentRef = firestore.collection('ipfsToContent').doc(ipfsHash)
//       const document = await documentRef.get()
//       let newUrl: string
//       if (!document.exists) {
//         const response = await axios.get<Buffer>(media.src, { responseType: 'arraybuffer' })
//         console.log('saving', ipfsHash)
//         await bucket.file(filepath).save(response.data)
//       }
//       newUrl = (
//         await bucket.file(filepath).getSignedUrl({
//           action: 'read',
//           expires: dayjs().add(1, 'year').toDate(),
//         })
//       )[0]
//       await documentRef.set({ type: media.type, src: newUrl })
//       return { type: media.type, src: newUrl, ipfsHash }
//     })
//   )
// }
