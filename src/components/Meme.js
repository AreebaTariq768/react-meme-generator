import React from 'react'
import { useState ,useEffect ,createRef } from 'react';
import {createFileName , useScreenshot} from 'use-react-screenshot'

function Meme() {

  const [img, setImage] = useState(null);   
  const [meme, setmeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: ""
  })
  // const [allMeme, setAllMeme] = useState(memesData);
//  console.log(allMeme)
//  useeffect will render when dom is painted and when components renders 
  // useEffect(() => {
  //  async function getmemes() {
  //     const res = await  fetch('https://api.imgflip.com/get_memes')
  //     const data = await res.json()
  //     setAllMeme(data)

  //   }
  //  getmemes();
    // Optional Clean-up function  (effect will return another function that is cleanup after any sideEffects in case your components dies)
    // return () => {
      
    // };
  // }, []);

  function handleChange(event) {
    const {name ,value} = event.target;

  setmeme(prev =>({
    ...prev,
    [name] : value
  }))
  }

 

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      // console.log(file);
      const reader = new FileReader();
  
      reader.onload = () => {
        setImage(reader.result);
      };
  
      if (file) {
        reader.readAsDataURL(file);
      }
    };

    // for downloading
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
    <>
      <main>
      <div class="form">
  <div class="input-container">
    <input
      type="text"
      class="form--input"
      placeholder="topText"
      name="topText"
      value={meme.topText}
      onChange={handleChange}
    />
    <input
      type="text"
      class="form--input"
      placeholder="bottomText"
      name="bottomText"
      value={meme.bottomText}
      onChange={handleChange}
    />
    <input
      type="file"
      accept="image/*"
      class="form--input"
      name="file"
      onChange={handleImageUpload} 
    />
  </div>
  <button onClick={downloadScreenshot} class="form--button">Get a new meme image</button>
</div>

        <div className='meme'ref={ref} >
          {/* <img className='meme-image' src={meme.randomImage} alt='meme Images '></img> */}
        {img ?  <img className='meme-image' src={img} alt='meme Images '></img> : <div style={{margin: '50px' }}>Upload the image first</div> } 
          <h2 className='top meme-text'>{meme.topText}</h2>
          <h2 className='bottom meme-text'>{meme.bottomText}</h2>
        </div>


      </main>

    </>
  )
}

export default Meme