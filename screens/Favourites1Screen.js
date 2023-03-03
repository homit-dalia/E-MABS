import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Dimensions } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var listSeperator = '-'
for (let index = 0; index < parseInt(windowWidth * 0.1412); index++) {
  listSeperator = listSeperator + '-';

}

const getStringData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    console.log(`Fetched ${key} : ${value} from AsynStorage`)
    if (value !== null) {
      // value previously stored
      return value
    }
  } catch (e) {
    console.log(`Error Fetching AsyncStorage with key '${key}'`)
    // error reading value
  }
}

var fileCount = 0
const Favourites1Screen = () => {

  const [fileList, setFileList] = useState([])

  async function listFiles() {
    const reference = storage().ref(await getStringData("userID"));
    listFilesAndDirectories(reference).then(() => {
      console.log('Finished listing');
    });
  }

  function removeUIDFromFilePath(path) {
    newArray = path.split("/")
    return newArray[1]
  }

  function checkFileExists(path) {
    var flag = 0

    console.log(fileCount)

    fileList.forEach(temp => {
      if (temp.name.includes(path)) {
        flag = 1
      }
    }
    )
    return flag == 1 ? false : true
  }

  function listFilesAndDirectories(reference, pageToken) {
    return reference.list({ pageToken }).then(result => {
      // Loop over each item
      result.items.forEach(ref => {
        console.log(ref.path);
        newPathWithoutUID = removeUIDFromFilePath(ref.path)

        temp3 = checkFileExists(newPathWithoutUID)
        console.log(temp3)
        if (temp3) {
          setFileList(fileList => [...fileList, { name: newPathWithoutUID, id: `${fileCount}` }])
          fileCount++
          console.log("Stored file " + newPathWithoutUID)
        }
        else {
          console.log("Not storing file " + newPathWithoutUID + " as it already exists")
        }

      });
      if (result.nextPageToken) {
        return listFilesAndDirectories(reference, result.nextPageToken);
      }
      return Promise.resolve();
    });
  }

  function getDocumentType(path) {
    if (path.includes(".jpeg") || path.includes(".jpg") || path.includes(".png")) {
      return "image"
    }
    else if (path.includes(".pdf") || path.includes(".docx") || path.includes(".txt")) {
      return "document-text"
    }
    else if (path.includes(".mp4") || path.includes(".mkv") || path.includes(".hevc")) {
      return "videocam"
    }
    else if (path.includes("/")) {
      return 'folder'
    }
    else {
      return 'cube'
    }
  }

  function logFileList() {

    fileList.forEach(ref => {
      console.log(ref.name);
    })
  }

  return (

    <View style={styles.container}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.fileViewButton} onPress={listFiles}>
          <Text style={styles.fileViewButtonText}>Update list</Text>
        </TouchableOpacity>

        <FlatList
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={<Text style={styles.fileListSeperator}> {listSeperator} </Text>}
          data={fileList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.fileViewButton}>
              <View>
                <Ionicons name={
                  getDocumentType(item.name)
                } color='#5968ab' size={25} style={styles.fileListIcon} />
              </View>
              <Text style={styles.fileViewButtonText}>{"  " + item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Favourites1Screen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    //justifyContent: 'space-between'
  },
  fileViewButton: {

    width: "100%",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 3,
    height: 50,
    padding: 13,
    flexDirection: 'row',

  },
  fileViewButtonText: {
    color: 'black',
    fontWeight: '400',
    fontSize: 14,
    //maxWidth: "80%",
    alignSelf: 'center',

  },
  fileMetadata:{
    alignSelf: 'auto',
    flexDirection: 'column'
  },
  fileListSeperator: {
    fontWeight: "700",
    fontSize: 15,
    alignSelf: 'flex-end',
  
  },
  fileListIcon: {
    alignSelf: 'flex-start',
    flexWrap: 'wrap'
  },
})