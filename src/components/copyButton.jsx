"use client";

import {toast } from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const CopyButton =({
  nameApp,
  description,
  objective,
  keyFeatures,
  userStories,
}) =>{
  const text = `
       ${nameApp && `Name: ${nameApp}`}
      ${description && `Description: ${description}`}
      
      ${
        objective &&
        objective.length > 0 &&
        `Objective: \n ${objective
          .map((item) => `- ${item.name} `)
          .join("\n ")}`

      }
      
        ${
          keyFeatures &&
          keyFeatures.length > 0 &&
          `Key Features: \n ${keyFeatures
            .map((item) => `- ${item.name}: ${item.detail}`)
            .join("\n ")}`

        }
        ${
          userStories &&
          userStories.length > 0 &&
          `User Stories: \n ${userStories
            .map((item) => `- ${item.name} `)
            .join("\n ")}`

        }
    `;



  const handleCopy = () => {
    toast.success("Text copied to clipboard");
  };

  return (
    <CopyToClipboard text={text}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex-grow-0"
        onClick={handleCopy}
      >
        Copy
      </button>
    </CopyToClipboard>
  );
}
