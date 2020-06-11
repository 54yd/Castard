import React, { useEffect, useState } from "react";
import "./App.css";
import useInterval from "./useInterval";

import { css } from "emotion";
import moment from "moment/min/moment-with-locales";

import { useWindowWidth } from "@react-hook/window-size";

import {
  Flex,
  Button,
  PlaceHolder,
  Card,
  WingBlank,
  WhiteSpace
} from "antd-mobile";

import * as R from "ramda";

const App = () => {
  // Constructor
  const rootCSS = css`
    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");
  `;

  // Data Settings
  // ------------------------------

  let now;
  let currTime;
  let currDay;
  let currMonth;
  let currDowEn;
  let currDowJa;
  let currDowOrdinalNum;

  const screenWidth = useWindowWidth();
  // States
  // ------------------------------
  const [state, setState] = useState({
    time: "10:00:00",
    dowOrdinalNum: "",
    dowEn: "",
    dowJa: "",
    day: "",
    month: ""
  });

  // Helpers
  // ------------------------------
  const weekOfMonth = _moment => {
    const firstDayOfMonth = _moment.clone().startOf("month");
    const firstDayOfWeek = firstDayOfMonth.clone().startOf("week");

    const offset = firstDayOfMonth.diff(firstDayOfWeek, "days");

    return Math.ceil((_moment.date() + offset) / 7);
  };
  // Logics
  // ------------------------------

  const tick = () => {
    now = moment();
    now.locale("en"); // nowインスタンスを日本語に設定
    currTime = now.format("HH:mm:ss");
    currDay = now.format("DD");
    currMonth = now.format("MM");
    currDowEn = now.format("dddd");
    now.locale("ja"); // nowインスタンスを日本語に設定
    currDowJa = now.format("dddd");
    currDowOrdinalNum = weekOfMonth(now);

    //    console.log(now);
    console.log(state);

    const { time, dowEn, dowJa, dowOrdinalNum, day, month, ...others } = state;

    setState({
      time: currTime,
      dowEn: currDowEn,
      dowJa: currDowJa,
      dowOrdinalNum: currDowOrdinalNum,
      day: currDay,
      month: currMonth,
      ...others
    });
  };

  // Effects
  // ------------------------------

  useInterval(tick, 1000);

  // Components
  // ------------------------------

  const Summary = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end", //[memo]:justifyは1回目の整頓の意。最右に寄せる
        alignItems: "baseline" //[memo]:alignは2回目の整頓の意。最下に寄せる
      }}
    >
      <div style={{ fontSize: "15vw", margin: "0% 0%" }}>{state.month}</div>
      <div style={{ fontSize: "40vw", margin: "0% 0%" }}>{state.day}</div>
    </div>
  );

  let sizeDenominator = 1;
  if (screenWidth < 900 && screenWidth > 600) {
    sizeDenominator = 1.8;
  } else if (screenWidth >= 900) {
    sizeDenominator = 5.5;
  }

  const Detail = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start" //[memo]:justifyは1回目の整頓の意。最右に寄せる
      }}
    >
      <div
        style={{
          display: "inline",
          fontSize: String(4 / sizeDenominator) + "vw",
          fontWeight: "bold",
          margin: "0% 5%",
          verticalAlign: "text-bottom"
        }}
      >
        {/* fixmeなぜか左に寄ってないのでヒューリスティックに対応 */}第
        {state.dowOrdinalNum}週目
      </div>
      <div
        id="dowJa"
        style={{
          fontSize: String(10 / sizeDenominator) + "vw",
          fontWeight: "bold",
          margin: "0% 5%"
        }}
      >
        {/* fixmeなぜか左に寄ってないのでヒューリスティックに対応 */}
        {state.dowJa}
      </div>
      <div
        style={{
          fontSize: String(6 / sizeDenominator) + "vw",
          margin: "0% 5%"
        }}
      >
        {state.dowEn}
      </div>
      <div
        style={{
          fontSize: String(10 / sizeDenominator) + "vw",
          margin: "0% 5%"
        }}
      >
        {state.time}
      </div>
    </div>
  );

  const styleBase = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end", //[memo]:justifyは1回目の整頓の意。columnが指定されているので、最下に寄せる
    alignItems: "flex-start", //[memo]:alignは2回目の整頓の意。columnが指定されているので、最右に寄せる
    margin: "0% 0%"
  };

  const fontBase = {
    fontSize: "10vw",
    fontFamily: ["Montserrat", "helvetica"]
  };

  const ClockCard = () => (
    <div style={{ ...styleBase, ...fontBase }}>
      <Summary />
      <Detail />
    </div>
  );

  const ClockContent = () => (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh", //[fixme]なぜか上側に少し寄ってるのでヒューリスティックに対応
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ClockCard />
    </div>
  );

  // Render
  // ------------------------------
  return <ClockContent />;
};

export default App;
