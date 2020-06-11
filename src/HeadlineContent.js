import React, { useEffect, useState } from "react";
import { css } from "emotion";
import {
  Flex,
  Carousel,
  PlaceHolder,
  Card,
  WingBlank,
  WhiteSpace
} from "antd-mobile";

const HeadlineContent = () => {
  const [state, setState] = useState({ data: ["1", "2", "3"] });
  const [size, setSize] = useState({
    height: [300, 300, 300]
  });

  useEffect(() => {
    // simulate img loading
    const timer = setTimeout(() => {
      setState({
        data: [
          "https://66.media.tumblr.com/19a79daf7504d3c38a4b99154099cf43/c0224df506dfa4bb-6f/s500x750/01f424ae67f014f5f363d3345b290203be8881d3.gif",
          "https://66.media.tumblr.com/daa9ce50cf9f767bb087d20b403dcba9/tumblr_pmqmeqQluI1vmiunio4_400.gif",
          "https://66.media.tumblr.com/1c2da38c46ed55690af8af7ea3596b79/b623bc33fcbbb31e-ab/s540x810/203dbb6053a3f168ceff4cc5ac127b287f6985a3.gif"
        ]
      });
    }, 1);
    return () => clearTimeout(timer);
  }, []);

  // Render
  // ------------------------------
  return (
    <WingBlank>
      <Card
        style={{
          borderRadius: "10px",
          overflow: "hidden",
          paddingBottom: "0px",
          marginBottom: "0px"
        }}
      >
        <Carousel
          autoplay={true}
          infinite
          frameOverflow={"hidden"}
          beforeChange={(from, to) =>
            console.log(`slide from ${from} to ${to}`)
          }
          afterChange={index => console.log("slide to", index)}
          style={{
            objectFit: "cover"
          }}
        >
          {state.data.map((val, index) => (
            <img
              src={`${val}`}
              alt=""
              style={{
                height: size.height[index],
                verticalAlign: "top",
                objectFit: "cover",
                objectPosition: "top" //top だと上にスナップする
              }}
              onLoad={() => {
                // fire window resize event to change height
                //window.dispatchEvent(new Event("resize"));
                //setSize({ height[index]: "auto" });
              }}
            />
          ))}
        </Carousel>
      </Card>
    </WingBlank>
  );
};

export default HeadlineContent;
