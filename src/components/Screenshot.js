import React, { createRef, useState } from 'react'
import {createFileName , useScreenshot} from 'use-react-screenshot'
import memeimage from '../meme.jpg'

export default function () {

    const ref = createRef(null)

    const [image, takeScreenshot] = useScreenshot(
        {
            type:'image/jpeg',
            quality :1.0
        }
    )
    const download =(image,{name='sample' , extention='jpg'} ={}) =>{
        const a = document.createElement('a')
        a.href =image
        a.download= createFileName(extention,name)
        a.click()
    }
    const downloadScreenshot =() =>{
        takeScreenshot(ref.current).then(download)
    }

   return (
    <div>
      <div>
        <button style={{ marginBottom: '10px' }} onClick={downloadScreenshot}>
          Take screenshot
        </button>
      </div>
      {/* <img src={image} alt={'Screenshot'} /> */}
      <div ref={ref}>
       <h1> cx cnc</h1>
       <img src={memeimage} alt="Description of the image" />
       <p>mzcmcn</p>
      </div>
    </div>
  )
}
