import { Client } from '@elastic/elasticsearch'
import dotenv from 'dotenv'
dotenv.config()

export const client = new Client({
  node: process.env.ES_ENDPOINT,
  auth: {
    apiKey: {
      id: process.env.ES_API_ID,
      api_key: process.env.ES_API_KEY,
    }
  }
})

export const esPing = async (esClient)=>{
  try {
    const result = await esClient.ping()
    if (result) {
      console.log('Elasticsearch is up and running!')
    }
    else{
      console.log(`Something went wrong...`)
    }
  } catch (error) {
    console.log(error)
  }

}
