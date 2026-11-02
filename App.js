
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === '') {
      return;
    }

    setTasks([
      ...tasks,
      {id: Date.now().toString(), name: task.trim(), done: false},
    ]);
    setTask('');
  };

  const completeTask = id => {
    setTasks(
      tasks.map(item =>
        item.id === id ? {...item, done: !item.done} : item,
      ),
    );
  };

  const deleteTask = id => {
    setTasks(tasks.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f5f7" />

      <Text style={styles.heading}>My To-Do List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.taskRow}>
            <TouchableOpacity
              style={styles.taskTextArea}
              onPress={() => completeTask(item.id)}>
              <Text style={[styles.taskText, item.done && styles.done]}>
                {item.name}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No tasks yet. Add one above!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    padding: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 30,
    marginBottom: 25,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 12,
    color: '#222',
  },
  addButton: {
    backgroundColor: '#3478f6',
    padding: 14,
    marginLeft: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addText: {
    color: 'white',
    fontSize: 16,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  taskTextArea: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#222',
  },
  done: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteText: {
    color: 'red',
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
    fontSize: 16,
  },
});

export default App;
