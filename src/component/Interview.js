import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Interview.css';

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { jobDescription } = location.state || { jobDescription: 'Unknown' };
  const [microphonePermission, setMicrophonePermission] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [recording, setRecording] = useState(false);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = useState(false);
  const [speechRecognitionSupported, setSpeechRecognitionSupported] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [disableNext, setDisableNext] = useState(false); 

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesisSupported(true);
    }
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setSpeechRecognitionSupported(true);
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.onresult = handleSpeechRecognitionResult;
      recognition.onerror = handleSpeechRecognitionError;
      setSpeechRecognition(recognition);
    }
  }, []);

  const handleSpeechRecognitionResult = (event) => {
    const transcript = event.results[0][0].transcript;
    const newAnswers = [...answers, transcript];
    setAnswers(newAnswers);
    // Proceed to the next question or end the interview as needed
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      askQuestion(interviewQuestions[currentQuestionIndex + 1]);
    } else {
      // End the interview
      handleEndInterview();
    }
  };
  

  const handleSpeechRecognitionError = (event) => {
    console.error('Speech recognition error:', event.error);
  };

  const startRecording = () => {
    if (speechRecognitionSupported && !recording) {
      setRecording(true);
      setDisableNext(true); // Disable Next button when recording starts
      speechRecognition.start();
    }
  };

  const stopRecording = () => {
    if (speechRecognitionSupported && recording) {
      setRecording(false);
      setDisableNext(false); // Enable Next button when recording stops
      speechRecognition.stop();

      const currentQuestion = interviewQuestions[currentQuestionIndex];
    
      // Mapping of questions to sample responses
      const sampleResponses = {
        'Tell me about your experience with software development.':

"As a final year CSE student, I've worked on various academic projects and internships that provided me with practical experience in software development. I've applied theoretical knowledge to build applications and contribute to team projects, which has been very valuable.",
'What programming languages are you proficient in?':
"I've gained proficiency in several programming languages, including Python, Java, C++, and JavaScript, through coursework and personal projects. This diverse skill set allows me to approach problems from different angles and select the best tool for the job.",
'Can you describe a recent project you worked on?':
"Recently, I worked on a web application for my final year project. It involved developing a full-stack solution using React for the front-end and Node.js for the back-end. This project helped me understand end-to-end development and integrate multiple technologies effectively.",
'What are the various categories of software?':
"Software can be categorized into system software, application software, and middleware. System software includes operating systems and utilities, application software consists of programs for end-users like word processors and games, and middleware facilitates communication between different software applications.",
'What is a framework?':
"A framework is a reusable set of libraries, components, and tools that provide a structure and guidelines for building software applications. It helps developers streamline the development process, maintain consistency, and achieve scalability.",
'Tell me about a time when you had to explain a complex data concept to someone without a technical background. How did you ensure they understood?':
"During a group project, I had to explain data normalization to a team member from a non-technical background. I used simple analogies, visual aids, and broke down the concept into smaller, relatable parts to ensure they understood.",
'Describe a project where you had to work with a difficult team member. How did you handle the situation?':
"In a recent project, I collaborated with a team member who had strong opinions, leading to occasional conflicts. I addressed the situation by fostering open communication, actively listening to their perspective, and facilitating compromise and consensus-building. Through these efforts, we overcame challenges and achieved project success.",
'Have you ever made a significant mistake in your analysis? How did you handle it and what did you learn from it?':
"During a data analysis project, I initially overlooked some outliers which skewed the results. After identifying the mistake, I corrected the analysis and learned the importance of thorough data cleaning and validation.",
'How do you stay updated with the latest trends and advancements in data science?':
"I stay updated by following tech blogs, attending webinars, participating in online courses, and being active in professional networks like LinkedIn and GitHub.",
'How do you handle a dataset missing several values?':
"I handle missing data by analyzing the extent and nature of the missing values. Common techniques include removing incomplete rows, imputing values using mean/median/mode, or using algorithms that can handle missing data.",
'What are the built-in types available in Python?':
"Python's built-in types include integers, floats, strings, lists, tuples, dictionaries, sets, and booleans.",
'What is the difference between .py and .pyc files?':
".py files contain Python source code, whereas .pyc files contain the compiled bytecode, which Python generates to improve performance.",
'What are the functions in Python?':
"Functions in Python are blocks of reusable code that perform a specific task. They help in modularizing the code and improving readability and maintainability.",
'What are Python Decorators?':
"Python decorators are special functions that modify the behavior of another function or method. They are commonly used for logging, authentication, and other cross-cutting concerns.",
'What are the key features of Python?':
"Python's key features include its simplicity, readability, extensive libraries, cross-platform compatibility, and support for multiple programming paradigms like procedural, object-oriented, and functional programming.",
'What are the main technical and additional skills required to become a front-end developer?':
"Technical skills include proficiency in HTML, CSS, JavaScript, and frameworks like React or Angular. Additional skills include understanding UX/UI principles, responsive design, version control (Git), and good communication skills.",
'How can you make your web design user-friendly, and what steps would you use to make it?':
"To make web design user-friendly, I ensure intuitive navigation, responsive design, clear visual hierarchy, accessibility, and fast loading times. Steps include user research, wireframing, prototyping, usability testing, and iterative design.",
'What is CoffeeScript? Describe in brief.':
"CoffeeScript is a programming language that compiles into JavaScript. It aims to make JavaScript code more readable and maintainable by providing a cleaner syntax.",
'What do you understand by a callback function?':
"A callback function is a function passed as an argument to another function, which is then invoked inside the outer function to complete some kind of routine or action.",
'What is the key difference between Class and Prototype-based inheritance?':
"Class-based inheritance involves creating a class blueprint from which objects are instantiated, while prototype-based inheritance involves directly creating objects that serve as prototypes for other objects.",
'What is the value of UX design?':
"UX design enhances user satisfaction by improving the usability, accessibility, and pleasure of interacting with a product, which can lead to increased user engagement and retention.",
'Do you consider yourself a team player?':
"Yes, I consider myself a team player. I value collaboration, open communication, and actively contribute to achieving common goals in a team setting.",
'Where do you go for UX design inspiration?':
"I draw UX design inspiration from websites like Dribbble, Behance, and Awwwards, as well as by studying successful products and participating in UX design communities.",
'Hands-on UX design challenge':
"For a hands-on UX design challenge, I would start with user research to understand the target audience, create wireframes and prototypes, conduct usability testing, and iteratively improve the design based on feedback.",
'How would you improve the UX of our product?':
"To improve the UX of your product, I would start by gathering user feedback to identify pain points, analyze usage data, and implement changes focused on enhancing usability, accessibility, and overall user satisfaction."
      };
    
      // Select the sample response based on the current question
      const sampleResponse = sampleResponses[currentQuestion] || "Thank you for your answer. Your response was clear and well-structured.";
    
      speakText(sampleResponse);
    }
  };

  const handleMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream) {
        setMicrophonePermission(true);
      }
    } catch (error) {
      console.error('Microphone permission denied:', error);
    }
  };

  const handleStartInterview = () => {
    // Fetch interview questions for the selected job description
    let fetchedQuestions = [];
    if (jobDescription === 'Software Engineer') {
      fetchedQuestions = [
        'Tell me about your experience with software development.',
        'What programming languages are you proficient in?',
        'Can you describe a recent project you worked on?',
        'What are the various categories of software?',
        'What is a framework?'
      ];
    } else if (jobDescription === 'Data Scientist') {
      fetchedQuestions = [
        'Tell me about a time when you had to explain a complex data concept to someone without a technical background. How did you ensure they understood?',
        'Describe a project where you had to work with a difficult team member. How did you handle the situation?',
        'Have you ever made a significant mistake in your analysis? How did you handle it and what did you learn from it?',
        'How do you stay updated with the latest trends and advancements in data science?',
        'How do you handle a dataset missing several values?'
      ];
    } else if (jobDescription==='Python Developer') 
      {
        fetchedQuestions = [
        'What are the built-in types available in Python?',
        'What is the difference between .py and .pyc files?',
        'What are the functions in Python?',
        'What are Python Decorators?',
        'What are the key features of Python?'
        ];
      }
      else if (jobDescription === 'Frontend Developer')
        {
          fetchedQuestions = [
          'What are the main technical and additional skills required to become a front-end developer?',
          ' How can you make your web design user-friendly, and what steps would you use to make it?',
          ' What is Coffee Script? Describe in brief.',
          'What do you understand by a callback function?',
          ' What is the key difference between Class and Prototype-based inheritance?'
          ];
        }
        else if (jobDescription === 'UI/UX')
          {
            fetchedQuestions = [
              'What is the value of UX design?',
              'Do you consider yourself a team player?',
              'Where do you go for UX design inspiration?',
              'Hands-on UX design challenge',
              'How would you improve the UX of our product?'
            ];
          }
    else {
      fetchedQuestions = [
        'Tell me about yourself.',
        'What interests you about this job?',
        'Can you describe a challenging project you worked on?',
        // Default set of questions for other job descriptions
      ];
    }
    setInterviewQuestions(fetchedQuestions);
    askQuestion(fetchedQuestions[0]);
  };

  const askQuestion = (question) => {
    if (speechSynthesisSupported) {
      speakText(question);
    }
  };

  const speakText = (text) => {
    try {
      const speechMessage = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speechMessage);
    } catch (error) {
      console.error('Speech synthesis error:', error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      askQuestion(interviewQuestions[currentQuestionIndex + 1]);
    } else {
      handleEndInterview();
    }
  };

  const handleEndInterview = () => {
    navigate('/feedback', { state: { answers } });
  };

  return (
    <div className="interview">
      <h2>Interview for {jobDescription}</h2>
      {!microphonePermission ? (
        <div className="permission-section">
          <p>Please grant microphone permission to start the interview:</p>
          <button onClick={handleMicrophonePermission}>Grant Permission</button>
        </div>
      ) : (
        <>
          {candidateName ? (
            <div className="interview-section">
              <h3>Welcome, {candidateName}!</h3>
              {interviewQuestions.length > 0 ? (
                <div>
                  <p>{interviewQuestions[currentQuestionIndex]}</p>
                  {speechRecognitionSupported && (
                    <button onClick={recording ? stopRecording : startRecording}>
                      {recording ? 'Stop Recording' : 'Start Recording'}
                    </button>
                  )}
                  <button onClick={handleNextQuestion} disabled={recording}>Next</button>
                  <button onClick={handleEndInterview} disabled={recording}>End Interview</button>
                </div>
              ) : (
                <button onClick={handleStartInterview}>Start Interview</button>
              )}
            </div>
          ) : (
            <div className="name-section">
              <p>Please enter your name:</p>
              <input
                type="text"
                maxLength="20"
                onDoubleClick={(e) => setCandidateName(e.target.value)}
                className="name-input"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Interview;
