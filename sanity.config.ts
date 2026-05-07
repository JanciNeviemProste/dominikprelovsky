import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'default',
  title: 'Dominik Prelovský — CMS',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Obsah')
          .items([
            S.listItem()
              .title('Nastavenia stránky')
              .child(
                S.document().schemaType('siteSettings').documentId('siteSettings'),
              ),
            S.divider(),
            S.documentTypeListItem('service').title('Služby'),
            S.documentTypeListItem('transformation').title('Premeny klientov'),
            S.documentTypeListItem('testimonial').title('Recenzie'),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
