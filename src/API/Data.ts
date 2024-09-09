import axios from "axios";

export const dataFromAPI = async () => {
  try {
    const res = await axios.get(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
