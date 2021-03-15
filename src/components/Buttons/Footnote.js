import Button from "./Button.js";
import { EditorSelection } from "@codemirror/state";

export default class Footnote extends Button {

  get button() {
    return {
      icon: "footnote",
      label: "Footnote",
      command: this.command,
    };
  }

  keys() {
    return [
      {
        mac: "Mod-Ctrl-k",
        run: this.command,
      }
    ];
  }

  get command() {
    return () => this.editor.dispatch(this.editor.state.changeByRange(range => ({
      changes: [{from: range.from, insert: "[^"}, {from: range.to, insert: "]"}],
      range: EditorSelection.range(range.from + 2, range.to + 2)
    })));
  }

  get name() {
    return "footnote";
  }

  get isDisabled() {
    return () => this.editor.isActiveToken("kirbytag") || this.editor.isActiveToken("FencedCode");
  }
}