import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Favourites1Screen from './Favourites1Screen'
import storage from '@react-native-firebase/storage';
import { getStringData } from './Favourites1Screen';
import RNFetchBlob from 'rn-fetch-blob';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


var screenOpen = 0
var dirs = RNFetchBlob.fs.dirs

const FileOpen = ({ route }) => {

    const [currentImagePath, setCurrentImagePath] = useState(null)
    const { content } = route.params;

    //var url = null

    async function downloadImage(url) {
        RNFetchBlob
            .config({
                // response data will be saved to this path if it has access right.
                fileCache: true
            })
            .fetch('GET', url, {
                //some headers ..
            })
            .then((res) => {
                setCurrentImagePath(res.path())
                // the path should be dirs.DocumentDir + 'path-to-file.anything'
                console.log('The file saved to ', res.path())
            })
    }

    async function getURL() {
        screenOpen++
        const url = await storage().ref(await getStringData("userID") + "/" + content).getDownloadURL();
        console.log(url)
        downloadImage(String(url))
        //return url
    }


    if (screenOpen == 0) {
        getURL()
    }


    return (
        <View> 
            
            {currentImagePath != null ? <Image source={{
                width: windowWidth,
                height: windowHeight,
                alignSelf: 'center',
                uri: "file:///" + currentImagePath
            }} /> : <Text style={{alignSelf: 'center'}}>Downloading Image. Please Wait</Text>}



            {/* {url != null ? <Image source={{
                width: 200,
                height: 200,
                uri: url
            }} /> : <Text>URL is Null</Text>} */}

            <TouchableOpacity style={{alignSelf: 'center'}} onPress={getURL}>
                <Text >
                    Download Image
                </Text>
            </TouchableOpacity>

            <Text style={{alignSelf: 'center'}}>{content}</Text>
        </View>
    )
}

export default FileOpen

const styles = StyleSheet.create({})