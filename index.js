import dotenv from 'dotenv';
import express from 'express';
dotenv.config()

import { client, esPing } from "./util/elastic-search.js";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  esPing(client)
  console.log(`Server is running on port ${PORT}.`);
});

app.post('/api/v1/index', async (req, res) => {
  try {
    const { index, body } = req.body;
    const result = await client.index({
      index: index,
      type: '_doc',
      body: body
    })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
});

app.get('/api/v1/index', async (req, res) => {
  try {
    const { index } = req.query;
    const result = await client.search({
      index: index
    })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
});

app.post('/api/v1/search', async (req, res) => {
  const { index, query } = req.body;
  try {
    const result = await client.search({
      index: index,
      body: {
        query: {
          match: query
        }
      }
    })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
});

app.put('/api/v1/index', async (req, res) => {
  const { index, id, body } = req.body;
  try {
    const result = await client.update({
      index: index,
      id: id,
      body: {
        doc: body
      }
    })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
});

app.delete('/api/v1/index', async (req, res) => {
  const { index, id } = req.body;
  try {
    const result = await client.delete({
      index: index,
      id: id
    })
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  }
});
