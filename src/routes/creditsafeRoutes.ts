import { Router, Request, Response } from "express";

const router = Router();

router.post("/", async (req, res): Promise<any> => {
  try {
    const { companyName, zipcode } = req.body;

    // Validate input on server side instead of using alert
    if (!companyName || !zipcode) {
      return res
        .status(400)
        .json({ error: "Please provide business name and zip code" });
    }

    const data = await fetch("https://connect.creditsafe.com/v1/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Username: "wespaul1804@gmail.com",
        Password: "J48GA339S2651EIIy4G29*"
      })
    });

    const tokendata = await data.json();
    const token = tokendata.token;

    const companiesData = await fetch(
      ` https://connect.creditsafe.com/v1/companies?page=1&pageSize=2&countries=US&name=${companyName}&postCode=${zipcode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      }
    );

    const companies = await companiesData.json();
    res.json(companies);
  } catch (error) {
    // Type assertion for error handling
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred");
    }
    res.status(500).json({ error: "Failed to fetch from Creditsafe" });
  }
});

export default router;
