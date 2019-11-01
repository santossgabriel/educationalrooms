export const questionToResult = (questions) => {
  if (Array.isArray(questions))
    return questions.map(q => questionToResult(q))
  else
    return {
      id: questions.id,
      description: questions.description,
      difficulty: questions.difficulty,
      area: questions.area,
      answers: questions.Answers,
      shared: questions.shared,
      userId: questions.userId,
      sharedQuestionId: questions.sharedQuestionId
    }
}

export const questionToExportResult = (questions) => {
  if (Array.isArray(questions))
    return questions.map(q => questionToExportResult(q))
  else
    return {
      description: questions.description,
      difficulty: questions.difficulty,
      area: questions.area,
      answers: (questions.Answers || []).map(p => ({
        description: p.description,
        correct: p.correct,
        classification: p.classification
      }))
    }
}