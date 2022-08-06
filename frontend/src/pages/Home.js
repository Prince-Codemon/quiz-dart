import { Grid, GridItem, Text, Button, Image} from '@chakra-ui/react'
import React from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
  return (
    <Grid
      gridTemplateColumns="repeat(2,1fr)"
      width={'100vw'}
      padding="5px 16px"
      minHeight="90vh"

    >
      {" "}
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home page" />
      </Helmet>
      <GridItem
        className='left'
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        flexDir="column"
        height="100%"
        padding="0 40px"
        width={{ lg: "100%", md: "100%", sm: "200%" }}
        sx={{ paddingLeft: { lg: "25vh" }, xs: "50px" }}
      >
        <Text as="h1" fontSize="34px" color="black" fontWeight="bold">
          Learn <br /> with Fun <br /> Variety of Questions in Each Quiz
        </Text>
        <Text
          color="#828282"
          fontSize="14px"
          borderLeft="1px solid black"
          margin="30px 0"
          padding="0 10px"
        >
          We provide the best Engaging and Logical Questions
        </Text>
        <Button
          colorScheme="facebook"
          size="md"
          margin="30px 0"
          onClick={() => navigate("/quiz")}
        >
          Start Quiz Now
        </Button>
      </GridItem>
      <GridItem
        width={{ lg: "100%", md: "100%", sm: "0%" }}
        display="grid"
        placeItems="center"
      >
        <Image src="/images/homeicon.png" visibility={{sm:"none"}} className='img' />
      </GridItem>
    </Grid>
  );
}

export default Home