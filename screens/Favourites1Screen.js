import React, { useState, createContext } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'
import { Dimensions } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons'

import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var refreshOnOpen = 0

var listSeperator = '-'
for (let index = 0; index < parseInt(windowWidth * 0.135); index++) {
  listSeperator = listSeperator + '-';

}

export const getStringData = async (key) => {
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

export const UserContext = createContext();

var fileCount = 0
const Favourites1Screen = () => {

  const navigation = useNavigation()
  if (refreshOnOpen == 0) {
    listFiles()
    refreshOnOpen++
  }

  const [fileList, setFileList] = useState([])

  async function listFiles() {
    const reference = storage().ref(await getStringData("userID"));
    listFilesAndDirectories(reference).then(() => {
      console.log('Finished listing');

      //setTimeout(listFiles, 10000);
    });
  }

  //setInterval(listFiles, 5000)

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
        //console.log(ref.path);
        newPathWithoutUID = removeUIDFromFilePath(ref.path)
        if (checkFileExists(newPathWithoutUID)) {
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
    if (path.includes(".jpeg") || path.includes(".jpg") || path.includes(".png") || path.includes(".raw") || path.includes(".bmp") || path.includes(".cr2")) {
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

  function searchFiles() {

  }

  function handleOpenFile(fileName) {
    navigation.navigate('File Open',{ content: fileName })

  }
  //setInterval(listFiles, 5000)
  return (

    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerText}>Favourites</Text>
          </View>
          <View style={styles.headerButtonsContainer}>

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
            <TouchableOpacity style={styles.fileViewButton} onPress={() => handleOpenFile(item.name)}>
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
    maxWidth: "85%",
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