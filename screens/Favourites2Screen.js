import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import React from 'react'
import DocumentPicker from 'react-native-document-picker'
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { S3 } from 'react-native-aws3'
const Favourites2Screen = () => {

        const chooseImage = async () => {
        
          let options = {
            title: 'Upload Prescription',
            takePhotoButtonTitle: 'Take a Photo',
            chooseFromLibraryButtonTitle: 'Select From Gallery',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
      launchImageLibrary(options, async (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const file = {
              uri: response.uri,
              name: response.fileName,
              type: 'image/jpeg',
            };
            uploadImageOnS3(file);
          }
      });
      };

    const uploadImageOnS3 = async (file) => {
      const s3bucket = new S3({
        accessKeyId: 'AKIAQMNA3OWTATMD75AH',
        secretAccessKey: '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',
        Bucket: 'academybucket333344444',
        signatureVersion: 'v4',
      });
    let contentType = 'image/jpeg';
      let contentDeposition = 'inline;filename="' + file.name + '"';
      const base64 = await fs.readFile(file.uri, 'base64');
      const arrayBuffer = decode(base64);
    s3bucket.createBucket(() => {
        const params = {
          Bucket: 'academybucket333344444',
          Key: file.name,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: contentType,
      };
    s3bucket.upload(params, (err, data) => {
        if (err) {
          console.log('error in callback');
        }
      console.log('success');
      console.log("Respomse URL : "+ data.Location);
      });
    });
    };

  return (
    <View>
      <Text>HomeScreen</Text>
      <TouchableOpacity style={styles.uploadIcon}
          onPress={chooseImage}>
          <Ionicons name='cloud-upload' color='#000000' size={40} />
        </TouchableOpacity>
    </View>
  )
}

export default Favourites2Screen

const styles = StyleSheet.create({})