/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useActionState, useEffect,useContext } from "react";
import { generateBrief } from "./actionGenerate";
import { Toaster, toast } from "react-hot-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { saveBrief } from "./actionSave";
import { ProjectBrief } from "@/components/projectBrief";
import AuthContext from "./authContext";

export default function Home() {
  const [state, formAction, pending] = useActionState(generateBrief, null);
  const [brief, setBrief] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const {login} =useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      const user = await authCheck();
      if (user) {
        login();
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (state?.status != null && state?.status !== 200) {
      toast.error(state?.body?.message);
    } else if (state?.status === 200) {
      setIsSave(false);
      setBrief(`
      Name: ${state?.body.name_app}
      
      Description:
      ${state?.body.description}
      
      Objective: \n ${state.body.objective
        .map((item) => `- ${item.name} `)
        .join("\n ")}
      
      Key Features: \n ${state?.body.key_features
        .map((item) => `- ${item.name}: ${item.detail}`)
        .join("\n ")}
      {}
      User Stories: \n ${state?.body.user_stories
        .map((item) => `- ${item.name} `)
        .join("\n ")}
      `);
    }
  }, [state]);

  const handleCopy = () => {
    if (isCopied) {
      return;
    }
    setIsCopied(true);
    toast.success("Text copied to clipboard");
    setTimeout(() => setIsCopied(false), 1500);
  };

  const handleSave = async () => {
    try {
      if (isSave) {
        toast.error("project brief has been saved");
        return;
      }
      setIsSave(true);
      const data = {
        name_app: state?.body.name_app,
        description: state?.body.description,
        objectives: state?.body.objective,
        key_features: state?.body.key_features,
        user_stories: state?.body.user_stories,
      };
      const response = await saveBrief (data);
      if (response) {
        toast.success("Brief saved successfully");
      }
    } catch (error) {
      console.error("Error saving project brief:", error);
      toast.error("Error saving project brief");
    }
  };

  return (
    <main className="w-full px-4 md:px-6">

      <Toaster />

      <div className="max-w-3xl bg-red-40 mx-auto pt-8 md:pt-24 pb-6 lg:mt-52">
        <h1 className="font-bold text-center text-2xl mb-6">Brief AI</h1>
        <form className="flex flex-col items-center" action={formAction}>
          <input
            name="features"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-3xl rounded-full"
          />
          <button
            type="submit"
            className="my-5 mx-auto p-6 transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center"
          >
            <span>Generated Brief</span>
          </button>
        </form>

        {state?.status === 200 && (
          <div className="mx-6">
            <ProjectBrief
              nameApp={state?.body.name_app ? state.body.name_app : ""}
              description={state?.body.description ? state.body.description : ""}
              objective={state?.body.objective ? state.body.objective : []}
              keyFeatures={state?.body.key_features ? state.body.key_features : []}
              userStories={state?.body.user_stories ? state.body.user_stories : []}
            />
            <div className="flex flex-row justify-end gap-4 w-full py-4">
              <CopyToClipboard text={brief}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded flex-grow-0"
                  onClick={handleCopy}
                >
                  Copy
                </button>
              </CopyToClipboard>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded flex-grow-0"
                onClick={handleSave}
              >
                Save
              </button>
              
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
