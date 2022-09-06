import React, { useState } from "react";
import DropZone from "./DropZone";
import UploadIcon from "../Shared/icons/UploadIcon";
import axiosInstance from "../../config/axios";
import { useHistory } from "react-router-dom";

import { Box, Textarea, Button, Text } from "@chakra-ui/react";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const handleImage = (image) => setImage(image);

  const handleCaption = (e) => setCaption(e.target.value);

  const submitPost = (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("postImage", image[0]);
    fd.append("text", caption);
    axiosInstance
      .post("/api/posts", fd)
      .then(() => {
        setLoading(false);
        history.push("/app/feed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      mt={{md:50}}
      mb={{md:50}}
      bg={"primary.900"}
      
      mx="auto"
      px={10}
      py={10}
      // w="md"
      w={{base:"full", md: "sm", lg: "md", xl: "lg"}}
      flexGrow={1}
      borderWidth={{md:"1px"}}
      borderRadius={{md:"xl"}}
    >
      <Text fontSize="4xl" fontWeight="semibold" mb={3}>
        Create Post
      </Text>
      <form onSubmit={submitPost}>
        <Box>
          <Textarea
            type="text"
            placeholder="Specify what the picture is about..."
            name="caption"
            
            value={caption}
            onChange={handleCaption}
            maxLength={100}
            focusBorderColor="tertiary"
            bg="whiteAlpha.50"
          />
        </Box>
        <Box mt={5}>
          <DropZone setImage={handleImage} image={image} />
        </Box>

        <Box mt={5}>
          <Button
            colorScheme="tertiaryScheme"
            isLoading={loading}
            loadingText="Uploading"
            leftIcon={<UploadIcon />}
            disabled={!(caption && image)}
            type="submit"
            color="white"
          >
            Upload
          </Button>
        </Box>

        {/* <div >
            <button
              type="submit"
              disabled={!(caption && image)}
              style={{ visibility: !(caption && image) ? "hidden" : "visible" }}
              
            >
              {loading ? (
                <ButtonSpinner  />
              ) : (
                <UploadIcon />
              )}
              
            </button>
          </div> */}
      </form>
    </Box>
  );
};

export default CreatePost;
