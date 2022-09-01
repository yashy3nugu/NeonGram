import { Box, Flex, Text, Image, IconButton } from "@chakra-ui/react";
import React from "react";
import { useDropzone } from "react-dropzone";
import CrossIcon from "../icons/CrossIcon";

const DropZone = (props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      props.setImage(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <div className="w-full">
      {props.image ? (
        props.image.map((file) => {
          return (
            <>
              <Box
                key={file.name}
                w="full"
                bg="whiteAlpha.50"
                borderRadius="1.5rem"
                borderWidth="1px"
                className="relative max-h-96 overflow-auto"
                p={10}
                position="relative"
              >
                <Image
                  src={file.preview}
                  alt="preview"
                  mx="auto"
                  className="w-full"
                />
                <IconButton
                  position="absolute"
                  zIndex="10"
                  top={4}
                  right={4}
                  className="absolute w-6 top-0 right-0 text-red-600 mr-1 mt-2"
                  onClick={() => props.setImage(null)}
                  icon={<CrossIcon />}
                />
              </Box>
            </>
          );
        })
      ) : (
        <Flex
          direction="column"
          align="center"
          justify="center"
          h="24rem"
          w="full"
          bg="whiteAlpha.50"
          borderRadius="1.5rem"
          borderWidth="1px"
          {...getRootProps()}
          className="dropzone flex flex-col items-center justify-center w-full h-96 border border-transparent hover:border-neon-purple bg-gray-800 container hover:bg-gray-600 transition duration-300 ease-in-out"
        >
          <input {...getInputProps()} />
          {/* <span className="text-gray-400 mb-3">
            <PlusIcon />
          </span> */}
          <Text className=" text-gray-400">
            Drag and drop or click to upload
          </Text>
        </Flex>
      )}
    </div>
  );
};

export default DropZone;
