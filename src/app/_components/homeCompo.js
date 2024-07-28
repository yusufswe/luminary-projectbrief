"use client";

import { useState, useActionState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import { saveBrief } from "../actionSave";
import { ProjectBrief } from "@/components/projectBrief";
import { CopyButton } from "@/components/copyButton";
import { generateBrief } from "../actionGenerate";

export default function HomeComponent() {
  const [state, formAction, pending] = useActionState(generateBrief, null);
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    if (state?.status === 200) {
      setIsSave(false);
      console.log(state.body);

    }else if (state?.status === 400 || state?.status === 500 || state?.status === 404) {
      toast.error(`${state?.body.message}`);

    }

  }, [state]);

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
      const response = await saveBrief(data);
      if (response) {
        toast.success("Brief saved successfully");
      }
    } catch (error) {
      console.error("Error saving project brief:", error);
      toast.error("Error saving project brief");
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-8 md:pt-24 pb-6 lg:mt-52">
        <Toaster />
        <h1 className="font-bold text-center text-2xl mb-6">Brief AI</h1>
        <form className="flex flex-col items-center" action={formAction}>
          <input
            name="features"
            type="text"
            placeholder="Tuliskan fitur yang kamu inginkan dan pisah dengan koma(,)"
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

              <CopyButton 
                nameApp={state?.body.name_app}
                description={state?.body.description}
                objective={state?.body.objective}
                keyFeatures={state?.body.key_features}
                userStories={state?.body.user_stories}
              />
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
  );
}