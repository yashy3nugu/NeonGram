import React, { useState } from "react";
import DropZone from "./DropZone";
import UploadIcon from "../icons/UploadIcon";
import axiosInstance from "../../config/axios";
import { useHistory } from "react-router-dom";
import ButtonSpinner from "../icons/ButtonSpinner";
import {
  Box,
  Center,
  HStack,
  Textarea,
  VStack,
  Button,
  Text
} from "@chakra-ui/react";

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
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box >
      <Box mt={50} bg={"primary.800"} maxWidth="3xl" mx="auto" px={10} py={10} borderRadius="xl">
        <Text fontSize="4xl" fontWeight="semibold" mb={3}>
          Create Post
        </Text>
        <form onSubmit={submitPost}>

          <Box>
            <Textarea
              type="text"
              placeholder="Specify what the picture is about..."
              name="caption"
              className="rounded resize-y text-white bg-gray-800 px-2 py-3 transition duration-150 ease-in-out border border-transparent focus:outline-none focus:border-b focus:border-neon-purple h-32 max-h-96 w-full"
              value={caption}
              onChange={handleCaption}
              maxLength={100}
              focusBorderColor="tertiary"
              bg="primary.900"
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

          {/* <div className="col-span-2 text-center sm:text-right mt-6 px-4">
            <button
              type="submit"
              disabled={!(caption && image)}
              style={{ visibility: !(caption && image) ? "hidden" : "visible" }}
              className="w-12  text-neon-green rounded-full px-2 py-2"
            >
              {loading ? (
                <ButtonSpinner className="animate-spin" />
              ) : (
                <UploadIcon />
              )}
              
            </button>
          </div> */}
        </form>
      </Box>
    </Box>
  );
};

export default CreatePost;
