import { css, html, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { format } from 'date-fns'

@customElement('note-item')
export class NoteItem extends LitElement {
  static override styles = css`
      :root {
          --primary: #EBF2FA;
          --secondary: #5C5552;
          --accent: #05668D;
          --accent-dark: #bed6f8;
          --font-raleway-sans: "Raleway", sans-serif;
          --font-noto-serif: "Noto Serif", serif;
      }
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
          padding: 0.5rem 1rem;
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

  @property({ type: String }) heading = 'New note';
  @property({ type: String }) text = 'write something here...';
  @property({ type: String }) lastUpdated = '';

  @state() private formattedDate = '';

  override updated(changedProps: Map<string, unknown>) {
    if (changedProps.has('lastUpdated')) {
      try {
        const parsedDate = new Date(this.lastUpdated);
        this.formattedDate = format(parsedDate, 'd LLL yyyy');
      } catch {
        this.formattedDate = this.lastUpdated;
      }
    }
  }

  override render() {
    return html`
      <div class="container ">
        <div class="hover-overlay"></div>
        <h2 class="title">${this.heading}</h2>
        <p class="text">${this.text}</p>
        <p class="date">${this.formattedDate}</p>
      </div>
    `;
  }
}
