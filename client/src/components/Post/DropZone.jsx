import { Box, Flex, Text, Image, IconButton } from "@chakra-ui/react";
import React from "react";
import { useDropzone } from "react-dropzone";
import CrossIcon from "../Shared/icons/CrossIcon";

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
    <div >
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
                
                p={10}
                position="relative"
              >
                <Image
                  src={file.preview}
                  alt="preview"
                  mx="auto"
                  
                />
                <IconButton
                  position="absolute"
                  zIndex="10"
                  top={4}
                  right={4}
                  
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
          
        >
          <input {...getInputProps()} />
          {/* <span >
            <PlusIcon />
          </span> */}
          <Text >
            Drag and drop or click to upload
          </Text>
        </Flex>
      )}
    </div>
  );
};

export default DropZone;
