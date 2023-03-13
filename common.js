import AsyncStorage from "@react-native-async-storage/async-storage";
import storage from '@react-native-firebase/storage';
import RNFetchBlob from "rn-fetch-blob";

export async function getStringData (key) {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        // value previously stored
        return value
      }
    } catch (e) {
      console.log(`Error Fetching AsyncStorage with key '${key}'`)
      // error reading value
    }
  }


export async function getURL(content) {

    const url = await storage().ref(await getStringData("userID") + "/" + content).getDownloadURL();
    return url
}


export async function downloadImage(url) {
    RNFetchBlob
        .config({
            // response data will be saved to this path if it has access right.
            fileCache: true
        })
        .fetch('GET', url, {
            //some headers ..
        })
        .then((res) => {
            // the path should be dirs.DocumentDir + 'path-to-file.anything'
            console.log(`The file : ${url} saved to `, res.path())
            return res.path()
        })
}