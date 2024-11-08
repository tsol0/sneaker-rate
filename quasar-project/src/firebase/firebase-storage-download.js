import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebase";


 export const userImageDownload = (username, id) =>{
  const pathRef = ref(storage, `"${username}/${id}"`)

  const imageUrl = getDownloadURL(pathRef)
  return imageUrl
}
