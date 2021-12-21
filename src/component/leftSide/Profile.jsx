import style from "./Profile.module.css";
import avatarURL from "../../Assets/image/default.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCamera } from "@fortawesome/free-solid-svg-icons";
import { toggleAction } from "../../store/slices/Toggle";
import { useDispatch } from "react-redux";
import { auth, db, storage } from "../../firebase/config";
import { onSnapshot, updateDoc, doc } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
function Profile() {
  const [user, setUser] = useState({
    pic: "",
    name: "",
    joinDate: "",
    picUrl: null,
  });
  const [imageInput, setImageInput] = useState(null);
  const dispatch = useDispatch();
  const currentUserID = auth.currentUser.uid;
  useEffect(() => {
    const ref = doc(db, "users", currentUserID);
    const unSubscribe = onSnapshot(ref, (userData) => {
      if (userData.exists()) {
        setUser({
          name: userData.data().name,
          joinDate: userData.data().createdAt,
          picUrl: userData.data().profileUrl,
        });
      }
    });

    return () => {
      unSubscribe();
    };
  }, [currentUserID]);
  const hideProfileHandler = () => {
    dispatch(toggleAction.hideProfile());
  };
  const setImageHandler = async (e) => {
    setImageInput(e.target.files[0]);
    // const file = e.target.files[0];
    // if (file) {
    //   const blah = URL.createObjectURL(file);
    //   console.log(blah);
    // }

    const imageRef = ref(
      storage,
      `avatar/${currentUserID}/${currentUserID}-profilePhoto`
    );
    const url = await uploadBytes(imageRef, e.target.files[0]);
    const downloadUrl = await getDownloadURL(ref(storage, url.ref.fullPath));
    if (downloadUrl) {
      await updateDoc(doc(db, "users", currentUserID), {
        profileUrl: downloadUrl,
      });
      setImageInput("");
    }
  };
  return (
    <aside className={style.profile}>
      <div className={style.backButton} onClick={hideProfileHandler}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>
      <div className={style.picProfile}>
        <img
          src={user.picUrl || avatarURL}
          alt="profile-picture"
          className={style.image}
        />
        <span className={style.changePicButton}>
          <FontAwesomeIcon icon={faCamera} />
          <label htmlFor="photo">Change Proflie Photo</label>
          <input
            type="file"
            accept="image/*"
            id="photo"
            onChange={setImageHandler}
          />
        </span>
      </div>
      <h2 className={style.name}>{user.name.toUpperCase()}</h2>
      <h3 className={style.createdTime}>{`Joined in: ${new Date(
        user.joinDate
      ).toLocaleString()}`}</h3>
    </aside>
  );
}

export default Profile;
