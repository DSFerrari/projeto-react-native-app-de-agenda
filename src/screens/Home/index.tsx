import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, FlatList, Alert } from "react-native"
import { styles } from "./styles"
import { Participant } from "../../components/Participant";

export function Home(){
  const [participants, setParticipants] = useState<string[]>([]);
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd(){
    if(participants.includes(participantName)){
    return  Alert.alert('Participante existe , Partipante já inscrito');
    };
    if(participantName==""){
    return Alert.alert('Nome invalido');
    }
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName('');
  }
  function handleParticipantRemove(name: String){

    Alert.alert('Remover', `Remover participante ${name}?`,[
      {
        text: 'Sim',
        onPress:() => setParticipants(prevState => prevState.filter(participant => participant !== name)),
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
      Nome do evento
      </Text>
      <Text style={styles.eventDate}>
      Sexta, 7 de Fevereiro de 2025.
      </Text>
      <View style={styles.form}
      >
      <TextInput
      style={styles.input}
      placeholder="Nome do participante"
      placeholderTextColor="#6B6B6B" 
      onChangeText={setParticipantName}
      value={participantName}
      />
      <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}
      >
      <Text style={styles.buttonText}>
       +
      </Text>
      </TouchableOpacity>
      </View>
      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({item}) => (
          <Participant 
          key={item}
          name={item} 
          onRemove={() => handleParticipantRemove(item)}/>
        )}

        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguem chegou no evento ainda? Adicione participantes
          </Text>
        )}
      />
    </View>
  )
}