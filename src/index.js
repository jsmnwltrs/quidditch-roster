import $ from 'jquery';
import firebase from 'firebase/app';
import 'bootstrap';

import apiKeys from '../db/apiKeys.json';

import loadNavbar from './components/Navbar/navbar';
import dataGetter from './helpers/dataGetter';
import createTeamButtonGroup from './components/TeamButtonGroup/teamButtonGroup';
import teamButton from './components/TeamButton/teamButton';
import createPlayerList from './components/PlayerList/playerList';

import './index.scss';

const getAndPrintTeamButtonGroup = () => {
  dataGetter.getAllTeamsFromDb()
    .then((data) => {
      $('#button-container').html(createTeamButtonGroup(data.data));
      $('.team-button').on('click', teamButton.buttonEventFunction);
    })
    .catch((error) => {
      console.error('Error in getting teams', error);
    });
};

const getAndPrintAllPlayers = () => {
  dataGetter.getAllPlayersFromDb()
    .then((players) => {
      dataGetter.getFullPlayerInfo(players.data)
        .then((allPlayersArray) => {
          $('#main-container').html(createPlayerList(allPlayersArray));
        });
    })
    .catch((error) => {
      console.error('Error in getting players', error);
    });
};

const initializeApp = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  loadNavbar();
  getAndPrintTeamButtonGroup();
  getAndPrintAllPlayers();
};

initializeApp();
