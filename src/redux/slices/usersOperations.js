import { createAsyncThunk } from "@reduxjs/toolkit";
import usersJson from "@/mocks/users.json";

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

export const getUsers = createAsyncThunk("users/getAll", async () => {
  await delay(120);
  return usersJson;
});
