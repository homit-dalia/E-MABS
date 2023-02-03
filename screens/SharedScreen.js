import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'

import React from 'react'
import DocumentPicker from 'react-native-document-picker'
import ImagePicker, { launchImageLibrary } from 'react-native-image-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { S3 } from 'react-native-aws3'
import fs from 'react-native-fs';
import {decode} from 'base64-arraybuffer';
import AWS from 'aws-sdk';

const SharedScreen = () => {
  
  const uploadFileToS3 = async (file) => {
  
    const BUCKET_NAME = 'academybucket333344444';
    const IAM_USER_KEY = 'AKIAQMNA3OWTATMD75AH';
    const IAM_USER_SECRET = '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';
  
    const s3bucket = new AWS.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_USER_SECRET,
      Bucket: BUCKET_NAME,
      signatureVersion: 'v4',
    });
  
    const contentType = file.type;
    const contentDeposition = `inline;filename="${file.name}"`;
    const fPath = file.uri;
    const base64 = await fs.readFile(fPath, 'base64');
    const arrayBuffer = decode(base64);
  
    return new Promise((resolve, reject) => {
      s3bucket.createBucket(() => {
        const params = {
          Bucket: BUCKET_NAME,
          Key: file.name,
          Body: arrayBuffer,
          ContentDisposition: contentDeposition,
          ContentType: contentType,
        };
        s3bucket.upload(params, (error, data) => {
          utils.stopLoader();
          if (error) {
            reject(getApiError(error));
          } else {
            console.log(JSON.stringify(data));
            resolve(data);
          }
        });
      });
    });
  };
  

  return (
    <View>
      <Text>SharedScreen</Text>
      <Button
    onPress={uploadFileToS3}
    title="Upload"
        />
    </View>
  )
}

export default SharedScreen

const styles = StyleSheet.create({})