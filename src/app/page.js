"use client";

import { Header } from "@/components/header";
import { useState, useActionState, useEffect } from "react";
import { generateBrief } from "./action";

export default function Home() {
  const [state, formAction, pending] = useActionState(generateBrief, null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (state?.status === 400) {
      setError(true);
    } else {
      setError(false);
    }
  }, [state]);
  return (
    <main className="w-full">
      <Header />
      <div className="max-w-3xl bg-red-40 mx-auto pt-24 pb-6 lg:mt-52">
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

        {error === true && (
          <div
            class="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-start">
                      <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <svg
                          class="h-6 w-6 text-red-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                          />
                        </svg>
                      </div>
                      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3
                          class="text-base font-semibold leading-6 text-gray-900"
                          id="modal-title"
                        >
                          Deactivate account
                        </h3>
                        <div class="mt-2">
                          <p class="text-sm text-gray-500">
                            Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setError(false)}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setError(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {state?.status === 200 && (
          <div className="mx-6">
            <div className="space-y-4">
              <div>
                <span className="font-bold mr-2">Name:</span>{" "}
                {state.body.name_app}
              </div>
              <div>
                <p className="font-bold mr-2">Description:</p>{" "}
                <p className="indent-8">{state.body.description}</p>
              </div>
              <div>
                <span className="font-bold block mb-2">Objective:</span>
                <ul className="list-disc pl-4">
                  {state.body.objective.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold block mb-2">Key Features:</span>
                <ul className="list-disc pl-4">
                  {state.body.key_features.map((item, index) => (
                    <li key={index}>
                      {item.name}: {item.detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-bold block mb-2">User Stories:</span>
                <ul className="list-disc pl-4">
                  {state.body.user_stories.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
