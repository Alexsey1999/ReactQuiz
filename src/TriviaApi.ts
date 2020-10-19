import shuffle from './shuffle'

const fetchTriviaQuestions = async (url: string) => {
  const request = await fetch(url)
  const data = await request.json()
  return shuffle(data.results)
}

export default fetchTriviaQuestions
