'use client'
import React from 'react'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

const Greet = () => {
    const {data} = useQuery({
        queryKey: ['greet'],
        queryFn: async () => {
            const res = await axios.get('http://ec2-16-171-43-145.eu-north-1.compute.amazonaws.com:8000/')
            return res.data
        }
    })
  return (
    <div>
        <h1>{data}</h1>
    </div>
  )
}

export default Greet