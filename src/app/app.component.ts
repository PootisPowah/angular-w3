import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



interface Note {
  index: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public tempTitle: string = '';
  public tempDesc: string = '';

  public index = -1;
  public invalidTitle: boolean = true;
  public invalidDesc: boolean = true;

  public showEdit: boolean = false;
  public notes: Note[] = [];
  public selectedNote;
  public selectedNoteBool: boolean = false;
  public noteIndexCounter = 0;

  public processInputNoteTitle(event: any) {
    this.tempTitle = event.target.value;
    this.invalidTitle = this.tempTitle.length < 5;
  }

  public processInputNoteDesc(event: any) {
    this.tempDesc = event.target.value;
    this.invalidDesc = this.tempDesc.length < 7;
  }



  public processSaveNoteData() {
    if (!this.invalidTitle && !this.invalidDesc) {
      const newNote: Note = { index: this.noteIndexCounter++, title: this.tempTitle, description: this.tempDesc };
      this.notes.push(newNote);
      this.clearData();

    }
  }
  public clearData() {
    this.tempTitle = '';
    this.tempDesc = '';
    this.invalidTitle = true;
    this.invalidDesc = true;
    this.showEdit = false;

  }



  public selectNote(note: Note) {
    this.selectedNote = note;
    this.selectedNoteBool = true;

  }



  public showOptions(note: any): boolean {
    this.selectedNoteBool = true;

    return this.selectedNote === note;
  }
  public deleteNote(note: Note) {
    const index = this.notes.findIndex(n => n.index === note.index);
    if (index > -1) {
      this.notes.splice(index, 1);
    }

  }


  public editNote(note: Note) {
    if (note.index !== undefined) {


      this.tempTitle = note.title;
      this.tempDesc = note.description;
      this.showEdit = true;
    }

  }
  public processEditNote() {
    if (this.selectedNote && !this.invalidTitle && !this.invalidDesc) {
      const editedNote: Note = { index: this.selectedNote.index, title: this.tempTitle, description: this.tempDesc };
      const index = this.notes.findIndex(n => n.index === this.selectedNote.index);
      if (index > -1) {
        this.notes[index] = editedNote;
      }
      this.clearData();
    }
  }
}
