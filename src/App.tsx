import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

import './App.css';

import { getDogList, getDogBreed } from './apis/dogBreeds';
import { validateEmail } from './apis/emailValidator';

import FlexContainer from './components/FlexContainer';
import InputButton from './components/InputButton';
import InputText from './components/InputText';

let DOG_LIST: any = [];
function App() {
  useEffect(() => {
    getDogList()
      .then(dogList => DOG_LIST = dogList)
      .catch(e => console.log(e))
  }, []);

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsValidEmail] = useState(true);
  const [name, setName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [noMatches, setNoMatches] = useState(false);
  const [dogUrl, setDogUrl] = useState("");

  const handleEmailInput =
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

  const handleNameInput =
    (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const checkEmail = async () => {
    return true // we can toggle this so that we don't use up the API limit (100 per month)
    if (!email.length) return setIsValidEmail(false)

    setIsValidEmail(true);
    const { data } = await validateEmail(email);
    if (data.is_valid_format.value) return true;

    return setIsValidEmail(false);
  };

  const checkDogBreed = async () => {
    setNoMatches(false);
    setDogUrl("");

    const results: any = new Fuse(DOG_LIST, {
      keys: ['breed', 'subbreed'],
      includeMatches: true,
    }).search(`^${name}`);

    if (!results[0]?.matches?.length)
      return setNoMatches(true);

    const { matches, item } = results[0];
    let dogQuery = "";
    if (matches[0].key === "breed")
      dogQuery = `${item.breed}`;
    else if (matches[0].key === "subBreed")
      dogQuery = `${item.breed}/${matches[0].value}`;

    setIsSearching(true);
    const dogBreed = await getDogBreed(dogQuery);
    setDogUrl(dogBreed.data.message);
    setName("");
    setIsSearching(false);
  };

  const handleSubmit = async () =>
    await checkEmail() && await checkDogBreed();

  return (
    <div className="App">
      <FlexContainer>
        <InputText
          value={email}
          onChange={handleEmailInput}
          placeholder="Enter Email"
          errorMsg="Invalid Email"
          showError={!isEmailValid}
        />
        <InputText
          value={name}
          onChange={handleNameInput}
          placeholder="Enter Name"
        />
        <InputButton onClick={handleSubmit}>
          Submit
        </InputButton>

        <div>
          {isSearching && <p>Searching ...</p>}
          {dogUrl && <img src={dogUrl} title={dogUrl} width="250px" height="250px"></img>}
          {noMatches && <div>No Matches Found</div>}
        </div>
      </FlexContainer>
    </div>
  );
}

export default App;
