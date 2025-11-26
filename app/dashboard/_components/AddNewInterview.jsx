"use client";
import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession, retryWithBackoff } from "@/utils/GeminiAIModal";
import { LoaderCircle, Sparkles } from "lucide-react";
import { mockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const JOB_ROLE_SUGGESTIONS = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Cloud Engineer",
  "Mobile App Developer",
  "UI/UX Designer",
];

const TECH_STACK_SUGGESTIONS = {
  "Full Stack Developer": "React, Node.js, Express, MongoDB, TypeScript",
  "Frontend Developer": "React, Vue.js, Angular, TypeScript, Tailwind CSS",
  "Backend Developer": "Python, Django, Flask, Java Spring, PostgreSQL",
  "Software Engineer": "Java, C++, Python, AWS, Microservices",
  "DevOps Engineer": "Docker, Kubernetes, Jenkins, AWS, Azure",
  "Data Scientist": "Python, TensorFlow, PyTorch, Pandas, NumPy",
  "Machine Learning Engineer": "Python, scikit-learn, Keras, TensorFlow",
  "Cloud Engineer": "AWS, Azure, GCP, Terraform, Kubernetes",
  "Mobile App Developer": "React Native, Flutter, Swift, Kotlin",
  "UI/UX Designer": "Figma, Sketch, Adobe XD, InVision",
};

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  // Auto-suggest tech stack based on job role
  const autoSuggestTechStack = (role) => {
    const suggestion = TECH_STACK_SUGGESTIONS[role];
    if (suggestion) {
      setJobDescription(suggestion);
      toast.info(`Auto-filled tech stack for ${role}`);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDescription}, Years of Experience: ${jobExperience}.
    Generate 5 interview questions and answers in JSON format.`;

    try {
      // Use retry logic with exponential backoff
      const result = await retryWithBackoff(
        async () => await chatSession.sendMessage(inputPrompt),
        3, // max retries
        1000 // initial delay (1 second)
      );
      const responseText = await result.response.text();

      const cleanedResponse = responseText
        .replace(/```json\n?|```/g, "")
        .trim();

      const mockResponse = JSON.parse(cleanedResponse);

      const res = await db
        .insert(mockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify(mockResponse),
          jobPosition: jobPosition,
          jobDesc: jobDescription,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: mockInterview.mockId });

      toast.success("Interview questions generated successfully!");
      router.push(`dashboard/interview/${res[0]?.mockId}`);
    } catch (error) {
      console.error("Error generating interview:", error);
      
      // Provide specific error messages based on error type
      if (error.message?.includes("503") || error.message?.includes("overloaded")) {
        toast.error(
          "The AI service is currently overloaded. Please try again in a few moments.",
          { duration: 5000 }
        );
      } else if (error.message?.includes("429") || error.message?.includes("rate limit")) {
        toast.error(
          "Rate limit exceeded. Please wait a moment before trying again.",
          { duration: 5000 }
        );
      } else if (error.message?.includes("API key")) {
        toast.error(
          "API configuration error. Please check your API key.",
          { duration: 5000 }
        );
      } else {
        toast.error(
          "Failed to generate interview questions. Please try again.",
          { duration: 5000 }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="group p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950/50 dark:hover:to-purple-950/50 hover:border-indigo-400 dark:hover:border-indigo-600 hover:scale-105 hover:shadow-xl cursor-pointer transition-all duration-300"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h1 className="font-semibold text-lg text-gray-900 dark:text-white">Create New Interview</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 text-center">Start a new AI-powered mock interview</p>
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <DialogHeader>
            <DialogTitle className="font-semibold text-2xl sm:text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Tell Us About Your Interview
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <form onSubmit={onSubmit}>
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Provide details about the job position, required skills, and your experience level to get tailored interview questions.
                </p>
                <div className="space-y-5 mt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Role/Position</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Ex. Full Stack Developer"
                        value={jobPosition}
                        required
                        onChange={(e) => setJobPosition(e.target.value)}
                        list="jobRoles"
                        className="border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                      />
                      <datalist id="jobRoles">
                        {JOB_ROLE_SUGGESTIONS.map((role) => (
                          <option key={role} value={role} />
                        ))}
                      </datalist>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => autoSuggestTechStack(jobPosition)}
                        disabled={!jobPosition}
                        className="border-indigo-300 dark:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
                        title="Auto-suggest tech stack"
                      >
                        <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Job Description/Tech Stack</label>
                    <Textarea
                      placeholder="Ex. React, Angular, NodeJs, MySql etc"
                      value={jobDescription}
                      required
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white min-h-[100px]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      min="0"
                      max="70"
                      value={jobExperience}
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                      className="border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-4 justify-end mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpenDialog(false)}
                  className="border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6"
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin mr-2" /> Generating Questions...
                    </>
                  ) : (
                    "Generate Interview"
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
