import {ClearRounded} from '@mui/icons-material';
import {IconButton, Input, InputAdornment} from '@mui/material';
import React, {FC, useEffect, useState} from 'react';
import {URLSearchParamsInit, useSearchParams} from 'react-router-dom';
import {useSharedState} from '~/Store';
import {seriesListElementType} from '~/Types';
import {useDebounce} from '~lib/Hooks';

const SearchField: FC = () => {
  // console.log(props.children.props.children.props)
  const [state, setState] = useSharedState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('s'));
  const debQuery = useDebounce(query, 800);
  const [res, setRes] = useState<seriesListElementType[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };
  useEffect(() => {
    setSearchParams({s: debQuery} as URLSearchParamsInit, {replace: true});
  }, [debQuery]);

  return (
    <Input
      style={{width: '100%'}}
      onChange={handleChange}
      value={query}
      placeholder="Search..."
      autoFocus
      endAdornment={
        <InputAdornment position="end">
          {query ? (
            <IconButton
              onClick={() => {
                setQuery('');
              }}
              size="large"
            >
              <ClearRounded />
            </IconButton>
          ) : undefined}
        </InputAdornment>
      }
    />
  );
};
export default SearchField;
