import React from 'react'
import {  Box, Button, HStack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({auth, setAuth}) => {
  const navigate =useNavigate()
  return (
    <nav>
      <HStack
        width={'100%'}
        height="60px"
        bg="teal.200"
        display={'flex'}
        justifyContent="space-between"
        padding={'5px 20px'}

        boxShadow="base"
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/homeicon.png"
            alt=""
            width="60px"
            height="50px"
            className="logoimg"
            style={{ scale: "1.4" }}
          />
          <Text
            as="h2"
            fontWeight="bold"
            ml="5px"
            fontSize="2xl"
            className="logo"
          >
            QuizDart
          </Text>
        </Link>
        <Box  maxW="200px"  sx={{}} display='flex' justifyContent={'space-between'} >
          {!auth ? (
            <>
              {" "}
              <Button
                variant="outline"
                colorScheme="facebook"
                className="navbtn"
                mr={'5px'}
                size={{ sm: "md", lg: "md", md: "md" }}
                onClick={() => navigate("/register")}
              >
                Sign up
              </Button>
              <Button
                variant="solid"
                colorScheme="teal"
                className="navbtn"
                ml={{sm:'15px', md:"20px"}}
                size={{ sm: "md", lg: "md", md: "md" }}
                onClick={() => navigate("/login")}
              >
                Sign in
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="solid"
                colorScheme="red"
                className="navbtn"
                onClick={() => {
                  localStorage.removeItem("user");
                  setAuth(false);
                  return;
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </HStack>
    </nav>
  );
}

export default Navbar