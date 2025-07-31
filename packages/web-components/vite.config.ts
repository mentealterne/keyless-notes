import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/NoteItem.ts'),
      formats: ['es'],
      fileName: () => 'src/NoteItem.js',
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['lit', 'date-fns'],
    },
    emptyOutDir: true,
  }
});
