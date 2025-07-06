import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Demo } from "./Demo";
import { Planets } from "./Planets";

const Home = () => {

  return (
    <div>
      <Demo/>
      <Planets/>
    </div>
  );
};

export default Home;
