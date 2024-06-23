import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function ModalOptionsComponent({
  modalVisibility,
  setModalVisibility,
}: {
  modalVisibility: boolean;
  setModalVisibility: (modalVisibility: boolean) => void;
}) {
  return (
    <Modal visible={modalVisibility} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Options</Text>
          <TouchableOpacity
            style={[styles.buttonContainer, {marginBottom: 10}]}>
            <Text>Delete Task</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setModalVisibility(false)}
            style={styles.buttonContainer}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    minWidth: 250,
  },
  title: {
    color: 'black',
    fontSize: 20,
    fontFamily: 'Gilroy-SemiBold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: 70,
    alignItems: 'center',
    fontFamily: 'Gilroy-Black',
  },
});
