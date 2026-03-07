import {
  finishInterview,
  generateQuestions,

  getInterviewReport,

  getMyInterview,

  getSingleInterview,

  submitAnswerAPI
} from "@/API/interview";

import { Query, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";



export const useGenerateQuestions = () => {
  return useMutation({
    mutationFn: generateQuestions,

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to generate questions";

      toast.error(message);
    },

    onSuccess: (data) => {
      toast.success(
        data?.message || "Interview started successfully"
      );
    },
  });
};



export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: submitAnswerAPI,

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to submit answer";

      toast.error(message);
    },

    onSuccess: (data) => {
      if (data?.hasNext) {
        toast.success("Answer submitted");
      } else {
        toast.success("Interview completed");
      }
    
    },
  });
};



export const useFinishInterview = () => {
  

  return useMutation({
    mutationFn: finishInterview,

    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to finish interview";

      toast.error(message);
    },

    onSuccess: (data) => {
      toast.success(
        data?.message || "Interview report generated successfully"
      );

    
    
    },
  });
};


export const useGetmyInterview=()=>{
  return useQuery({
    queryKey:['GetMyInterview'],
    queryFn:getMyInterview,
    retry:false,
    refetchOnWindowFocus:false,
    staleTime:1000*60*5 // 5 Minutes cache
  })
}

export const usegetInterviewReport=(id)=>{
  return useQuery({
    queryKey:['Interview Get',id],
    queryFn:()=>getInterviewReport(id),
    retry:false,
    refetchOnWindowFocus:false,
    staleTime:1000*60*10 // Minutes
  })
}

export const useGetSingleInterview=(id)=>{
  return useQuery({
    queryKey:['Single Interview',id],
    queryFn:()=>getSingleInterview(id),
    retry:false,
    refetchOnWindowFocus:false,
    staleTime:1000*60*10 // Minutes
  })
}