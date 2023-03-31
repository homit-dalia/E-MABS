import React, { useState, useEffect } from 'react'
import {
  StyleSheet, Text, View, TouchableOpacity, FlatList, ToastAndroid
  , AlertIOS
} from 'react-native'
import { Dimensions } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

import storage from '@react-native-firebase/storage';
import { getStringData } from '../common';
import BottomDrawer from 'rn-bottom-drawer'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


var listSeperator = '-'
for (let index = 0; index < parseInt(windowWidth * 0.135); index++) {
  listSeperator = listSeperator + '-';
}


var fileCount = 0
var gateKeep = ''


const Favourites1Screen = ({ navigation }) => {

  const [fileList, setFileList] = useState([])
  const [fileFetched, setFileFetched] = useState("")

  const [filter, setFilter] = useState("")

  useEffect(() => {
    listFiles()
  }, []);

  useEffect(() => {
    if (fileFetched == 1) {
      sortAlphabetical()

    }
  }, [fileFetched])


  function sortAlphabetical() {
    const newFileList = fileList.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setFileList(newFileList)
    setFileFetched(0)
  }

  async function listFiles() {
    const reference = storage().ref(await getStringData("userID"));
    gateKeep = await getStringData("userID") + '.metadata'

    listFilesAndDirectories(reference).then(() => {



      console.log('Finished listing');
      if (Platform.OS === 'android') {
        ToastAndroid.show("Refreshed !", ToastAndroid.SHORT)
      } else {
        AlertIOS.alert("Refreshed!");
      }

      setFileFetched(1)

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

      //for files in the path
      console.log(result)
      result.items.forEach(ref => {
        newPathWithoutUID = removeUIDFromFilePath(ref.path)
        if (checkFileExists(newPathWithoutUID)) {
          setFileList(fileList => [...fileList, { name: newPathWithoutUID, id: `${fileCount}`, folder: false, encrypted: true }])
          fileCount++
          console.log("Stored File " + newPathWithoutUID)

          //updateSessionList(newPathWithoutUID)
        }
        else {
          console.log("Not storing File " + newPathWithoutUID + " as it already exists")
        }
      });

      //for folders in the path
      result.prefixes.forEach(ref => {
        newPathWithoutUID = removeUIDFromFilePath(ref.path)
        console.log(newPathWithoutUID)
        if (checkFileExists(newPathWithoutUID) && newPathWithoutUID != gateKeep) {

          console.log(newPathWithoutUID)
          setFileList(fileList => [...fileList, { name: newPathWithoutUID, id: `${fileCount}`, folder: true, encrypted: false }])
          fileCount++
          console.log("Stored Folder " + newPathWithoutUID)

          //updateSessionList(newPathWithoutUID)

        }
        else {
          console.log("Not storing Folder " + newPathWithoutUID + " as it already exists")
        }
      });

      if (result.nextPageToken) {
        return listFilesAndDirectories(reference, result.nextPageToken);
      }
      return Promise.resolve();
    });
  }

  function getDocumentType(path, folder) {
    if (folder) {
      return 'folder'
    }
    else {
      if (path.includes(".jpeg") || path.includes(".jpg") || path.includes(".png") || path.includes(".raw") || path.includes(".bmp") || path.includes(".cr2")) {
        return "image"
      }
      else if (path.includes(".pdf") || path.includes(".docx") || path.includes(".txt")) {
        return "document-text"
      }
      else if (path.includes(".mp4") || path.includes(".mkv") || path.includes(".hevc")) {
        return "videocam"
      }
      else {
        return 'cube'
      }
    }
  }

  function searchFiles() {

  }

  function handleOpenFile(fileName, fileType) {
    navigation.push('File Open', { content: fileName, folder: fileType }) //add code here to call getURL in FileOpen

  }
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerText}>Favourites</Text>
          </View>
          <View style={styles.headerButtonsContainer}>

            {filter != "" ? <TouchableOpacity onPress={listFiles} style={styles.headerButtons}>
              <Ionicons name='filter' color={'black'} size={30} />
            </TouchableOpacity> :

              <TouchableOpacity onPress={listFiles} style={styles.headerButtons}>
                <Ionicons name='filter-outline' color={'black'} size={30} />
              </TouchableOpacity>}


            <TouchableOpacity onPress={listFiles} style={styles.headerButtons}>
              <Ionicons name='reload-outline' color={'black'} size={30} />
            </TouchableOpacity>

            <TouchableOpacity onPress={searchFiles}>
              <Ionicons name='search-sharp' color={'black'} size={30} />
            </TouchableOpacity>

          </View>

        </View>

      </View>
      <View style={styles.itemLeft}>
        <FlatList
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={
            <View style={styles.fileListSeperatorContainer}>
              <Text style={styles.fileListSeperator}> {listSeperator} </Text>
            </View>
          }
          data={fileList}
          renderItem={({ item }) => (
            <View style={styles.fileListContainer}>
              <TouchableOpacity style={styles.fileViewButton} onPress={() => handleOpenFile(item.name, item.folder)}>
                <View>
                  <Ionicons name={
                    getDocumentType(item.name, item.folder)
                  } color='#5968ab' size={25} style={styles.fileListIcon} />
                </View>
                <Text style={styles.fileViewButtonText}>{"  " + item.name}</Text>
              </TouchableOpacity>

            </View>
          )}
        />
        {/* <BottomDrawer
          containerHeight={100}
          offset={80}
          shadow={true}
          backgroundColor={'dimgrey'}
          downDisplay={50}
          roundedEdges={true}
          panResponder={false}
        >
          {renderContent = () => {
            return (
              <View>
                <Text>Get directions to your location</Text>
              </View>
            )
          }
          }
        </BottomDrawer> */}
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
    fontSize: 15,
    //maxWidth: "80%",
    alignSelf: 'center',
    maxWidth: "70%",
    maxHeight: "80%",
  },
  fileMetadata: {
    alignSelf: 'auto',
    flexDirection: 'column'
  },
  fileListSeperatorContainer: {
    backgroundColor: 'white',
  },
  fileListSeperator: {
    fontWeight: "700",
    fontSize: 15,
    alignSelf: 'flex-end',
    backgroundColor: 'white',
  },
  fileListIcon: {
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
    marginRight: 7,
    marginLeft: 5,
  },

  //header
  headerContainer: {
    backgroundColor: '#f2f2f2',
    height: 55,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 15,
    marginLeft: 19,
    color: 'black'
  },
  headerButtonsContainer: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 10,
    flexDirection: 'row',
  },
  headerButtons: {
    marginRight: 20,
  }
})