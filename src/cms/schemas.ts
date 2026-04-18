/**
 * Sanity schema stubs — ready to be moved into a sanity-studio workspace.
 * Scope matches the Case Study data shape used across the site so that
 * swapping the local data/cases.ts for a live CMS fetch is a 1-file change.
 *
 * Deploy path, once Sanity project is connected:
 *   1. `npm create sanity@latest -- --template clean --dataset production`
 *   2. Drop these schemas into `schemas/` of the studio.
 *   3. Replace the static import in `src/data/cases.ts` with a `getCases()`
 *      fetch using @sanity/client against `NEXT_PUBLIC_SANITY_PROJECT_ID`.
 */
export const caseStudySchema = {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title.ru' }, validation: (r: any) => r.required() },
    { name: 'year', title: 'Year', type: 'number', validation: (r: any) => r.required() },
    { name: 'featured', title: 'Featured on homepage', type: 'boolean' },
    { name: 'accent', title: 'Accent colour (hex)', type: 'string' },
    {
      name: 'client',
      title: 'Client',
      type: 'object',
      fields: [
        { name: 'ru', title: 'RU', type: 'string' },
        { name: 'en', title: 'EN', type: 'string' },
      ],
    },
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'ru', title: 'RU', type: 'string' },
        { name: 'en', title: 'EN', type: 'string' },
      ],
    },
    { name: 'industryId', title: 'Industry', type: 'string' },
    { name: 'primaryService', title: 'Primary service', type: 'string' },
    { name: 'serviceIds', title: 'Service IDs', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'summary',
      title: 'Summary',
      type: 'object',
      fields: [
        { name: 'ru', title: 'RU', type: 'text', rows: 3 },
        { name: 'en', title: 'EN', type: 'text', rows: 3 },
      ],
    },
    {
      name: 'task',
      title: 'Task',
      type: 'object',
      fields: [
        { name: 'ru', title: 'RU', type: 'text', rows: 4 },
        { name: 'en', title: 'EN', type: 'text', rows: 4 },
      ],
    },
    {
      name: 'solution',
      title: 'Solution',
      type: 'object',
      fields: [
        { name: 'ru', title: 'RU', type: 'text', rows: 6 },
        { name: 'en', title: 'EN', type: 'text', rows: 6 },
      ],
    },
    {
      name: 'deliverables',
      title: 'Deliverables',
      type: 'object',
      fields: [
        { name: 'ru', title: 'RU', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'EN', type: 'array', of: [{ type: 'string' }] },
      ],
    },
    {
      name: 'metrics',
      title: 'Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value', type: 'string' },
            {
              name: 'label',
              title: 'Label',
              type: 'object',
              fields: [
                { name: 'ru', title: 'RU', type: 'string' },
                { name: 'en', title: 'EN', type: 'string' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
  ],
};

export const teamMemberSchema = {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        { name: 'ru', title: 'RU', type: 'string' },
        { name: 'en', title: 'EN', type: 'string' },
      ],
    },
    { name: 'roleKey', title: 'Role key (see messages)', type: 'string' },
    { name: 'order', title: 'Display order', type: 'number' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
  ],
};

export const schemas = [caseStudySchema, teamMemberSchema];
