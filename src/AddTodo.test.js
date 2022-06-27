import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});




 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputItem = screen.getByRole("textbox", {name: /Add New Item/i})
  const inputDate = screen.getByRole("textbox", {name: /Due Date/i})
  const button = screen.getByRole("button", {name: /Add/i})
  fireEvent.change(inputItem, {target: {value: "Duplicate Task"}})
  fireEvent.change(inputDate, {target:{value: "06/29/2022"}})
  fireEvent.click(button)
  //Inputing same task again
  fireEvent.change(inputItem, {target: {value: "Duplicate Task"}})
  fireEvent.change(inputDate, {target:{value: "06/29/2022"}})
  fireEvent.click(button)
  //Checking list
  const checkItem = screen.getByText(/Duplicate Task/i)
  const checkDate = screen.getByText("6/29/2022")
  expect(checkItem).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByRole("textbox", {name: /Due Date/i})
  const button = screen.getByRole("button", {name: /Add/i})
  fireEvent.change(inputDate, {target:{value: "06/29/2022"}})
  fireEvent.click(button)
  const check = screen.getByText(/You have no todo's left!/i)
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole("textbox", {name: /Add New Item/i})
  const button = screen.getByRole("button", {name: /Add/i})
  fireEvent.change(inputTask, {target:{value: /New Item/i}})
  fireEvent.click(button)
  const check = screen.getByText(/You have no todo's left!/i)
  expect(check).toBeInTheDocument();
 });

 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputItem = screen.getByRole("textbox", {name: /Add New Item/i})
  const inputDate = screen.getByRole("textbox", {name: /Due Date/i})
  const button = screen.getByRole("button", {name: /Add/i})
  fireEvent.change(inputItem, {target: {value: "New Item"}})
  fireEvent.change(inputDate, {target:{value: "06/29/2022"}})
  fireEvent.click(button)
  const checkBox = screen.getByRole("checkbox")
  fireEvent.click(checkBox)
  const check = screen.getByText(/You have no todo's left!/i)
  expect(check).toBeInTheDocument();
  

 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputItem = screen.getByRole("textbox", {name: /Add New Item/i})
  const inputDate = screen.getByRole("textbox", {name: /Due Date/i})
  const button = screen.getByRole("button", {name: /Add/i})
  fireEvent.change(inputItem, {target: {value: "On Time Item"}})
  fireEvent.change(inputDate, {target:{value: "06/29/2022"}})
  fireEvent.click(button)
  const onTimeColor= screen.getByTestId(/card/i).style.background
  //remove card from screen
  const checkBox = screen.getByRole("checkbox")
  fireEvent.click(checkBox)
  //add new card with past due date
  fireEvent.change(inputItem, {target: {value: "Past Due Item"}})
  fireEvent.change(inputDate, {target:{value: "06/15/2022"}})
  fireEvent.click(button)
  const pastDueColor = screen.getByTestId(/card/i).style.background
  //compare colors and expect them to be different
  const colorCheck = (onTimeColor != pastDueColor)
  expect(colorCheck).toBe(true);
 });
