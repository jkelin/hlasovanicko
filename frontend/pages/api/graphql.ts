import { NextApiRequest, NextApiResponse } from 'next'
import Axios, { AxiosError } from 'axios'
import http from 'http'
import https from 'https'

const axios = Axios.create({
  baseURL: process.env.BACKEND_URI,
  timeout: 5000,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
})

export default async (req: NextApiRequest, res: NextApiResponse, next) => {
  if (req.method === 'POST') {
    try {
      const response = await axios.request({
        method: req.method,
        url: '/graphql',
        data: req.body,
        params: req.query,
      })

      return res.status(response.status).send(response.data)
    } catch (ex) {
      const err: AxiosError = ex

      if (err.isAxiosError && err.response) {
        return res.status(err.response.status).send(err.response.data)
      } else {
        console.error(ex)
        return res.status(500).send('Internal error')
      }
    }
  }

  return res.status(400).send('Bad request')
}
