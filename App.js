import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = '@notes';
const THEME_KEY = '@theme';

export default function App() {
  const [note, setNote] = useState('');
  const [search, setSearch] = useState('');
  const [notes, setNotes] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load data saat aplikasi dibuka
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem(NOTES_KEY);
      const savedTheme = await AsyncStorage.getItem(THEME_KEY);

      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }

      if (savedTheme !== null) {
        setDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveNotes = async (newNotes) => {
    try {
      setNotes(newNotes);
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(newNotes));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme = async () => {
    const value = !darkMode;
    setDarkMode(value);
    await AsyncStorage.setItem(THEME_KEY, JSON.stringify(value));
  };

  const addNote = () => {
    if (note.trim() === '') {
      Alert.alert('Peringatan', 'Catatan tidak boleh kosong.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      text: note,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    saveNotes([newItem, ...notes]);
    setNote('');
  };

  const toggleComplete = (id) => {
    const updated = notes.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    saveNotes(updated);
  };

  const deleteNote = (id) => {
    Alert.alert(
      'Hapus Catatan',
      'Yakin ingin menghapus catatan ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            const filtered = notes.filter((item) => item.id !== id);
            saveNotes(filtered);
          },
        },
      ]
    );
  };

  const filteredNotes = notes.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );
    return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: darkMode ? "#1E1E2E" : "#FFF0F6" },
      ]}
    >
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      <Text
        style={[
          styles.title,
          { color: darkMode ? "#FFFFFF" : "#C2185B" },
        ]}
      >
        🌸 My Daily Planner
      </Text>

      <Text
        style={[
          styles.subtitle,
          { color: darkMode ? "#DDDDDD" : "#666" },
        ]}
      >
        Plan your beautiful day ✨
      </Text>

      <TouchableOpacity
        style={styles.themeButton}
        onPress={toggleTheme}
      >
        <Text style={styles.themeText}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: darkMode ? "#2C2C3A" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
          },
        ]}
        placeholder="Tulis kegiatan..."
        placeholderTextColor="#999"
        value={note}
        onChangeText={setNote}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={addNote}
      >
        <Text style={styles.addButtonText}>
          ➕ Tambah
        </Text>
      </TouchableOpacity>

      <TextInput
        style={[
          styles.searchInput,
          {
            backgroundColor: darkMode ? "#2C2C3A" : "#FFFFFF",
            color: darkMode ? "#FFFFFF" : "#000000",
          },
        ]}
        placeholder="🔍 Cari catatan..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text
            style={[
              styles.empty,
              { color: darkMode ? "#CCCCCC" : "#777" },
            ]}
          >
            🌷 Belum ada catatan.
          </Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: darkMode
                  ? "#2C2C3A"
                  : "#FFFFFF",
              },
            ]}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => toggleComplete(item.id)}
            >
              <Text
                style={[
                  styles.noteText,
                  {
                    color: darkMode
                      ? "#FFFFFF"
                      : "#333333",
                    textDecorationLine: item.completed
                      ? "line-through"
                      : "none",
                  },
                ]}
              >
                {item.completed ? "✅ " : "🩷 "}
                {item.text}
              </Text>

              <Text style={styles.time}>
                {item.createdAt}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deleteNote(item.id)}
            >
              <Text style={styles.deleteText}>
                🗑️
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
  const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 20,
    fontSize: 15,
  },

  themeButton: {
    alignSelf: 'center',
    backgroundColor: '#D291BC',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  themeText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  input: {
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 12,
    elevation: 2,
  },

  addButton: {
    backgroundColor: '#FF69B4',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },

  addButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  searchInput: {
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    elevation: 2,
  },

  card: {
    borderRadius: 18,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },

  noteText: {
    fontSize: 17,
    fontWeight: '600',
  },

  time: {
    marginTop: 5,
    color: '#999',
    fontSize: 12,
  },

  deleteButton: {
    backgroundColor: '#FF6B81',
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteText: {
    fontSize: 18,
  },

  empty: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 18,
    fontStyle: 'italic',
  },
});