import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container, Grid, CircularProgress, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";
import ModalContent from "./ModalContent"; // Import the ModalContent component

// Basic unsplash api
const API_URL = "https://api.unsplash.com/search/photos";

const Home = () => {
  const searchInput = useRef(null);
  const [page, setPage] = useState(1);
  const [modeldata, setModeldata] = useState();
  const [loading, setLoading] = useState(false);
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

  const fetchImages = useCallback(async () => {
    // used try and catch block for error handling
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current.value ? searchInput.current.value : "animal"
        }&page=${page}&per_page=30&client_id=Jrkf-0-HzEAE2QJL0tkvmgR6bFCf5RexIxroAMF9ngk`
      );

      setPicture(data.results);
    } catch (error) {
      alert("Please search relevant images...");
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [page, fetchImages]);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchImages();
  };

  const getModelImage = (data) => {
    setModeldata(data);
    handleOpen();
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
          <TextField
            inputRef={searchInput}
            fullWidth
            variant="outlined"
            margin="normal"
            placeholder="Search Image...."
          />
        </form>

        {loading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={5} minHeight={"100vh"} alignItems="stretch">
            {picture.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={item.id}
                onClick={() => getModelImage(item)}
              >
                <Card
                  sx={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                    padding: "10px 10px 0px 10px",
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
        )}

        {/* Added pagination */}
        <Box width="100%" display="flex" justifyContent="center" my={4}>
          <Pagination count={10} color="primary" onChange={handleChange} />
        </Box>

        {/* Modal for viewing the image and description */}
        <Modal open={open} onClose={handleClose}>
          <ModalContent modeldata={modeldata} onClose={handleClose} />
        </Modal>
      </Container>
    </>
  );
};

export default Home;
