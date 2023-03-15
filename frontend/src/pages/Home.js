import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchedVideos = () => {
      axios
        .get("http://localhost:9000/api/videos/random")
        .then((res) => setVideos(res.data));
    };
    fetchedVideos();
  }, []);
  return (
    <Container>
      {videos.map((video) => (
        <Card />
      ))}
    </Container>
  );
};

export default Home;
