 import { useState, useEffect } from "react";
 import React from 'react';
 import axios from "axios";
 import './Cards.css'
 
 function Cards() {
   let[state,setState] = useState([]);

    useEffect(()=>{
        axios.get('https://www.reddit.com/r/reactjs.json').then((res)=>{ const children = res.data.data.children.map((child)=>({
          title:child.data.title,
          selftext_html:child.data.selftext_html,
          url:child.data.url,
          score:child.data.score
        }));
      setState(children)
      })
        .catch((error)=>{
            console.log("Error while fetching data",error)
        })
    },[])
   return (
     <div className="container">
      <h1>ReactJs Reddit Posts</h1>
       <div className="card-wrapper">
       {state.map((child,index) => {
        return (
          <div key={index} className="card">
          <h2>{child.title}</h2>
          <div>
          <p
              dangerouslySetInnerHTML={{
                __html: child.selftext_html || "No description available.",
              }}
            ></p>
          <a href={child.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
          <p><strong>Score :</strong>{child.score}</p>
          </div>
        </div>
        )
        })}
       </div>
     </div>
   )
 }
 
 export default Cards;
 