"use server";

import { findUser } from "@/libs/findUser";



export async function generateBrief(_, formData) {
  try {
    const systemPrompt = `
      you will create project brief from input user
    
      user will send some feature app and separated by comma(,) if they write something else like null,food, animals, and transportation please return error
    
      The output should be in JSON and just JSON format with the following structure:
      - name_app
      - description
      - objective,list <name:"">
      - key_features,list with property <name:"",detail:"">
      - user_stories,list <name:"">
      - error,list but if nothing error this property is list with 0 object but is something error this property have 1 message property the error
      
      The output should be in JSON and just JSON
      `;
    const user = await findUser();

    if (!user) {
      return {
        status: 404,
        body: {
          message: "You are not logged in, please login first",
        },
      };
    }
  
    const features = formData.get("features");
  
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Model LLM yang digunakan
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `${features}`,
          },
        ],
      }),
    });
  
    const data = await response.json();
    console.log(data);
    const result = JSON.parse(data.choices[0].message.content);
    const error = result.error || [];
  
    console.log(data);
    console.log(result);
  
    if (error.length >0 ) {
      return {
        status: 400,
        body: {
          message: error[0].message,
        },
      };
    }
  
    return {
      status: 200,
      body: result,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: {
        message: "Internal Server Error",
      },
    };
  }
}
