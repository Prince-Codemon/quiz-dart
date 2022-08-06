import {
  VStack,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import {Helmet} from 'react-helmet'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = ({setAuth}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const submitHandle = async () => {
    setLoading(true);
    let result = email.includes("@") & email.includes(".");
    if (!email || !password) {
      
      setLoading(false);
        return toast({
          description: "Please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
    }
    else if(!result){
      setLoading(false);
      return toast({
        description: "Please enter a valid email",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
    else if(password.length < 6){
      setLoading(false);
      return toast({
        description: "Password must be atleast 6 characters",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
     else {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email,password}),
        json: true,
        withCredentials: true,
      };

     const res = await fetch(
       `${process.env.REACT_APP_API_URL}/login`,
       options
     );
     const data = await res.json()
      if (res.status === 200) {
       
        setLoading(false);
        setAuth(true)
        localStorage.setItem('user', data.token)
        return toast({
          description: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else if (res.status === 400) {
        setLoading(false);
        return toast({
          description: "Invalid Credentials",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
      else if(res.status === 500){
        setLoading(false);

        return toast({
          description: "Internal Server Error",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
  };
}

  return (
    <Box
      height="92vh"
      width="100%"
      bgImage="/images/bg.jpg"
      bgPosition="center"
      bgSize="cover"
      display="grid"
      placeItems="center"
    >
      <Helmet>
        <title>Login</title>
        <meta name="description" content="user login" />
      </Helmet>
      <VStack
        width={{ lg: "400px", sm: "90%" }}
        maxW="400px"
        className="responsive"
        bg="white"
        borderRadius="10px"
        boxShadow="base"
        padding=" 20px"
        spacing="15px"
      >
        <Text fontSize="30px" fontWeight="bold" margin="5px 0">
          Login
        </Text>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </FormControl>
        <FormControl isRequired position="relative">
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Enter password"
            type={type}
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
          <Button
            zIndex="3"
            size="sm"
            position="absolute"
            right="2"
            bottom="5%"
            colorScheme="blue"
            onClick={() =>
              type === "password" ? setType("text") : setType("password")
            }
          >
            {type === "text" ? "Hide" : "Show"}
          </Button>
        </FormControl>
        <Button
          colorScheme="whatsapp"
          padding="0 30px"
          margin="10px 0"
          onClick={submitHandle}
          isLoading={loading}
        >
          Sign in
        </Button>
        <Text
          as="button"
          onClick={() => navigate("/register")}
          margin="10px 0"
          color="blackAlpha.600"
          _hover={{
            color: "teal.500",
            textDecoration: "underline",
          }}
        >
          Want to Create Account?
        </Text>
      </VStack>
    </Box>
  );
}

export default Login
