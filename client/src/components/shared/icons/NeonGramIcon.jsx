
import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../store/context/AuthContext";

const NeonGramIcon = () => {

  const { user } = useContext(AuthContext);
  return (
    <Text as={Link} to={user ? "/app/feed" : "/"} textShadow="2px 2px #7a27ff" fontSize="3xl">
      NeonGram
    </Text>
  );
};

export default NeonGramIcon;
