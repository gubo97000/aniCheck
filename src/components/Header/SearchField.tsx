import { Box, IconButton, Input, TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
// import useAutocomplete from '@mui/material/useAutocomplete';

import { GridViewOutlined, ViewAgendaOutlined } from "@mui/icons-material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import DonutLargeRoundedIcon from "@mui/icons-material/DonutLargeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import InputAdornment from "@mui/material/InputAdornment";
import { matchSorter } from "match-sorter";
import SortMenu from "~/SortMenu";
import { useSharedState } from "~/Store";
import { seriesListElementType } from "~/Types";
import { getSortFc } from "~/Utils";
import { useAsync, useDebounce } from "~lib/Hooks";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

const SearchField: FC = ({}) => {
  // console.log(props.children.props.children.props)
  const [state, setState] = useSharedState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("s"));
  const debQuery = useDebounce(query, 800);
  const [res, setRes] = useState<seriesListElementType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  useEffect(() => {
    setSearchParams({ s: debQuery } as URLSearchParamsInit);
  }, [debQuery]);
  return (
    <Input
      style={{ width: "100%" }}
      onChange={handleChange}
      value={query}
      placeholder="Search..."
    />
    // <TextField
    //   sx={{
    //     gridArea: "search",
    //     justifySelf: "left",
    //     "& .MuiOutlinedInput-notchedOutline": {
    //       border: "1px solid",
    //       borderColor: "#00000000",
    //     },
    //     // border:"3px solid black",
    //     // bgcolor:"primary.main"

    //     // bgcolor:"lightpink",
    //   }}
    //   size="small"
    //   // size="normal"
    //   // variant="filled"
    //   // margin="normal"
    //   value={query}
    //   // color="primary"
    //   onChange={handleChange}
    //   placeholder="Search Series"
    //   InputProps={{
    //     sx: {
    //       bgcolor: "primary.ghost",
    //       "& ::placeholder": {
    //         color: "primary.dark",
    //         fontWeight: "bold",
    //       },
    //       // borderRadius: "5px",
    //       // border: "0px solid",
    //     },
    //     startAdornment: (
    //       <InputAdornment
    //         position="start"
    //         sx={{
    //           color: "primary.main",
    //         }}
    //       >
    //         <SearchRoundedIcon />
    //       </InputAdornment>
    //     ),
    //     endAdornment: (
    //       <InputAdornment position="end">
    //         {query ? (
    //           <IconButton
    //             onClick={() => {
    //               setQuery("");
    //             }}
    //             size="large"
    //           >
    //             <ClearRoundedIcon />
    //           </IconButton>
    //         ) : undefined}
    //       </InputAdornment>
    //     ),
    //   }}
    // />
  );
};
export default SearchField;
