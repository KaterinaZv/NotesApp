import uuid from './utils/uuid';
import Config from './constans/config';

const createEmptyNote = () => ({ 
  id: uuid(),
  text: '#Новая заметка',
});

class NoteModel {
  constructor() {
    this.notes = [];
    this.selectItemId = null;
  }

  get SelectItemId() {
    return this.selectItemId;
  }

  set SelectItemId(id) {
    this.selectItemId = id;
  }

  create() {
    const newNote = createEmptyNote();
    this.notes.unshift(newNote);

    return newNote;

  }

  update(note) {
    this.notes = this.notes.map((item) => (item.id === note.id ? note : item));
    localStorage.setItem(Config.NOTES_LOCAL_STORAGE_KEY, JSON.stringify(this.notes));

  }

  remove(note) {
    const noteIndex = this.notes.findIndex((item) => (item.id === note.id));
    this.notes.splice(noteIndex, 1);
    localStorage.setItem(Config.NOTES_LOCAL_STORAGE_KEY, JSON.stringify(this.notes));
  }

  load() {
    const notes = JSON.parse(localStorage.getItem(Config.NOTES_LOCAL_STORAGE_KEY));
    if (notes) {
      this.notes = notes;
    }
    this.notes.unshift(createEmptyNote());
    return this.notes;
  }
}

export default NoteModel;
