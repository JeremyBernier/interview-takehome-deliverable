import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import { createLanguageModel, createJsonTranslator } from 'typechat';

import { FilterResponse } from '@/types/filters';

// Don't forget to set the OPENAI_API_KEY and OPENAI_MODEL environment variables!
// Email tim@mydeliverable.com if you need help getting an API key
const model = createLanguageModel(process.env);
const schema = fs.readFileSync('./types/filters.ts', 'utf-8');
const translator = createJsonTranslator<FilterResponse>(model, schema, 'FilterResponse');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).send({ error: 'Missing query parameter' });
  }
  const response = await translator.translate(query);
  if (!response.success) {
    console.error(response.message);
    return res.status(500).send({ error: 'Failed to call OpenAI API' });
  }
  return res.status(200).send({ data: response.data });
}
