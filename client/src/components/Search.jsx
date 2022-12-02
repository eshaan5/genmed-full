import { Box, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const Search = ({ name, setName, submitName}) => {

  return (
    <Box sx={{ marginTop: "5vh" }}>
      <TextField id="search" label={`Search your medicine here...`} variant="outlined" sx={{ width: "80vw" }} value={name} onChange={(e) => setName(e.target.value)} />
      <SearchIcon fontSize="large" sx={{ marginTop: '1vh', cursor: 'pointer' }} onClick={submitName} />
    </Box>
  );

};

export default Search;