"use client";
import Moment from "react-moment";

export default ({ date, format }) => {
  return <Moment date={date} format={format} />;
};
