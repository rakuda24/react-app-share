// ImageUploader.js

import React, { useState } from "react";
import { Button } from "@mui/material";
import ImageLogo from "./image.svg";
import "./ImageUpload.css";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // useHistory を useNavigate に変更

const firebaseConfig = {
  apiKey: "AIzaSyCG99nl_hH_8GvqEpxGmT-Zc6xyVKHJKiI",
  authDomain: "test-app-9eac0.firebaseapp.com",
  databaseURL: "https://test-app-9eac0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-app-9eac0",
  storageBucket: "test-app-9eac0.appspot.com",
  messagingSenderId: "475645900729",
  appId: "1:475645900729:web:b6b025376cf9f1f9c1a868"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

const ImageUploader = () => {
  const navigate = useNavigate(); // useHistory を useNavigate に変更

  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);

  const OnFileUploadToFirebase = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, "image/" + file.name);

    try {
      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);
      setDownloadURL(url);

      const docRef = await addDoc(collection(firestore, "messages"), {
        name: "写真共有",
        message: url,
        photoURL: "/images/profile_placeholder.png",
        timestamp: new Date(),
      });

      setLoading(false);
      setUploaded(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
      setUploaded(false);
    }
  };

  

  return (
    <>
      {loading ? (
        <h2>アップロード中・・・</h2>
      ) : (
        <>
          {isUploaded ? (
            <>
              <h2>アップロード完了</h2>
            </>
          ) : (
            <div className="outerBox">
              <div className="title">
                <h2>画像アップローダー</h2>
                <p>JpegかPngの画像ファイル</p>
              </div>
              <div className="imageUplodeBox">
                <div className="imageLogoAndText">
                  <img src={ImageLogo} alt="imagelogo" />
                  <p>ここにドラッグ＆ドロップしてね</p>
                </div>
                <input
                  className="imageUploadInput"
                  multiple
                  name="imageURL"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={OnFileUploadToFirebase}
                />
              </div>
              <p>または</p>
              <div className="buttonContainer">
                <Button variant="contained">
                  ファイルを選択
                  <input
                    className="imageUploadInput"
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={OnFileUploadToFirebase}
                  />
                </Button>
                {/* <Button variant="outlined" onClick={handleReturnToChat}>
                  チャットに戻る
                </Button> */}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ImageUploader;




