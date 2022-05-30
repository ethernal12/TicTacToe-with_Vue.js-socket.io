//import Spinner from "@";
import AppLoadingScreen from "../../../tic-tac-toe/src/App.vue";
import { shallowMount } from "@vue/test-utils";
const io = require("socket.io-client");
const serverURL = "ws://localhost:3000";
const assert = require("assert");
import { mount } from '@vue/test-utils'

describe("Testing server connection", () => {

  it("Socket connected", (done) => {

    const socket = io(serverURL);

    socket.on("connect", () => {

      assert(socket.connected);

      done();

    });

  })


})

describe("AppLoadingScreen", () => {
  let component;

  beforeEach(() => {
    component = shallowMount(AppLoadingScreen);
  });

  it("should render Spinner on mount", () => {
    assert(component.find("#start"));

  });
});




describe("Testing game functionality", () => {
  let component;

  beforeEach(() => {
    component = shallowMount(AppLoadingScreen);
  });

  it("Should receive player 1 ready if pressing start button", (done) => {
   
    component.find('#start').trigger('click')
    const socket = io(serverURL);
    
    
    socket.on("player 1 ready", (body) => {
      
     
      assert(body);
      
      socket.disconnect();
      done();
    })
    


  })


})