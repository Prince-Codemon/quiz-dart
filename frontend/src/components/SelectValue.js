import React, { useState } from "react";
import { Box, Text, Select, Button } from "@chakra-ui/react";

const SelectValue = ({
  setDifficulty,
  setCategory,
  questionNo,
  setQuestionNo,
  onNext,
}) => {
  const [loading, setLoading] = useState(false);
  const startHandle = async () => {
    setLoading(true);
    await onNext();
    setLoading(false);
  };
  return (
    <Box
      width={{ lg: "500px", sm: "90%" }}
      maxW="400px"
      className="responsive"
      padding="15px 20px"
      bg={"white"}
      boxShadow="base"
      display={"flex"}
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      borderRadius="10px"
    >
      <Box w={"100%"}>
        <Text m={"10px 0"}>Choose the category</Text>
        <Select
          placeholder="Category"
          width="100%"
          colorScheme={"teal"}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="arts_and_literature">Arts & Literature</option>
          <option value="film_and_tv">Film Tv</option>
          <option value="food_and_drink">Food & Drink</option>
          <option value="general_knowledge">General Knowledge</option>
          <option value="geography">Geography</option>
          <option value="history">History</option>
          <option value="music">Musix</option>
          <option value="society_and_culture">Society & Culture</option>
          <option value="sport_and_leisure">Sports & Leisure</option>
          <option value="science">Science</option>
        </Select>
      </Box>
      <Box w={"100%"}>
        <Text m={"10px 0"}>Choose the difficulty level</Text>
        <Select
          placeholder="Difficulty"
          width="100%"
          colorScheme={"teal"}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
      </Box>
      <Box
        width={"100%"}
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
        margin={"20px 0"}
      >
        <Button
          variant={questionNo === 10 ? "solid" : "outline"}
          colorScheme={"teal"}
          onClick={() => setQuestionNo(10)}
        >
          10 Ques
        </Button>
        <Button
          variant={questionNo === 20 ? "solid" : "outline"}
          colorScheme={"teal"}
          onClick={() => setQuestionNo(20)}
        >
          20 Ques
        </Button>
      </Box>
      <Button
        width={"100%"}
        isLoading={loading}
        loadingText="Starting"
        m="10px 0"
        variant={"solid"}
        colorScheme="messenger"
        onClick={startHandle}
      >
        Start Now
      </Button>
    </Box>
  );
};

export default SelectValue;
