import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native'

import React, { useState } from 'react'



var id = 3
const Favourites2Screen = () => {

  const [people, setPeople] = useState([
    { name: "Homit Dalia", id: '1' },

  ])


  function updateList() {
    setPeople(fileList => [...fileList, { name: "Homit Dalia", id: `${id}` }])
    id++
    console.log(people)
  }

  function loopList(){
    people.forEach(result => {
      console.log(result.name)
      console.log(result.name.includes("Homit Dalia"))
    })

   
  }

  return (
    <View>

      <View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={people}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.fileViewButton}>
              <Text style={styles.fileViewButtonText}>{item.name + "       key: " + item.id}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.Button} onPress={updateList}>
          <Text> Update list </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={loopList}>
          <Text> Loop over list </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Favourites2Screen

const styles = StyleSheet.create({
  Button: {
    alignSelf: 'center'
  }
})