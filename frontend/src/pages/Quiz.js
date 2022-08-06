import { Box, Button, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import Question from "../components/Question";
import SelectValue from "../components/SelectValue";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Quiz = ({ _id }) => {
  const navigate = useNavigate();
  const [start, setStart] = useState(false);
  const [score, setScore] = useState(0);
  const [data, setData] = useState([]);
  const [complete, setComplete] = useState(false);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [questionNo, setQuestionNo] = useState(10);
  const toast = useToast();

  const sendQuiz = async () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id,
        category,
        difficulty,
        score: (score / questionNo) * 100,
      }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/addquiz`,
      options
    );
    if (res.status === 201) {
      return toast({
        description: "Quiz Submitted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      return toast({
        description: "Internal Error or Score 0",
        title: "Quiz Not Submit",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const onNext = async () => {
    if (!category || !difficulty) {
      return toast({
        description: "Please select category and difficulty",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      try {
        const res = await fetch(
          `https://the-trivia-api.com/api/questions?categories=${category}&limit=${questionNo}&difficulty=${difficulty}`
        );
        const data = await res.json();
        setStart(true);
        setData(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Box
      width="100vw"
      height="92vh"
      bg="teal.100"
      display="grid"
      placeItems={"center"}
    >
      <Helmet>
        <title>Quiz</title>
        <meta name="description" content="Quiz section" />
      </Helmet>
      {start && !complete ? (
        <Question
          sendQuiz={sendQuiz}
          score={score}
          setScore={setScore}
          data={data}
          setComplete={setComplete}
          _id={_id}
        />
      ) : (
        " "
      )}
      {!start && !complete ? (
        <SelectValue
          setCategory={setCategory}
          setDifficulty={setDifficulty}
          questionNo={questionNo}
          setQuestionNo={setQuestionNo}
          onNext={onNext}
        />
      ) : (
        ""
      )}
      {start && complete ? (
        <>
          <Box
            padding="10px 20px"
            minHeight={"30vh"}
            height={"200px"}
         
            bg={"white"}
            boxShadow="base"
            display={"flex"}
            alignItems="center"
            justifyContent="center"
            width={{ lg: "500px", sm: "90%" }}
            maxW="400px"
            className="responsive"
            borderRadius="20px"
            bgImage="/images/oncomplete.png"
            bgPosition="center"
            bgSize="cover"
            position={"relative"}
          >
            <Text fontWeight={"bold"} color="black">
              Your Score is {score}
            </Text>
          </Box>
          <Button
            variant={"solid"}
            position="absolute"
            bottom={"20%"}
            colorScheme="teal"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </>
      ) : (
        " "
      )}
    </Box>
  );
};
export default Quiz;
