import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Favourites1Screen from './Favourites1Screen'
import storage from '@react-native-firebase/storage';
import { getStringData } from '../common'
import RNFetchBlob from 'rn-fetch-blob';
import RNEncryptionModule from '@dhairyasharma/react-native-encryption'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

//add a function that stores file opened list. To be emptied

let dirs = RNFetchBlob.fs.dirs
var url = null


 


const FileOpen = ({ route }) => {

    const [currentImagePath, setCurrentImagePath] = useState(null)
    const { content } = route.params;
    const { folder } = route.params

    const [encryptedFilePath, setEncryptedFilePath] = useState("")
    const [outputDecryptedFilePath, setOutputDecryptedFilePath] = useState("")
    const [password, setPassword] = useState("")
    const [fileIv, setFileIv] = useState("");
    const [fileSalt, setFileSalt] = useState("");

    useEffect(() => {
        if (folder == false) {
            openFile()
        }
    }, [])

    useEffect(()=> {
        if (encryptedFilePath != "") {
            decryptFile()
          }
    }, [outputDecryptedFilePath])

    async function decryptFile() {
        RNEncryptionModule.decryptFile(
            encryptedFilePath,
            outputDecryptedFilePath,
            password,
            fileIv,
            fileSalt
        ).then((res) => {
            if (res.status == "success") {
                console.log("success", res)
                setCurrentImagePath(dirs.DocumentDir + '/downloadedCachedFiles/' +"Encrypted_" +  content)
                RNFetchBlob.session('deleteOnSignOut').add(dirs.DocumentDir + '/downloadedCachedFiles/'+"Encrypted_" + content)

            } else {
                console.log("error", res);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    async function downloadImage(url) {
        RNFetchBlob
            .config({
                // response data will be saved to this path if it has access right.
                path: dirs.DocumentDir + '/downloadedCachedFiles/' + content,
                fileCache: true
            })
            .fetch('GET', url, {
                //some headers ..
            })
            .then(async (res) => {
                RNFetchBlob.session('deleteOnSignOut').add(dirs.DocumentDir + '/downloadedCachedFiles/' + content)

                const reference = storage().ref(await getStringData("userID") + "/" + content);
                fileMetadata = await reference.getMetadata()

                setFileIv(fileMetadata.customMetadata.fileIv)
                setFileSalt(fileMetadata.customMetadata.fileSalt)
                setPassword("1234")
                setEncryptedFilePath(dirs.DocumentDir + '/downloadedCachedFiles/' + content)
                setOutputDecryptedFilePath(dirs.DocumentDir + '/downloadedCachedFiles/' + "Encrypted_" + content)

                


                //setCurrentImagePath(res.path())
                console.log('The encrypted file is saved to ', res.path())
            })
    }

    async function getURL() {
        console.log("Inside getURL")
        const url = await storage().ref(await getStringData("userID") + "/" + content).getDownloadURL();
        console.log(url)
        downloadImage(String(url))
        console.log("getURL Done")
        //return url
    }
    function openFile() {
        if (RNFetchBlob.session('deleteOnSignOut').list().includes(dirs.DocumentDir + '/downloadedCachedFiles/' + "Encrypted_" + content)) {
            setCurrentImagePath(dirs.DocumentDir + '/downloadedCachedFiles/' + "Encrypted_" +  content)
            console.log("File already stored in cache. Displaying without downloading")
        }
        else {
            getURL()
        }
        //getURL()
    }

    return (
        <View>
            {folder == true ? <Text style={{ alignSelf: 'center', fontSize: 15, marginTop: 200 }}> Nested folders have not yet been implemented.</Text> :
                currentImagePath != null ?
                    <View>
                        <Image source={{
                            width: windowWidth,
                            height: windowHeight,
                            alignSelf: 'center',
                            uri: "file:///" + currentImagePath
                        }} />

                        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={openFile}>
                            <Text >
                                Download Image
                            </Text>
                        </TouchableOpacity>

                    </View>
                    : <Text style={{ alignSelf: 'center', marginTop: 100 }}>Downloading Image. Please Wait. If it does not work, please download the image manually using the button below.</Text>}

            {/* {url != null ? <Image source={{
                width: 200,
                height: 200,
                uri: url
            }} /> : <Text>URL is Null</Text>} */}
        </View>
    )
}

export default FileOpen

const styles = StyleSheet.create({})