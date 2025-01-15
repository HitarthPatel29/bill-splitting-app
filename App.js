import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity,Alert, Modal,useColorScheme, ScrollView} from 'react-native';
import { Provider, Button, RadioButton, DefaultTheme } from 'react-native-paper';

export default function App() {
  const [itemPrice, setItemPrice] = useState('');
  const [tax, setTax] = useState(false); // Boolean for tax
  const [discountValue, setDiscountValue] = useState(0.00); // float for discount
  const [discount, setDiscount] = useState(false); // Boolean for discount
  const [splitAmount, setSplitAmount] = useState(0);
  const [totals, setTotals] = useState({}); // Object to store totals for each person
  const [dropdownVisible, setDropdownVisible] = useState(false); // Dropdown visibility
  const [modalVisible, setModalVisible] = useState(false); //custom TaxDiscount Settings
  const [dButtonActive, setDButtonActive] = useState(false); //custom TaxDiscount Settings
  const [jButtonActive, setJButtonActive] = useState(true); //custom TaxDiscount Settings
  const [hButtonActive, setHButtonActive] = useState(false); //custom TaxDiscount Settings
  const [aButtonActive, setAButtonActive] = useState(false); //custom TaxDiscount Settings
  const [nameInputs, setNameInputs] = useState([{ id: 0, name: '' , dropdownVisible: false }]); // Initial input
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#6200ee', // Primary color for buttons, radio buttons, etc.
      text: '#000', // Default text color
      background: '#f8f8f8', // Background color
      surface: '#fff', // Surface color for components like cards
      accent: '#03dac4', // Accent color for secondary elements
    },
  };

  const calculateSplit = () => {
    let price = parseFloat(itemPrice) || 0;
    let taxValue = tax ? 0.13 : 0; // 13% tax if applicable

    finalPrice = price * (1 + taxValue) * (1 - discountValue);
    setSplitAmount(finalPrice);
    finalPrice = finalPrice/nameInputs.length

    if (nameInputs[0].name.trim() === '') {
      alert('Please enter or select a person\'s name.');
      return;
    }
    

    // Add or update the total for the person
    setTotals((prevTotals) => {
      const updatedTotals = { ...prevTotals };
      nameInputs.forEach((item) => {
        if (updatedTotals[item.name]) {
          updatedTotals[item.name] += finalPrice;
        } else {
          updatedTotals[item.name] = finalPrice;
        }
      });
      
      return updatedTotals;
    });

    // Clear input fields
    setItemPrice('');
    setNameInputs([{ id: 0, name: '' }]); // Reset to initial state  

  };
  // Handle name selection from dropdown
  const handleNameSelect = (itemFromTotals, itemFromNameInputs) => {
    setNameInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === itemFromNameInputs.id ? { ...input, name: itemFromTotals.name } : input
      )
    );
    setDropdownVisible(false); // Hide dropdown
  };
  
  const totalsData = Object.entries(totals).map(([name, total]) => ({
    name,
    total,
  }));

  const resetApp = () => {
    setItemPrice('');
    setTax(false);
    setDiscountValue(0.00);
    setDiscount(false);
    setSplitAmount(0);
    setTotals({});
    setDropdownVisible(false);
    setModalVisible(false);
    setDButtonActive(false);
    setJButtonActive(true);
    setHButtonActive(false);
    setAButtonActive(false);
    setNameInputs([{ id: 0, name: '' }]); // Reset to initial state   
  };

  const removeName = (id) => {
    if(nameInputs.length > 1){
      setNameInputs(nameInputs.filter((input) => input.id !== id));
    }
  };

  const updateName = (id, newName) => {
    setNameInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id ? { ...input, name: newName } : input
      )
    );
  };


  function showNameBox(itemFromNameInputs){
    return(
      <View style={{flexDirection : 'row'}}>
        <View style={{flexGrow : 1 }}>
          <TextInput
            style={{
              borderWidth: 1,borderColor: '#ccc', borderRadius: 8,
              padding: 10,
              marginTop : 5,
              fontSize: 16,
              backgroundColor: '#fff',
              color: '#000',
            }}
            placeholder="Enter Person's Name"
            value={itemFromNameInputs.name}
            onChangeText={(text)=> updateName(itemFromNameInputs.id, text)}
            onChange={() => itemFromNameInputs.dropdownVisible = true}
            onFocus={() => itemFromNameInputs.dropdownVisible = true}
            onBlur={() => itemFromNameInputs.dropdownVisible = false}
            returnKeyType="done"
            placeholderTextColor="#888"
          />
          {itemFromNameInputs.dropdownVisible && (
            <FlatList
              style={styles.dropdown}
              data={totalsData} // Pass the array to FlatList
              keyExtractor={(item) => item.name} // Use the name as a unique key
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.dropdownItem} onPress={() => handleNameSelect(item, itemFromNameInputs)}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
        <View style={{justifyContent : 'center'}}>
          <TouchableOpacity onPress={() => {removeName(itemFromNameInputs.id)}}
            style={{
                justifyContent : 'center',
                alignItems : 'center',
                width : 25, height : 25,
            }}
          >
            <Text style={{color : 'red', fontSize : 25}}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <Provider theme={theme}>
      <ScrollView>
        <View style={styles.container}>
            <View style={{flexDirection : 'row', justifyContent: 'space-between', alignItems : 'center'}}>
              <Text style={styles.title}>Bill Splitting App</Text>
              <View>
                <TouchableOpacity onPress={resetApp} style={styles.resetButton}>
                  <Text style={{color : 'red'}}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
              
            <RadioButton.Group
              onValueChange={(value) => setDiscountValue(parseFloat(value))}
              value={discountValue.toString()}
            >
              <View style={styles.row}>
                <RadioButton.Item label="No Discount" value="0" labelStyle={{ color: '#000' }}/>
                <RadioButton.Item label="10%" value="0.1" labelStyle={{ color: '#000' }}/>
                <RadioButton.Item label="20%" value="0.2" labelStyle={{ color: '#000' }}/>
              </View>
            </RadioButton.Group>
            <TextInput
              style={styles.input}
              placeholder="Enter Item Price"
              keyboardType="numeric"
              value={itemPrice}
              onChangeText={setItemPrice}
              returnKeyType="done"
              placeholderTextColor="#888"
            />

            {/*Name Boxes */}
            <View style={{flexDirection : 'row', justifyContent: 'space-between', alignItems : 'center'}}>
              <Text style={styles.label}>Select or Enter Person:</Text>
              <View style={{justifyContent : 'center'}}>
                <TouchableOpacity onPress={() => {setNameInputs([...nameInputs, {id : nameInputs[nameInputs.length-1].id+1, name : ''}])}}
                  style={{ justifyContent : 'center', alignItems : 'center',}}
                >
                  <Text style={{color : '#6200ee', fontSize : 30}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{marginBottom : 16}}>
              {nameInputs.map((item) => (
                showNameBox(item)
              ))}
            </View>
            

            {/*Price Type */}
            <Text style={styles.label}>Price Type : </Text>
                <View style={styles.row}>
                  <Button
                    mode={dButtonActive ? 'contained' : 'outlined'}
                    onPress={() => {
                      setDiscount(true);
                      setTax(false);
                      setDButtonActive(true);
                      setJButtonActive(false);
                      setHButtonActive(false);
                      setAButtonActive(false);
                      }}
                    style={dButtonActive ? styles.buttonActive : styles.buttonInactive}
                  >
                    D
                  </Button>
                  <Button
                    mode={jButtonActive ? 'contained' : 'outlined'}
                    onPress={() => {
                      setDiscount(true);
                      setTax(true);
                      setDButtonActive(false);
                      setJButtonActive(true);
                      setHButtonActive(false);
                      setAButtonActive(false);
                    }}
                    style={jButtonActive ? styles.buttonActive : styles.buttonInactive}
                  >
                    J
                  </Button>
                  <Button
                    mode={hButtonActive ? 'contained' : 'outlined'}
                    onPress={() => {
                      setDiscount(false);
                      setTax(false);
                      setDButtonActive(false);
                      setJButtonActive(false);
                      setHButtonActive(true);
                      setAButtonActive(false);
                    }}
                    style={hButtonActive ? styles.buttonActive : styles.buttonInactive}
                  >
                    H
                  </Button>
                  <Button
                    mode={aButtonActive ? 'contained' : 'outlined'}
                    onPress={() => {
                      setDiscount(false);
                      setTax(true);
                      setDButtonActive(false);
                      setJButtonActive(false);
                      setHButtonActive(false);
                      setAButtonActive(true);
                    }}
                    style={aButtonActive ? styles.buttonActive : styles.buttonInactive}
                  >
                    A
                  </Button>
                </View>
              <View>
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalView}>

                      {/*Tax or No Tax */}
                      <Text style={styles.label}>Tax:</Text>
                      <View style={styles.row}>
                        <Button
                          mode={tax ? 'contained' : 'outlined'}
                          onPress={() => setTax(true)}
                          style={tax ? styles.buttonActive : styles.buttonInactive}
                        >
                          Tax
                        </Button>
                        <Button
                          mode={!tax ? 'contained' : 'outlined'}
                          onPress={() => setTax(false)}
                          style={!tax ? styles.buttonActive : styles.buttonInactive}
                        >
                          No Tax
                        </Button>
                      </View>

                      {/*Discount or No Discount */}
                      <Text style={styles.label}>Discount:</Text>
                      <View style={styles.row}>
                        <Button
                          mode={discount ? 'contained' : 'outlined'}
                          onPress={() => setDiscount(true)}
                          style={discount ? styles.buttonActive : styles.buttonInactive}
                        >
                          Discount
                        </Button>
                        <Button
                          mode={!discount ? 'contained' : 'outlined'}
                          onPress={() => setDiscount(false)}
                          style={!discount ? styles.buttonActive : styles.buttonInactive}
                        >
                          No Discount
                        </Button>
                      </View>
                      <View>
                        <Button 
                          style={{width : '30%', alignSelf : 'flex-end',}} 
                          onPress={() => setModalVisible(!modalVisible)}
                        >Done
                        </Button>
                      </View>
                    </View>
                  </View>
                </Modal>

                <Button style={{marginTop : -5,width : '50%', alignSelf : 'center',}}  onPress={() => setModalVisible(true)}>
                  Custom Type
                </Button>
              </View> 
            <Button mode="contained" onPress={calculateSplit} style={styles.calculateButton}>
              Calculate Split
            </Button>

            <Text style={styles.result}>
              Final Amount for This Item: {splitAmount.toFixed(2)}
            </Text>

            <View style={styles.totalsContainer}>
              <Text style={styles.totalsTitle}>Totals for Each Person:</Text>
              {Object.keys(totals).length > 0 ? (
                Object.entries(totals).map(([name, total]) => (
                  <Text key={name} style={styles.totalsText}>
                    {name}: ${total.toFixed(2)}
                  </Text>
                ))
              ) : (
                <Text style={styles.totalsText}>No data available.</Text>
              )}
            </View>
        </View>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    justifyContent: 'spaced-between',
    paddingTop: 60,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginVertical: 4,
    fontWeight: '500',
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 4,
  },
  buttonActive: {
    borderRadius: 10,
    backgroundColor: '#6200ee',
    color: '#ffffff',
    marginVertical : 5,
  },
  buttonInactive: {
    borderWidth: 1,
    borderColor: '#6200ee',
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    color : '#6200ee',
    marginVertical : 5,
  },
  calculateButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
  result: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
  },
  totalsContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  totalsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
  },
  totalsText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 150,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalView: {
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    alignContent : 'center',
    width: '90%', // Take 80% of screen width
    padding: 20,
    borderRadius: 10,
  },
  resetButton: {
    justifyContent : 'center',
    alignItems : 'center',
    borderWidth: 2,
    borderColor: '#d32f2f', // Red background
    borderRadius: 10,
    width : 55,
    height: 35, // Set the height of the logo
  },
  
});
