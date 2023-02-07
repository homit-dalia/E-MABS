import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { RNS3 } from 'react-native-aws3'

const Favourites1Screen = () => {

  function takePic() {
    launchImageLibrary({}, (response) => {
      const assets = response.assets
      if (assets && assets.length >= 1) {
        console.log(`launchImageLibrary : ${assets}`)
        const asset = assets[0]
        const file = {
          uri: asset.uri,
          name: asset.fileName,
          type: asset.type
        }

        console.log(`launchImageLibrary : file`, file)
        const config = {
          bucket: 'academybucket333344444',
          region: 'us-east-1',
          accessKey: 'AKIAQMNA3OWTATMD75AH',
          secretKey: '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',
          successActionStatus: 201
        }
        console.log('launchImageLibrary :config', config)

        try {
          RNS3.put(file, config)
            .then((response) => {
              if (response.status !== 201)
                throw new Error("Failed to upload image to S3");
              console.log('launchImageLibrary : put success ', response);
              // console.log(response.body.postResponse.location);
            })
            .catch((error) => {
              console.error('launchImageLibrary: put error ', error)
            })
        } catch (error) {
          console.error('error : ', error)
        }
        console.log('success')
      }

    })
  }

  return (
    <View>
      <Text>Fav 1 Screen</Text>
      <Ionicons name='bookmarks-outline' color={'coral'} size={40} />

      <TouchableOpacity style={styles.uploadIcon}
        onPress={takePic}>
        <Ionicons name='cloud-upload' color='#0E86D4' size={40} />
      </TouchableOpacity>
    </View>



  );
};

export default Favourites1Screen;

const styles = StyleSheet.create({})