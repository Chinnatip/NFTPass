import React, { useRef, useState } from "react";
import * as firebase from "../method/firebase";
import Icon from '@/Icon'
import { faSync } from '@fortawesome/free-solid-svg-icons'

const MyCustomButton = (props) => {
  return <button className="bg-black text-white py-1 text-xs p-3 rounded-full" onClick={props.onClick} >Change image</button>;
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
