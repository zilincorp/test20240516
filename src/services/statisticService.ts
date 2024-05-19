import axios from "axios";

const username = "xp";
const password = "xp";
const auth = btoa(`${username}:${password}`);

export const service = async () => {
  // Authenticate (dummy API)
  await fetch("https://admin.x-partners.com/api/test/data/", {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then(function (data) {
      console.log("data", data);
    })
    .catch(function (error) {
      console.warn(error);
    });
};

const session_url = "https://admin.x-partners.com/api/test/data/";
const username2 = "xp";
const password2 = "xp";
const credentials = btoa(username2 + ":" + password2);
const basicAuth = "Basic " + credentials;

export const service2 = async () => {
  try {
    const response = await axios
      .get(
        session_url,
        // {
        //   headers: { Authorization: +basicAuth },
        // },
        {
          auth: {
            username: username2,
            password: password2,
          },
        },
      )
      .then(function (response) {
        console.log("Authenticated", response);
      })
      .catch(function (error) {
        console.log("Error on Authentication", error);
      });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
