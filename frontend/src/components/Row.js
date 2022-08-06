import React from 'react'
import {
  Td,
  Tr,
} from "@chakra-ui/react";


const Row = ({category, score, difficulty, date}) => {
  return (
    <Tr>
      <Td textTransform='capitalize'>{category}</Td>
      <Td textTransform='capitalize' >{difficulty}</Td>
      <Td  textTransform='capitalize' isNumeric>{score}%</Td>
      <Td  textTransform='capitalize' isNumeric>{date}</Td>
    </Tr>
  );
}

export default Row