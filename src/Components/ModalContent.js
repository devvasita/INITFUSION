import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxWidth: "800px",
  height: "80%",
  maxHeight: "600px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  overflow: "auto",
};

const ModalContent = ({ modeldata, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [modeldata]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Box sx={style}>
      {modeldata && (
        <>
          <LazyLoadImage
            src={modeldata?.urls?.regular}
            width="100%"
            height="70%"
            style={{ objectFit: "contain" }}
            alt="gallery"
            onLoad={handleImageLoad}
          />
          {!imageLoaded && (
            <Box
              sx={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "60%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f0f0f0",
              }}
            >
              Loading...
            </Box>
          )}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={3}
          >
            <Typography sx={{ mt: 2 }}>
              <b>Uploaded By :</b> {modeldata?.user?.first_name}
            </Typography>
            <Avatar
              alt="user image"
              src={modeldata?.user?.profile_image?.medium}
              sx={{ height: 50, width: 50 }}
            />
          </Box>
          <Typography sx={{ mt: 2 }}>
            <b>Description</b>
            <br />
            {modeldata.description
              ? modeldata.description
              : "No description available...."}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ModalContent;
