import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import Videos from "./Videos";
import ChannelCard from "./ChannelCard";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import zIndex from "@mui/material/styles/zIndex";

const ChannelDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [channelDetail, setChannelDeatil] = React.useState(null);
  const [videos, setVideos] = React.useState([]);
  useEffect(() => {
    fetchFromAPI(`channels?part='snippet&id=${id}`).then((data) =>
      setChannelDeatil(data?.items[0])
    );
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => setVideos(data?.items)
    );
  }, [id]);
  console.log(channelDetail);
  console.log(videos);
  return (
    <>
      <Box minHeight="96vh">
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(255,0,162,1) 0%, rgba(9,9,121,1) 52%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
            height: "300px",
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop={"-90px"} />
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos}></Videos>
      </Box>
    </>
  );
};

export default ChannelDetail;
