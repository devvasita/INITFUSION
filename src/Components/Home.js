import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Grid, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Modal from "@mui/material/Modal";
import Avatar from "@mui/material/Avatar";
import Pagination from "@mui/material/Pagination";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const API_URL = "https://api.unsplash.com/search/photos";

const Home = () => {
  const searchInput = useRef(null);
  const [page, setPage] = useState(1);
  const [modeldata, setModeldata] = useState();
  const [picture, setPicture] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setModeldata("");
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  const fetchImages = async () => {
    // used try and catch for error handling
    try {
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value ? searchInput.current.value : "animal"
        }&page=${page}&per_page=30&client_id=Jrkf-0-HzEAE2QJL0tkvmgR6bFCf5RexIxroAMF9ngk`
      );

      setPicture(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchImages();
  };

  const getModelImage = (data) => {
    setModeldata(data);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar variant="dense">
            <Typography
              variant="h5"
              color="inherit"
              component="div"
              letterSpacing={2}
            >
              Image Gallery
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ mt: 8 }}>
        <form onSubmit={handleSearch} style={{ margin: "20px 0px" }}>
          <input
            ref={searchInput}
            type="search"
            style={{
              width: "100%",
              padding: "10px 10px",
              borderRadius: "10px",
              outline: "none",
              border: "1px solid",
            }}
            placeholder="Search Image...."
          />
        </form>
        <Grid container spacing={3} minHeight={"100vh"}>
          {picture.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              onClick={() => {
                handleOpen();
                getModelImage(item);
              }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                className="hvr"
              >
                <LazyLoadImage
                  src={item.urls.regular}
                  width="100%"
                  height={400}
                  alt="image"
                  placeholderSrc={item.urls.thumb}
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  effect="blur"
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        {/*Added pagination   */}
        <Box width="100%" display="flex" justifyContent="center" my={4}>
          <Pagination count={10} color="primary" onChange={handleChange} />
        </Box>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <img
              src={modeldata?.urls?.raw}
              height="60%"
              width="100%"
              style={{ objectFit: "cover" }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={3}
            >
              <Typography sx={{ mt: 2 }}>
                <b>Uploaded By :</b> {modeldata && modeldata?.user?.first_name}
              </Typography>
              <Avatar
                alt="user image"
                src={modeldata && modeldata?.user?.profile_image?.medium}
                sx={{ height: 50, width: 50 }}
              />
            </Box>

            <Typography sx={{ mt: 2 }}>
              <b>Description</b>
              <br />
              {modeldata
                ? modeldata.description
                : "No description available...."}
            </Typography>
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default Home;
