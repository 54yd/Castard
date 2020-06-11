import React, { useEffect, useState, useMemo, useLayoutEffect } from "react";

import { css } from "emotion";
import { Card, Carousel, Grid, Tag } from "antd-mobile";
import axios from "axios";

// Constructors
// ------------------------------
const targetURL =
  "https://api.gfycat.com/v1/gfycats/search?search_text=kaguya+sama";

// Functional Component
// ------------------------------
const KaguyaGifGrid = () => {
  const [shuffle, setShuffle] = useState(0);
  const [gifs, setGifs] = useState([1, 2, 3]);

  // Components
  // ------------------------------
  const CR = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        objectFit: "cover"
      }}
    >
      {gifs.map((url, index) => (
        <Card style={{ maxWidth: "200px", maxHeight: "200px" }}>
          <img src={gifs[index]} style={{ objectFit: "cover" }} />
        </Card>
      ))}
    </div>
  );

  // GetData
  // ------------------------------
  const getKaguyaGifsArray = async () => {
    const response = await axios.get(targetURL);

    //JSON.stringify や .jsonは不要。　そのままプロパティの参照で行ける(最初はdataから始まるのが大体のAPIのデファクトスタンダードぽい)
    const kaguyaGifsArray = response.data.gfycats;

    //console.table(kaguyaGifsArray);
    return kaguyaGifsArray;
  };

  // Effects
  // ------------------------------
  useEffect(() => {
    //useEffect直下にはasyncを置くとエラーが出るので、構文の仕様都合で下に置いた,これ違う形でエラーとして出るので、かなり悩んだ
    const getGifsParsed = async () => {
      // Get
      const gifsArrayRaw = await getKaguyaGifsArray();
      const urls = gifsArrayRaw.map((value, index) => value.max2mbGif);
      // Parse
      // setterはasyncの中に入れないとpromise中が返ってきてセットできない
      setGifs(urls);
      setShuffle(Math.floor(Math.random * 9.0));
      console.log(Math.floor(Math.random * 9.0));
    };

    getGifsParsed();
    console.log(gifs);
    console.log(shuffle);
  }, []);

  // Render
  // ------------------------------
  return (
    <div
      style={{
        display: "flex",
        //justifyContent: "center",
        //alignItems: "center",
        flexWrap: "wrap"
        //verticalAlign: "top"
        //objectFit: "cover"
        //objectPosition: "top"
      }}
    >
      <CR />
    </div>
  );
};

export default KaguyaGifGrid;
