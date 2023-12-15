// //ImageUploader.js

// import React, { useState } from "react";
// import { Button } from "@mui/material";
// import ImageLogo from "./image.svg";
// import "./ImageUpload.css";
// import {
//   getStorage,
//   ref,
//   uploadBytes,
//   getDownloadURL,
// } from "firebase/storage";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom"; // useHistory を useNavigate に変更

// const firebaseConfig = {
//   apiKey: "AIzaSyCG99nl_hH_8GvqEpxGmT-Zc6xyVKHJKiI",
//   authDomain: "test-app-9eac0.firebaseapp.com",
//   databaseURL: "https://test-app-9eac0-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "test-app-9eac0",
//   storageBucket: "test-app-9eac0.appspot.com",
//   messagingSenderId: "475645900729",
//   appId: "1:475645900729:web:b6b025376cf9f1f9c1a868"
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const storage = getStorage(firebaseApp);
// const firestore = getFirestore(firebaseApp);

// const ImageUploader = () => {
//   const navigate = useNavigate(); // useHistory を useNavigate に変更

//   const [loading, setLoading] = useState(false);
//   const [isUploaded, setUploaded] = useState(false);
//   const [downloadURL, setDownloadURL] = useState(null);

//   const OnFileUploadToFirebase = async (e) => {
//     const file = e.target.files[0];
//     const storageRef = ref(storage, "image/" + file.name);

//     try {
//       await uploadBytes(storageRef, file);

//       const url = await getDownloadURL(storageRef);
//       setDownloadURL(url);

//       const docRef = await addDoc(collection(firestore, "messages"), {
//         name: "User Name",
//         message: url,
//         photoURL: "/images/profile_placeholder.png",
//         timestamp: new Date(),
//       });

//       setLoading(false);
//       setUploaded(true);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setLoading(false);
//       setUploaded(false);
//     }
//   };

  

//   return (
//     <>
//       {loading ? (
//         <h2>アップロード中・・・</h2>
//       ) : (
//         <>
//           {isUploaded ? (
//             <>
//               <h2>アップロード完了</h2>
//             </>
//           ) : (
//             <div className="outerBox">
//               <div className="title">
//                 <h2>画像アップローダー</h2>
//                 <p>JpegかPngの画像ファイル</p>
//               </div>
//               <div className="imageUplodeBox">
//                 <div className="imageLogoAndText">
//                   <img src={ImageLogo} alt="imagelogo" />
//                   <p>ここにドラッグ＆ドロップしてね</p>
//                 </div>
//                 <input
//                   className="imageUploadInput"
//                   multiple
//                   name="imageURL"
//                   type="file"
//                   accept=".png, .jpeg, .jpg"
//                   onChange={OnFileUploadToFirebase}
//                 />
//               </div>
//               <p>または</p>
//               <div className="buttonContainer">
//                 <Button variant="contained">
//                   ファイルを選択
//                   <input
//                     className="imageUploadInput"
//                     type="file"
//                     accept=".png, .jpeg, .jpg"
//                     onChange={OnFileUploadToFirebase}
//                   />
//                 </Button>
//                 {/* <Button variant="outlined" onClick={handleReturnToChat}>
//                   チャットに戻る
//                 </Button> */}
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default ImageUploader;

// 必要な依存関係とスタイルをインポート
import React, { useState } from "react";
import { Button } from "@mui/material";
import ImageLogo from "./image.svg"; // ロゴのための画像ファイルをインポート
import "./ImageUpload.css"; // コンポーネントのスタイルをインポート
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage"; // Firebase Storage関数をインポート
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Firebase Firestore関数をインポート
import { useNavigate } from "react-router-dom"; // React Routerのナビゲーションフックをインポート

// Firebaseの設定オブジェクト。APIキーとプロジェクトの詳細が含まれています。
const firebaseConfig = {
  apiKey: "AIzaSyCG99nl_hH_8GvqEpxGmT-Zc6xyVKHJKiI",
  authDomain: "test-app-9eac0.firebaseapp.com",
  databaseURL: "https://test-app-9eac0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-app-9eac0",
  storageBucket: "test-app-9eac0.appspot.com",
  messagingSenderId: "475645900729",
  appId: "1:475645900729:web:b6b025376cf9f1f9c1a868"
};

// Firebaseアプリを初期化し、Firebase StorageとFirestoreのインスタンスを作成します。
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

// ImageUploaderという名前の関数コンポーネント
const ImageUploader = () => {
  const navigate = useNavigate(); // React Routerのナビゲーションフック

  // ローディング、アップロードステータス、ダウンロードURLを管理するState変数
  const [loading, setLoading] = useState(false);
  const [isUploaded, setUploaded] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);

  // Firebase StorageとFirestoreへのファイルアップロードを処理する関数
  const OnFileUploadToFirebase = async (e) => {
    const file = e.target.files[0]; // 選択されたファイルを取得
    const storageRef = ref(storage, "test_image/" + file.name); // ストレージの場所への参照を作成

    try {
      // ファイルをFirebase Storageにアップロード
      await uploadBytes(storageRef, file);

      // アップロードされたファイルのダウンロードURLを取得
      const url = await getDownloadURL(storageRef);
      console.log("Download URL:", url);
      setDownloadURL(url);

      // Firestoreコレクションに新しいドキュメントを追加（サンプルデータを含む）
      const docRef = await addDoc(collection(firestore, "messages"), {
        name: "User Name",
        message: url,
        photoURL: "/images/profile_placeholder.png",
        timestamp: new Date(),
      });

      // ローディングをfalseに設定し、アップロードステータスをtrueに更新
      setLoading(false);
      setUploaded(true);
    } catch (error) {
      // アップロードプロセス中のエラーを処理
      console.error("ファイルのアップロードエラー:", error);
      setLoading(false);
      setUploaded(false);
    }
  };

  // 現在のステートに基づいてJSXをレンダリング
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
                {/* ファイル選択のためのInputフィールドとイベントハンドラ */}
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
                {/* 関連付けられたInputフィールドを使用したファイル選択のためのボタン */}
                <Button variant="contained">
                  ファイルを選択
                  <input
                    className="imageUploadInput"
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    onChange={OnFileUploadToFirebase}
                  />
                </Button>
                {/* チャットに戻るための追加のボタン（コメントアウト済み） */}
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

// ImageUploaderコンポーネントをデフォルトエクスポート
export default ImageUploader;



