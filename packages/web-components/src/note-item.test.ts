import { expect, fixture, html, oneEvent } from '@open-wc/testing'
import './NoteItem'
import { NoteItem } from './NoteItem'

describe('<note-item>', () => {
  it('renders with default properties', async () => {
    const el = await fixture<HTMLDivElement>(html`<note-item></note-item>`);
    const title = el.shadowRoot!.querySelector('.title')!;
    const text  = el.shadowRoot!.querySelector('.text')!;
    const date  = el.shadowRoot!.querySelector('.date')!;

    expect(title.textContent).to.equal('New note');
    expect(text.textContent).to.equal('No text provided');
    expect(date.textContent).to.be.a('string').and.not.be.empty;
  });

  it('updates when properties are set', async () => {
    const sampleDate = new Date('2025-08-04T12:34:56Z');
    const el = await fixture<HTMLDivElement>(html`
      <note-item
        noteID="abc123"
        heading="Hello"
        text="World"
        .lastUpdated="${sampleDate}"
        .isCollapsed="${true}"
      ></note-item>
    `);

    const title = el.shadowRoot!.querySelector('.title')!;
    const text  = el.shadowRoot!.querySelector('.text')!;
    const date  = el.shadowRoot!.querySelector('.date')!;

    expect(title.textContent).to.equal('Hello');
    expect(text).to.be.null;
    expect(date.textContent).to.match(/^4 Aug 2025$/);
  });

  it('emits `note-selected` with correct detail on click', async () => {
    const sampleDate = new Date('2025-01-01T08:00:00Z');
    const el = await fixture<NoteItem>(html`
        <note-item
                noteID="xyz"
                heading="Test"
                text="Click me"
                .lastUpdated="${sampleDate}"
        ></note-item>
    `);

    const container = el.shadowRoot!.querySelector('.container')! as HTMLElement;
    const eventPromise = oneEvent(el, 'note-selected');
    container.click();
    const ev = await eventPromise;

    expect(ev.detail).to.deep.equal({
      id:          'xyz',
      heading:     'Test',
      text:        'Click me',
      lastUpdated: sampleDate,
    });
  });

});
