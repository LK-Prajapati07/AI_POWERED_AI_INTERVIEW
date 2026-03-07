import { analyzeResume } from "@/API/interview"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"

export const useAnalyzeResume = () => {
        return useMutation({
            mutationFn: analyzeResume,
            onSuccess: (data) => {
                toast.success(data?.message || "Resume analyzed successfully 🎉");
            },
            onError: (error) => {
                const message =
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to analyze resume";
                toast.error(message);

            }
        })
}