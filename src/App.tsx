import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import './App.css';
import { validateEmail } from './apis/emailValidator';
import { getDogBreed } from './apis/dogBreeds';
import FlexContainer from './components/FlexContainer';
import InputText from './components/InputText';
import InputButton from './components/InputButton';

let DOG_LIST: any = [];
function App() {
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(resp => resp.json())
      .then(data => DOG_LIST = Object
        .entries(data.message)
        .map(([key, value]) => ({
          breed: key,
          subBreed: value,
        }))
      );
  }, []);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsValidEmail] = useState(true);
  const [searchResults, setSearchResults]: any = useState({});
  const [noMatches, setNoMatches] = useState(false);
  const [dogUrl, setDogUrl] = useState("");

  const checkEmail = async () => {
    setIsValidEmail(true);
    try {
      const { data } = await validateEmail(email);
      if (data.is_valid_format.value) return true;
      setIsValidEmail(false);
      return false;
    } catch (e) {
      setIsValidEmail(false);
      return false;
    }
  };

  const checkDogBreed = async () => {
    setNoMatches(false);
    setDogUrl("");
    if (!searchResults?.matches?.length) return setNoMatches(true);

    const { matches, item } = searchResults;
    let dogQuery = "";
    if (matches[0].key === "breed") dogQuery = `${item.breed}`;
    else if (matches[0].key === "subBreed") dogQuery = `${item.breed}/${matches[0].value}`;

    const dogBreed = await getDogBreed(dogQuery);
    setDogUrl(dogBreed.data.message);
    setSearchResults({});
  };


  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const results = new Fuse(DOG_LIST, {
      keys: ['breed', 'subbreed'],
      includeScore: true,
      includeMatches: true,
    }).search(`^${e.target.value}`);

    if (results.length !== 0) setSearchResults(results[0]);
  };

  const handleSubmit = async () => await checkEmail() && await checkDogBreed();

  return (
    <div className="App">
      <FlexContainer>
        <InputText
          onChange={handleEmailInput}
          placeholder="Enter Email"
          errorMsg="Invalid Email"
          showError={!isEmailValid}
        />
        <InputText
          onChange={handleSearchInput}
          placeholder="Type your name"
        />
        <InputButton onClick={handleSubmit}>
          Submit
        </InputButton>
        <div>
          {dogUrl && <img src={dogUrl} title={dogUrl} width="250px" height="250px"></img>}
          {noMatches && <div>No Matches Found</div>}
        </div>
      </FlexContainer>
    </div>
  );
}

export default App;
