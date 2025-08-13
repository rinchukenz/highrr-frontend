

// src/services/OrgAdminService.js
import axiosInstance from "../utils/axiosInstance";

// COURSES
export const getAllCourses = (orgId) => {
  return axiosInstance.get(`/courses/org/${orgId}`);
};

export const createCourse = (formData) => {
  return axiosInstance.post(`/courses`, formData);
};

export const getCourseById = (cId) => {
  return axiosInstance.get(`/courses/${cId}`);
};

export const EditCourse = (cId, updatedData) => {
  return axiosInstance.put(`/courses/${cId}`, updatedData);
};

export const deleteCourse = (cId) => {
  return axiosInstance.delete(`/courses/${cId}`);
};

export const publishCourse = (cId) => {
  return axiosInstance.put(`/courses/${cId}/publish`);
};

export const unpublishCourse = (cId) => {
  return axiosInstance.put(`/courses/${cId}/unpublish`);
};

// FAQS
export const getFaq = (cId) => {
  return axiosInstance.get(`/courses/${cId}/faqs`);
};

export const createFaq = (cId, newFaq) => {
  return axiosInstance.post(`/courses/${cId}/faqs`, {
    courseId: cId,
    question: newFaq.question,
    answer: newFaq.answer,
  });
};

export const deleteFaq = (cId, fId) => {
  return axiosInstance.delete(`/courses/${cId}/faqs/${fId}`);
};

// INSTRUCTORS
export const addInstructor = (cId, newInstructor) => {
  return axiosInstance.post(`/courses/${cId}/instructors`, {
    courseId: cId,
    name: newInstructor.name,
    bio: newInstructor.bio,
    profileImageUrl: newInstructor.profileImageUrl,
  });
};

export const getInstructors = (cId) => {
  return axiosInstance.get(`/courses/${cId}/instructors`);
};

export const updateInstructor = (cId, instructorId, updatedData) => {
  return axiosInstance.put(`/courses/${cId}/instructors/${instructorId}`, updatedData);
};

export const deleteInstructor = (cId, instructorId) => {
  return axiosInstance.delete(`/courses/${cId}/instructors/${instructorId}`);
};

// OUTCOMES
export const getOutcomes = (cId) => {
  return axiosInstance.get(`/courses/outcomes/${cId}`);
};

export const addOutcome = (cId, newOutcome) => {
  return axiosInstance.post(`/courses/outcomes`, {
    courseId: cId,
    description: newOutcome.description,
    sequenceNumber: newOutcome.sequenceNumber,
  });
};

export const updateOutcome = (cId, outcomeId, newOutcome) => {
  return axiosInstance.put(`/courses/outcomes/${outcomeId}`, {
    courseId: cId,
    description: newOutcome.description,
    sequenceNumber: newOutcome.sequenceNumber,
  });
};

export const deleteOutcome = (outcomeId) => {
  return axiosInstance.delete(`/courses/outcomes/${outcomeId}`);
};

// REVIEWS
export const getReviews = (cId) => {
  return axiosInstance.get(`/courses/${cId}/reviews`);
};

export const addReview = (cId, newReview) => {
  return axiosInstance.post(`/courses/${cId}/reviews`, {
    courseId: cId,
    studentId: newReview.studentId,
    rating: newReview.rating,
    comment: newReview.comment,
  });
};

export const updateReview = (cId, reviewId, newReview) => {
  return axiosInstance.put(`/courses/${cId}/reviews/${reviewId}`, {
    courseId: cId,
    studentId: newReview.studentId,
    rating: newReview.rating,
    comment: newReview.comment,
  });
};

export const deleteReview = (cId, reviewId) => {
  return axiosInstance.delete(`/courses/${cId}/reviews/${reviewId}`);
};

// SECTIONS
export const addSection = (newSection) => {
  return axiosInstance.post(`/sections`, newSection);
};

export const getSections = (cId) => {
  return axiosInstance.get(`/sections/course/${cId}`);
};

export const publishSection = (sId) => {
  return axiosInstance.put(`/sections/${sId}/publish`);
};

export const unpublishSection = (sId) => {
  return axiosInstance.put(`/sections/${sId}/unpublish`);
};

export const deleteSection = (sId) => {
  return axiosInstance.delete(`/sections/${sId}`);
};

// CONTENTS
export const addContent = (newContent) => {
  return axiosInstance.post(`/contents`, newContent);
};

export const getContents = (cId) => {
  return axiosInstance.get(`/contents/course/${cId}`);
};

export const getContentsBySectionId = (sId) => {
  return axiosInstance.get(`/contents/section/${sId}`);
};

export const deleteContent = (contentId) => {
  return axiosInstance.delete(`/contents/${contentId}`);
};

export const publishContent = (contentId) => {
  return axiosInstance.put(`/contents/${contentId}/publish`);
};

export const unpublishContent = (contentId) => {
  return axiosInstance.put(`/contents/${contentId}/unpublish`);
};



//EXAMS

export const addQuestion = (payload) => {
  return axiosInstance.post(`/exams/questions`, payload);
}

export const getAllQuestions = () => {
  return axiosInstance.get(`/exams/questions`);
}

export const deleteQuestion = (id) => {
  return axiosInstance.delete(`/exams/questions/${id}`);
}

export const createExam = (payload) => {
  return axiosInstance.post(`/exams`, payload);
}

export const getExams = () => {
  return axiosInstance.get(`/exams`);
}

export const getQuestionById = (id) => {
  return axiosInstance.get(`/exams/questions/${id}`);
}

export const getExamById = (id) => {
  return axiosInstance.get(`/exams/${id}`);
}

export const deleteExam = (id) => {
  return axiosInstance.delete(`/exams/${id}`);
}


//STUDENTS
export const getAllStudents = () => {
  return axiosInstance.get(`/orgs/search?query=`);
};

export const registerStudent = (studentData) => {
  return axiosInstance.post(`/orgs/register`, studentData);
}


export const registerStudentBulk = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post(`/orgs/register/bulk`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const deleteStudent = (sid) => {
    return axiosInstance.delete(`/orgs/students/${sid}`);

}