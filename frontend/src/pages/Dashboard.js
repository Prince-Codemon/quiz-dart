import { Box, Text, Table, TableCaption, TableContainer, Tbody,  Th, Thead, Tr, Button } from '@chakra-ui/react'
import React, {useEffect} from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Row from '../components/Row';

const Dashboard = ({name, _id}) => {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate()

const fetchQuizz = async () => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id })
  };
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/getquizzes`,
    options
  );
  const data = await res.json();
  setData(data);
};

  useEffect(() => {
   fetchQuizz()
  }, [])
  useEffect(() => {
   fetchQuizz()
  }, [name])
  
  return (
    <Box width="100vw" padding="10px 0">
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="User Dashboard" />
      </Helmet>
      <Box
        width="100%"
        height="100px"
        display="grid"
        gridTemplateColumns="repeat(2,1fr)"
        padding="10px 30px"
      >
        <Text as="h1" fontSize="20px" fontWeight="bold">
          {" "}
          Welcome <br />{" "}
          <span
            style={{
              color: "teal",
              fontWeight: "normal",
              textTransform: "capitalize",
            }}
          >
       
            {name}
          </span>
        </Text>
        <Button
          colorScheme="teal"
          maxWidth="140px"
          textAlign="center"
          onClick={() => navigate("/quiz")}
        >
          Play New Quiz
        </Button>
      </Box>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Your History of Quizess</TableCaption>
          <Thead>
            <Tr>
              <Th fontWeight="bold" fontSize="1xl">
                Category
              </Th>
              <Th fontWeight="bold" fontSize="1xl">
                Difficulty
              </Th>
              <Th fontWeight="bold" fontSize="1xl" isNumeric>
                Score
              </Th>
              <Th fontWeight="bold" fontSize="1xl" isNumeric>
                Date
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.length >0 ? (
              data.map((item, index) => (
                <Row
                  key={index}
                  category={item.category}
                  difficulty={item.difficulty}
                  score={item.score}
                  date={item.date.split("T")[0]}
                />
              ))
            ) : (
              <Row
                score={"0"}
                category={"none"}
                difficulty={"none"}
                date={"none"}
              />
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Dashboard