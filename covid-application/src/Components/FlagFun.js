import React, {useEffect, useState } from "react";
import { BsFlag, BsFlagFill } from "react-icons/bs";
import axios from "./api/axios";
function FlagFun(props) {
  const { patient } = props;
  const [isFlag, setIsFlag] = useState(false);

  useEffect(async () => {
    // console.log("PAT--->>",patient.id)
    setIsFlag(
      (await axios.get(`/admin_for_frontend/get_priority?id=${patient.id}`))
        .data["response"]
    );
    // console.log("hereeee--->>",isFlag)
  }, []);

  const handleclick = async () => {
    try {
      
      const response = await axios.post(
        `/admin_for_frontend/set_flag?id=${patient.id}`,
        undefined,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setIsFlag(!isFlag);
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button className="flagbtn" onClick={handleclick}>
      {" "}
      {isFlag ? <BsFlagFill /> : <BsFlag />}{" "}
    </button>
  );
}

export default FlagFun;
