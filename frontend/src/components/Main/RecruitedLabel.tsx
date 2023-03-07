import React from "react";
interface MyComponentProps {
  isRecruited: boolean;
}
const RecruitedLabel = ({ isRecruited }: MyComponentProps) => {
  // if (isRecruited === undefined) return;
  const labelStyle: any = {
    width: "4rem",
    padding: "0.4rem 0.3rem",
    textAlign: "center",
    borderRadius: "0.2rem",
    fontSize: "0.8rem",
    backgroundColor: isRecruited ? "#939393" : "#99d9d9",
  };

  const labelText = isRecruited ? "모집완료" : "모집중";

  return <div style={labelStyle}>{labelText}</div>;
};

export default RecruitedLabel;
