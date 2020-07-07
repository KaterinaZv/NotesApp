import Actions from './constans/actions';

class NoteController {

  constructor(model, view) {
    this.model = model;

    this.view = view;

    this.init();

    this.view.on(Actions.CREATE_NOTE, this.create.bind(this));
    this.view.on(Actions.TEXTAREA_CHANGE, this.update.bind(this));
    this.view.on(Actions.SET_NOTE_VIEW, this.changeNoteView.bind(this));
    this.view.on(Actions.REMOVE_NOTE, this.remove.bind(this));
  }

  init() {
    const notes = this.model.load();
    this.view.init(notes);
    this.model.SelectItemId = this.model.notes[0].id;
  }

  remove(note) {
    this.model.remove(note);
    this.view.renderSidebar(this.model.notes);

    if (note.id === this.model.SelectItemId) {
      this.view.hideTextarea();
    }
  }

  create() {
    const note = this.model.create();
    this.view.renderSidebar(this.model.notes);
    this.changeNoteView(note);
  }

  update(note) {
    this.model.update(note);
    this.view.renderSidebar(this.model.notes);
  }

  changeNoteView(note) {
    this.model.SelectItemId = note.id;
    this.view.setNote(note);
    this.view.showTextarea();
  }

}

export default NoteController;
