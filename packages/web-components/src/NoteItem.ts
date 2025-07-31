import { css, html, LitElement, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { format } from "date-fns";

@customElement("note-item")
export class NoteItem extends LitElement {
  static override styles = css`
    :host {
      display: block;
      cursor: pointer;
    }
    * {
      margin: 0;
      padding: 0;
    }

    .container {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      position: relative;
      padding-bottom: 1rem;
      border-radius: 0.375rem;
      overflow: hidden;
      transition: box-shadow 0.2s ease-in-out;
    }

    .hover-overlay {
      position: absolute;
      inset: 0;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 0.375rem;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease-in-out;
    }

    .container:hover .hover-overlay {
      opacity: 1;
    }

    .title {
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--accent);
      position: relative;
      z-index: 10;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .text {
      font-size: 0.875rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      color: var(--secondary);
      z-index: 10;
    }

    .date {
      font-size: 0.75rem;
      color: var(--secondary);
      position: relative;
      z-index: 10;
    }
  `;

  @property({ type: String }) noteID = "";
  @property({ type: String }) heading = "New note";
  @property({ type: String }) text = "write something here...";
  @property({ type: String }) lastUpdated = "";
  @property({ type: Boolean }) isCollapsed = false;

  @state() private formattedDate = "";

  override updated(changedProps: Map<string, unknown>) {
    if (changedProps.has("lastUpdated")) {
      try {
        const parsedDate = new Date(this.lastUpdated);
        this.formattedDate = format(
          parsedDate,
          !this.isCollapsed ? "d LLL yyyy HH:mm" : "d LLL yyyy",
        );
      } catch {
        this.formattedDate = this.lastUpdated;
      }
    }

    if (changedProps.has("isCollapsed")) {
      this.formattedDate = format(
        new Date(this.lastUpdated),
        !this.isCollapsed ? "d LLL yyyy HH:mm" : "d LLL yyyy",
      );
    }
  }

  override render() {
    return html`
      <div class="container" @click=${this.handleClick}>
        <div class="hover-overlay"></div>
        <h2 class="title">${this.heading}</h2>
        ${this.isCollapsed ? nothing : html`<p class="text">${this.text}</p>`}
        <p class="date">${this.formattedDate}</p>
      </div>
    `;
  }

  private handleClick = () => {
    this.dispatchEvent(
      new CustomEvent("note-selected", {
        detail: {
          id: this.noteID,
          heading: this.heading,
          text: this.text,
          lastUpdated: this.lastUpdated,
        },
        bubbles: true,
        composed: true,
      }),
    );
  };
}
